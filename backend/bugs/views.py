from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny 
from .serializers import BugSerializer
from .models import Bug
# Create your views here.

class BugView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BugSerializer
    queryset = Bug.objects.all()

    def get_queryset(self, *args, **kwargs):
        if self.request.user.groups.filter(name='admin').exists():
            return Bug.objects.filter(project__admin=self.request.user)    
        else:
            return Bug.objects.filter(assigned_to=self.request.user)
        