import os
from channels.routing import ProtocolTypeRouter, URLRouter
from projects.urls import websocket_urlpatterns

from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.
application= get_asgi_application()

