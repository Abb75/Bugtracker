from rest_framework.permissions import BasePermission

from bug_tracker.users.models import User
from bug_tracker.projects.models import Bug

class InvitationPermission(BasePermission):

    def has_permission(self, request, view):
        user = request.user
        user_exist = User.objects.filter(id=user.id).exists()
        return user_exist
    
