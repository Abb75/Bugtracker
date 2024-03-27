import json
from datetime import datetime

from channels.db import database_sync_to_async
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.observer import model_observer
from djangochannelsrestframework.observer.generics import ObserverModelInstanceMixin, action
from channels.exceptions import DenyConnection

from .models import Message, Room, User
from .serializers import MessageSerializer, RoomSerializer, UserSerializer
from channels.layers import get_channel_layer
from projects.models import Project
from users.models import User
from .serializers import RoomSerializer

from rest_framework import status
from rest_framework.utils.serializer_helpers import ReturnDict, ReturnList
from djangochannelsrestframework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny 
from asgiref.sync import sync_to_async
from django.core.cache import cache



class RoomConsumer(GenericAsyncAPIConsumer):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    lookup_field = "pk"
    channel_layer = get_channel_layer()


    async def disconnect(self, code):
        if hasattr(self, "room_subscribe"):
            await self.remove_user_from_room(self.room_subscribe)
            await self.notify_users()
        await super().disconnect(code)
    

    async def connect(self):
        user = self.scope['user']
        print(self.scope, '333333')
        project_id = self.scope['url_route']['kwargs']['id']
        project_name = f"project_{project_id}"
       
        project = await self.get_project(pk=project_id)  
        user_perm =  await self.check_perm_user(user, project) 
        if user_perm: 
            await self.accept()  #
            await self.channel_layer.group_add(project_name, self.channel_name)     
        else:
            self.close()


    @action()
    async def get_messages_room(self, project_id, request_id, **kwargs):  
        room = await self.get_room_by_project(project_id)         

        messages_json = await self.get_cached_messages(room)
        await self.send_json({"messages": messages_json})


    async def get_cached_messages(self, room):
        cache_key = f"messages_room_{room.pk}"
        cached_data = cache.get(cache_key)
        if cached_data is None:
            print('NONEEEEEEEEE')
            messages = await self.get_messages(room)
            messages_json = await self.serialize_messages_data(messages)
            cache.set(cache_key, messages_json, timeout=None)
        else:
            messages_json = cached_data
        print(messages_json, "EEEEEEEEE")
        return messages_json

   
    @action()
    async def join_room(self, pk, **kwargs):
        self.room_subscribe = pk
        await self.add_user_to_room(pk)
        await self.notify_users()

    
    @action()
    async def leave_room(self, pk, **kwargs):
        await self.remove_user_from_room(pk)

    @action()
    async def create_message(self, message, **kwargs):
        room: Room = await self.get_room_by_project(pk=self.scope['url_route']['kwargs']['id'])
        user : User = await self.get_user(self.scope['user'])
        obj = await self.create_message_instance(room, message)
        await self.channel_layer.group_send(
            f"project_{self.scope['url_route']['kwargs']['id']}",
           {
            "type": "chat.message",
            "room_id": room.pk,
            "text": message['text'],
            "user_id": user.email,
          
          }
        )
        await self.add_cached_new_message(room , obj, user)


    async def chat_message(self, event):           
        now = datetime.now()
        formatted_date_time = now.strftime("%d-%m-%Y %H:%M:%S")
        await self.send(text_data=json.dumps({
            'user': event['user_id'],
            'text': event['text'],
            'created_at': formatted_date_time
        }))
   

    async def add_cached_new_message(self , room, message, user):
        now = datetime.now()
        formatted_date_time = now.strftime("%d-%m-%Y %H:%M:%S")
        cache_key = f"messages_room_{room.pk}"
        cached_messages = cache.get(cache_key, [])
        new_message = {
      
            "user": user.email,  
            "text": message.text,
            "created_at": formatted_date_time
        }
        cached_messages.append(new_message)
        cache.set(cache_key, cached_messages, timeout=None) 
        cached_data = cache.get(cache_key)
        print(cached_data)


    @action()
    async def subscribe_to_messages_in_room(self, project_id, request_id, **kwargs):   
        project : Project = await self.get_project(pk=project_id)    
        await self.message_activity.subscribe(room=project, request_id=request_id)
        

    @model_observer(Message)
  
    async def message_activity(
        self,
        message,
        observer=None,
        subscribing_request_ids = [],
        **kwargs
    ):  
       
        """
        This is evaluated once for each subscribed consumer.
        The result of `@message_activity.serializer` is provided here as the message.
        """
     
        for request_id in subscribing_request_ids:
            message_body = dict(request_id=request_id)
            message_body.update(message)
            await self.send_json(message_body)

           

    @message_activity.groups_for_signal
    def message_activity(self, instance: Message, **kwargs):
        yield 'room__{instance.room_id}'
        yield f'pk__{instance.pk}'

    @message_activity.groups_for_consumer
    def message_activity(self, room=None, **kwargs):
        if room is not None:
            yield f'room__{room}'

    @message_activity.serializer
    def message_activity(self, instance:Message, action, **kwargs):
        return dict(data=MessageSerializer(instance).data, action=action.value, pk=instance.pk)

    async def notify_users(self):
        room: Room = await self.get_room(self.room_subscribe)
        for group in self.groups:
            await self.channel_layer.group_send(
                group,
                {
                    'type':'update_users',
                    'usuarios':await self.current_users(room)
                }
            )

    async def update_users(self, event: dict):
        await self.send(text_data=json.dumps({'usuarios': event["usuarios"]}))

    @database_sync_to_async
    def get_room(self, pk: int) -> Room:
        return Room.objects.get(pk=pk)
    
    @database_sync_to_async
    def get_room_by_project(self, pk) -> Room:
        return Room.objects.get(project=pk)
    
    @database_sync_to_async
    def get_project(self, pk):
        return Project.objects.get(pk=pk)
    
    @database_sync_to_async
    def check_perm_user(self, user, project):
        return user.has_perm('view_project', project)
    
    @database_sync_to_async
    def current_users(self, room: Room):
        return [UserSerializer(user).data for user in room.current_users.all()]

    @database_sync_to_async
    def remove_user_from_room(self, room):
        user: User = self.scope["user"]
        user.current_rooms.remove(room) 
        
    @database_sync_to_async
    def get_messages(self, room):
        return Message.objects.filter(room=room)
    
    @database_sync_to_async
    def get_user(self, email):
        return User.objects.get(email=email)

    @database_sync_to_async
    def serialize_messages_data(self, messages):
        serializer = MessageSerializer(messages, many=True)
        return serializer.data

    @database_sync_to_async
    def add_user_to_room(self, pk):
        user: User = self.scope["user"]
        if not user.current_rooms.filter(pk=self.room_subscribe).exists():        
            user.current_rooms.add(Room.objects.get(pk=pk))

    @database_sync_to_async
    def create_message_instance(self, room, message):
          new_message =  Message.objects.create(
            room=room,
            user=self.scope["user"],
            text=message['text']
        )
          new_message.save()
          return new_message


