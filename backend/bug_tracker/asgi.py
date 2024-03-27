import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from chat.routing import websocket_urlpatterns
from channels.layers import get_channel_layer
from channels.auth import AuthMiddlewareStack
from chat.middleware import WebSocketJWTAuthentication



os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bug_tracker.settings')
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.
channel_layer = get_channel_layer()

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": WebSocketJWTAuthentication(URLRouter(websocket_urlpatterns))
    # Just HTTP for now. (We can add other protocols later.)
})

