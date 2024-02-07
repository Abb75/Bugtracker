from guardian.shortcuts import assign_perm


PERM_ADMIN = ['add_invitation',  'change_invitation' ,  'delete_invitation', 'view_invitation']
PERM_GUEST_ADMIN = ['add_invitation', 'view_invitation']
PERM_GUEST = ['view_invitation', 'change_invitation']


def assign_permissions(permissions, user, obj):
    for permission in permissions:
        assign_perm(permission, user, obj)

def assign_admin_invitation_permissions(user, invitation):
    assign_permissions(PERM_ADMIN, user, invitation)


def assign_guest_admin_invitation_permissions(user, invitation):
    assign_permissions(PERM_GUEST_ADMIN,  user, invitation)


def assign_guest_invitation_permissions(user, invitation):
    assign_permissions(PERM_GUEST, user, invitation)
