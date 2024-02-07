from django.contrib import admin

# Register your models here.

# Register your models here
from django.contrib import admin
from .models import Bug, BugComment, BugHistory
from guardian.admin import GuardedModelAdmin


class BugHistoryAdmin(GuardedModelAdmin):
    pass

class BugCommentAdmin(GuardedModelAdmin):
    pass

class BugAdmin(GuardedModelAdmin):
    pass

admin.site.register(Bug, BugAdmin)
admin.site.register(BugComment, BugCommentAdmin)
admin.site.register(BugHistory, BugHistoryAdmin)