from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class TestCreateProject(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(email='abross@free.fr', password='Muaythai75')
        print(self.user.id)

    def test_success_create_project(self):
        payload = {
            'name': 'Ecommerce',
            'submission_date ': '08/02/2023',
            'project_duration': '3 mois',
            'project_lead': 'Alex',
            'description': 'rfrrgrg',
            'admin': self.user.id
        }
        self.client.force_authenticate(user=self.user)
        res = self.client.post(reverse('projects:create_project'), payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_not_authorized_create_project(self):
        payload = {
            'name': 'Ecommerce',
            'submission_date ': '08/02/2023',
            'project_duration': '3 mois',
            'project_lead': 'Alex',
            'description': 'rfrrgrg',
            'admin': self.user.id
        }
        res = self.client.post(reverse('projects:create_project'), payload, format='json')
        self.assertEqual(res.status_code,status.HTTP_401_UNAUTHORIZED)

    def test_not_complete_create_project(self):
        payload = {
            'name': '',
            'submission_date ': '08/02/2023',
            'project_duration': '3 mois',
            'project_lead': 'Alex',
            'description': 'rfrrgrg',
            'admin': self.user.id
        }
        self.client.force_authenticate(user=self.user)
        res = self.client.post(reverse('projects:create_project'), payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

