from guardian.shortcuts import assign_perm, remove_perm
from django.contrib.auth.models import Group
from projects.models import Project


PERM_ADMIN =  [ 'add_project',
                'view_project',
                'change_project',
                'delete_project',
                'view_project',
                'can_add_bug', 
                'can_add_invitation',
                'can_archived_bug',
                'admin_user'  
                ]

PERM_GUEST_ADMIN = ['view_project', 'can_add_bug', 'can_add_invitation', 'can_archived_bug']
PERM_GUEST = ['view_project', 'can_add_bug']

REMOVE_PERM_GUEST_ADMIN = ['can_add_invitation', 'can_archived_bug']

REMOVE_PERM_GUEST_USER = ['can_add_bug', 'can_add_invitation', 'can_archived_bug', 'view_project']


def remove_permissions(permissions, user, obj):
    for permission in permissions:
        remove_perm(permission, user, obj)


def assign_permissions(permissions, user, obj):
    for permission in permissions:
        assign_perm(permission, user, obj)



def assign_admin_project_permissions(user, project):
    assign_permissions(PERM_ADMIN,user, project )
 
def assign_guest_admin_project_permissions(creator_user, project):
    assign_permissions(PERM_GUEST_ADMIN, creator_user, project)
  
def assign_guest_project_permissions(creator_user, project):
    assign_permissions(PERM_GUEST, creator_user, project)

def remove_guest_admin_project_permissions(user, project):
    remove_permissions(REMOVE_PERM_GUEST_ADMIN, user, project)

def remove_guest_project_permissions(user, project):
    remove_permissions(REMOVE_PERM_GUEST_USER, user, project)