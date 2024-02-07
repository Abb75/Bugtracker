from django.contrib.auth.models import Group 
from rest_framework import  status, generics
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from rest_framework.throttling import  AnonRateThrottle
from django.core.mail import send_mail
from django.template.loader import render_to_string
import uuid
from .emails import send_confirmation_email



from .serializers import UserSerializer,UserSerializerWithToken , RegistrationConfirmationSerializer


class UserView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    queryset = User.objects.all()


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        password = validated_data.pop('password', None)
        group =  validated_data.pop('groups', None)
        confirm_password = validated_data.pop('confirm_password', None)
        user = User.objects.create_user(**validated_data)
        print(Group.objects.first().id)
        user.groups.add(Group.objects.first())
        user.set_password(password) 
        user.is_active = False
        user.save()
        send_confirmation_email(user)
        
        return Response(201)

    def get_permissions(self):
        if self.request.method  == 'GET':
            return [IsAdminUser()]
        return super().get_permissions()


class RegistrationConfirmationView(generics.UpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegistrationConfirmationSerializer
    queryset = User.objects.all()



class UserViewById(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self, *args, **kwargs):
        return User.objects.filter(id=self.kwargs['pk'])
    
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        password = validated_data.get('password')

        if password:
            instance.set_password(password)
            instance.save()
            return Response(status=status.HTTP_200_OK)
        return super().partial_update(request, *args, **kwargs)
  

    



class TokenBlacklistView(APIView):

    def post(self, request):

        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

        except Exception as e:

            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response("Success")


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):  
        data = super().validate(attrs)
      
        serializer = UserSerializerWithToken(self.user).data
     
      
        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    throttle_classes = [AnonRateThrottle]
    serializer_class = MyTokenObtainPairSerializer
  






