from rest_framework import serializers
from users.models import User

from users.serializers import UserSerializer
from .models import User, Room, Message
from rest_framework import serializers





class MessageSerializer(serializers.ModelSerializer):
    created_at_formatted = serializers.SerializerMethodField()
    user = UserSerializer()
    class Meta:
        model = Message
        exclude = []
        depth = 1
        fields = ["pk", "user", "room", "text", "created_at_formatted"]

    def get_created_at_formatted(self, obj:Message):
        return obj.created_at.strftime("%d-%m-%Y %H:%M:%S") 
    
    def to_representation(self, instance):
        representation = {
                    'user':  UserSerializer(instance.user).data['email'],
                    'text' : instance.text,
                    'created_at': self.get_created_at_formatted(instance)
                }

        return representation


class RoomSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = ["pk", "name", "host", "messages", "current_users", "last_message", "project"]
        depth = 1
        read_only_fields = ["messages"]

    def get_last_message(self, obj):
        return MessageSerializer(obj.messages.order_by('-created_at').last()).data