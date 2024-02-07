from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from users.models import  User

from django.contrib.postgres.fields import ArrayField



class Project(models.Model):
    DEFAULT_PROJECT = 'Normal'
    STATUS_PROJECT = [
        ('Critical', 'Critical'),
        ('High', 'High'),
        ('Normal', 'Normal'),
        ('Low', 'Low'),
       
    ]
    name = models.CharField(max_length=155)
    submission_date = models.DateField(auto_now_add=True)
    project_duration = models.DateField()
    project_lead = models.CharField(max_length=155)
    description = models.CharField(max_length=300)
    admin = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name='admin')
    user = models.ManyToManyField(User, null=True, blank=True) 
    is_archived = models.BooleanField(default=False)
    status = models.CharField(
       max_length=32,
       choices=STATUS_PROJECT,
       default=DEFAULT_PROJECT,
   )
    
    

    def __str__(self):
        return self.name


 
class Invitation(models.Model):

    INVITATION_ROLE_DEFAULT = 'developer'
    INVITATION_ROLE = [
        ('admin', 'admin'),
        ('developer', 'developer'),
        ('submitter', 'submitter'),
        ('tester', 'tester'),
    ]
    invitation_code = models.UUIDField(unique=True, null=True)
    invited_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255, choices=INVITATION_ROLE)
    email = models.EmailField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    accepted = models.BooleanField(null=True, default=False)
    invited_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='invited_by')


    def __str__(self):
        return self.name







