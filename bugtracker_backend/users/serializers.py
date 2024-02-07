from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import Group
from projects.models import Invitation
from django.core.validators import validate_email 
from .validators import validate_phone, validate_password, validate_name
from django.contrib.auth import password_validation
from django.contrib.auth.hashers import make_password


class GroupSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Group
        fields = ['id','name']


class UserSerializer(serializers.ModelSerializer):
    
    groups = serializers.SerializerMethodField()
    confirm_password =  serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name','groups', 'password', 'confirm_password', 'phone' ] 

    def validate(self, data):
        validate_password(self.instance, data)
        validate_name(data['first_name'], data['last_name'])
        validate_phone(data['phone'])
        return data
       
    def get_groups(self, instance):
        group_names = [group.name for group in instance.groups.all()]
        return group_names
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop('password', None)
        return representation

        

class UserSerializerWithToken(UserSerializer):

    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'token', 'is_active']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    

   
class RegistrationConfirmationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'is_active']

  