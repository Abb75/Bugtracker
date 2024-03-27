from django.test import TransactionTestCase
from django.test.client import Client
from channels.testing import WebsocketCommunicator
from channels.db import database_sync_to_async
from users.models import User
from projects.models import Project
from projects.permissions.assign_perm.project_assign import assign_admin_test_project_permissions

from bug_tracker.asgi import application
from asgiref.sync import sync_to_async
from datetime import datetime
from guardian.models import Permission
from django.contrib.contenttypes.models import ContentType
import jwt
from datetime import datetime, timedelta
import os





class MyTests(TransactionTestCase):


    async def test_my_consumer(self):
        client = Client()
        project_content_type = await self.get_content_type(Project)
        perm = await self.create_perm_instance(project_content_type)
        user = await self.create_user_instance()
        await self.async_login(client, user)
        print(user.is_authenticated)
        # Imprimez l'utilisateur pour vérifier qu'il est correctement défini
        print(user, "???")
        
        # Créez le projet après avoir associé l'utilisateur au scope
        project = await self.create_project_instance(user)
        jwt = await self.generate_jwt(user.email)
        communicator =  WebsocketCommunicator(application, f"/chat/project/{project.id}/room/")
        
        communicator.scope['user'] = user
        communicator.scope['query_string'] = f'{jwt}'
        print(communicator.scope)
        print(communicator.scope, 'EEE')
        connected, _ = await communicator.connect()
        assert connected

        await communicator.disconnect()


    async def generate_jwt(self, user):
 
# Définissez les informations de l'utilisateur et les revendications nécessaires
       
        expiry_time = datetime.utcnow() + timedelta(hours=1)  # Expiration du token dans 1 heure

        claims = {
            'username': user,
            'exp': expiry_time,  # Date d'expiration du token
            # Ajoutez d'autres revendications si nécessaire
        }

        jwt_token = jwt.encode(claims, os.getenv('SECRET_KEY'), algorithm='HS256')

        authorization_header = b'authorization=' + f'{jwt_token}'.encode('utf-8')

        # Utilisez le JWT dans vos tests
        # Par exemple, incluez-le dans les en-têtes de vos requêtes WebSocket

        #authorization_header = f'authorization: Bearer {jwt_token}'
        print(authorization_header, 'RRRRRRRRRRRRRRRR')
        return authorization_header


    async def async_login(self, client, user):
        await sync_to_async(client.force_login)(user)


    @database_sync_to_async
    def create_user_instance(self):
        user = User.objects.create_user(
            email='tesSSt@example.com',
            password='secret'
        )
        return user

    @database_sync_to_async
    def create_perm_instance(self, content_type):
        permission, _ = Permission.objects.get_or_create(codename='view_project', content_type=content_type)
        print(permission)
    
    @database_sync_to_async
    def get_content_type(self, project):
        project_content_type = ContentType.objects.get_for_model(Project)
        return project_content_type


    @database_sync_to_async
    def create_project_instance(self, user):
        date = datetime.now()

# Formater la date selon un format spécifique
        formatted_date = date.strftime("%Y-%m-%d")


        project_test = Project.objects.create(
            name="project_test",
            admin=user,
            project_duration = formatted_date
          
        )
        print(user)
        #assign_admin_test_project_permissions(user, project_test)  # Remplacez 'change_project' par la permission que vous souhaitez attribuer

        project_test.save()
        return project_test
