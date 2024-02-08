from django.contrib import admin
from guardian.admin import GuardedModelAdmin
from django.contrib.auth.models import Permission
from .models import Project, Invitation


class ProjectAdmin(GuardedModelAdmin):
    pass


class InvitationAdmin(GuardedModelAdmin):
    pass


class PermissionsAdmin(GuardedModelAdmin):
    pass


admin.site.register(Permission, PermissionsAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Invitation, InvitationAdmin)





