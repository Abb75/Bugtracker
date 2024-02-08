from rest_framework import serializers
from django.contrib.auth import password_validation


def validate_phone( value):
    if not value.isdigit() or len(value) < 9 or len(value) > 15:
        raise serializers.ValidationError('The phone number is not valid.')
    return value


def validate_name(first_name, last_name):
    if not first_name.isalpha() or not last_name.isalpha():
         raise serializers.ValidationError('The name is not valid.')
    return first_name, last_name


def validate_password(user,  data):
    if 'password' in data and 'confirm_password' in data: 
        password = data['password']
        confirm_password = data['confirm_password']
        password_validation.validate_password(password, user)
        if password != confirm_password:
                raise serializers.ValidationError("The passwords do not match.")
    return data

