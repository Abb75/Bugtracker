from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class TestRegisterUser(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_create_user_success(self):
        payload = {
            'email': 'test@free.com',
            'first_name': 'alex',
            'last_name': 'bross',
            'phone': '988989890',
            'password': 'muaythai'
        }
        res = self.client.post(reverse('users:create_user'), payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_create_user_with_wrong_email(self):
        payload = {
            'email': 'testfree.com',
            'first_name': 'alex',
            'last_name': 'bross',
            'phone': '988989890',
            'password': 'muaythai'
        }
        res = self.client.post(reverse('users:create_user'), payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_user_without_extension(self):
        payload = {
            'email': 'test@free',
            'first_name': 'alex',
            'last_name': 'bross',
            'phone': '988989890',
            'password': 'muaythai'
        }
        res = self.client.post(reverse('users:create_user'), payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)


class TestLoginUser(TestCase):

    def setUp(self):
        self.user = create_user(
            email='example@free.fr',
            password='muaythai75'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_login_success_create_token_for_user(self):
        payload = {
            'email': 'example@free.fr',
            'password': 'muaythai75'
        }
        res = self.client.post(reverse('token_obtain_pair'), payload)
        print(res.data)
        self.assertIn('access', res.data)
        self.assertIn('refresh', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_login_with_wrong_email(self):
        payload = {
            'email': 'example_false@free.fr',
            'password': 'muaythai75'
        }
        res = self.client.post(reverse('token_obtain_pair'), payload)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_login_with_wrong_password(self):
        payload = {
            'email': 'example@free.fr',
            'password': 'wronpassword'
        }
        res = self.client.post(reverse('token_obtain_pair'), payload)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_login_not_authorized(self):
        payload = {
            'email' : 'unknow@free.fr',
            'password' :  'unknow75'
        }
        res = self.client.post(reverse('token_obtain_pair'), payload)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

