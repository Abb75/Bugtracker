from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  TokenBlacklistView, UserView, UserViewById
from .views import RegistrationConfirmationView

app_name = 'users'

urlpatterns = [
   path('', UserView.as_view(), name ="create_user"),
   path('<int:pk>/', UserViewById.as_view(), name="update_user"),
   path('register-confirm/<int:pk>/', RegistrationConfirmationView.as_view(), name='activation_user' )


]
