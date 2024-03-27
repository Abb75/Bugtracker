from django.urls import path
from .consumers import RoomConsumer


websocket_urlpatterns = [
    path('chat/project/<int:id>/room/', RoomConsumer.as_asgi()),
]


