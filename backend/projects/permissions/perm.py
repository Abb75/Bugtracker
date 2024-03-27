from bugs.models import Bug
from ..models import Project
from ..models import Invitation

def is_admin_or_guest_admin_perm(request, project):
    return request.user.has_perm('can_add_invitation', project)

def is_admin(request,  obj):
    if isinstance(obj, Bug):
        return request.user.has_perm('delete_bug', obj)
    elif isinstance(obj, Project):
        return request.user.has_perm('admin_user',obj)
    elif isinstance(obj, Invitation):
        return request.user.has_perm('delete_invitation',obj)

def user_can_add_bug(request, bug ):
    return request.user.has_perm('can_add_bug', bug)

def user_can_view_bug(request, bug ):
    return request.user.has_perm('view_bug', bug)

def user_can_change_bug(request, bug ):
    return request.user.has_perm('view_bug', bug)

def user_can_view_project(request, project ):
    return request.user.has_perm('view_project', project)

def user_can_change_invitation(request, invitation ):
    return request.user.has_perm('change_invitation', invitation)






