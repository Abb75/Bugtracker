# middleware.py
from channels.middleware import BaseMiddleware
from channels.auth import AuthMiddlewareStack
from rest_framework_simplejwt.authentication import JWTAuthentication
from channels.db import database_sync_to_async


class WebSocketJWTAuthentication(BaseMiddleware):
    """
    Middleware pour l'authentification des connexions WebSocket en utilisant JWT.
    """

    def __init__(self, inner):
        super().__init__(inner)
        self.jwt_authenticator = JWTAuthentication()

    async def __call__(self, scope, receive, send):
        authorization = scope['query_string'].decode('utf-8')
        if authorization:
            try:
                token_name, token_key = authorization.split('=')
                if token_name.lower() == 'authorization':
                    token = token_key
                else:
                    token = None
            except ValueError:
                token = None
        else:
            token = None
        print(token)
        user = await self.get_user_from_token(token)  
        scope['user'] = user
        print(scope, '11111111111111')
        return await super().__call__(scope, receive, send)

    @database_sync_to_async
    def get_user_from_token(self, token): 
        print(token, 'DDDDDDDDD')
        if token:
            try:
                validated_token = self.jwt_authenticator.get_validated_token(token) 
                user = self.jwt_authenticator.get_user(validated_token) 
                return user
            except:
                return None
        return None

# channels_routing.py
