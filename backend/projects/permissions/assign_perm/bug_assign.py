from guardian.shortcuts import assign_perm


PERM_ADMIN = ['add_bug' ,'view_bug', 'assign_bug', 'change_bug', 'delete_bug']
PERM_GUEST = ['add_bug', 'view_bug', 'assign_bug',  'change_bug']


def assign_permissions(permissions, user, obj):
    for permission in permissions:
        assign_perm(permission, user, obj)


def assign_bug_permissions(creator_user , assigned_user ,bug):
    if not creator_user.groups.filter(name='admin').exists():
        assign_bug_guest_permissions(creator_user, bug )
    assign_bug_admin_permissions(bug.project.admin , bug)
    assign_bug_assigned_user_permissions(assigned_user, bug)


def assign_bug_admin_permissions(creator_user, bug):
    assign_permissions(PERM_ADMIN ,creator_user, bug) 
    
   
def assign_bug_assigned_user_permissions(assigned_user, bug):
    assign_permissions(PERM_GUEST, assigned_user, bug)


def assign_bug_guest_permissions(creator_user, bug): 
    assign_permissions(PERM_GUEST, creator_user, bug)


def assign_bug_guest_admin_permissions(user, bug):
    assign_permissions(PERM_GUEST, user, bug)




