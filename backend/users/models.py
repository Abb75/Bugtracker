from django.db import models
from django.shortcuts import render
from django.db import models
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.db.models import SET_NULL


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True

        user.is_superuser = True
        user.save(using=self._db)
        return user




class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    city = models.CharField(max_length=200, null=True)
    country = models.CharField(max_length=100, null=True)
    phone = models.CharField(max_length=30, null=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


