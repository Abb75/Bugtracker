from django.db import models

# Create your models here.
from django.db import models
from projects.models import Project
from users.models import User
# Create your models here.
from django.contrib.postgres.fields import ArrayField


class Bug(models.Model):
    BUG_STATUS_DEFAULT = 'Open'
    BUG_STATUS = [
        ('In progress', 'In progress'),
        ('To be tested', 'To be tested'),
        ('Pending', 'Pending'),
        ('Fixed', 'Fixed'),
        ('Closed', 'Closed'),
        ('Rejected', 'Rejected'),
        ('New', 'New')
    ]
    BUG_PRIORITY_DEFAULT = 'Normal'
    BUG_PRIORITY = [
        ('Critical', 'Critical'),
        ('High', 'High'),
        ('Normal', 'Normal'),
        ('Low', 'Low'),
    ]
    description = models.TextField(max_length=300, null=True)
    title = models.CharField(max_length=255, blank=False)
    date = models.DateField(auto_now_add=True)
    project = models.ForeignKey(to='projects.Project', on_delete=models.CASCADE)
    type = models.CharField(max_length=255, null=True)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="bug_assigned")
    department_name = models.CharField(max_length=255, null=True) 
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True,  related_name='bug_created')
    is_archived = models.BooleanField(default=False, null=True)
    archived_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='bug_archived')

    priority = models.CharField(
        max_length=32,
        choices=BUG_PRIORITY,
        default=BUG_PRIORITY_DEFAULT
                                )
    status = models.CharField(
        max_length=32,
        choices=BUG_STATUS,
        default=BUG_STATUS_DEFAULT
    )

    class Meta:
        permissions = (
            ('assign_bug', 'assign bug'),
        )
    
 
    def __str__(self):
        return self.title
    


class BugComment(models.Model):
    related_bug = models.ForeignKey(Bug,on_delete=models.CASCADE, null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateField(auto_now_add=True)
    description = models.TextField()

    def __str__(self):
        return f"{self.related_bug}"




class BugHistory(models.Model):
    bug = models.ForeignKey(Bug, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    data =  ArrayField( 
                ArrayField(
                    models.CharField(max_length=500, blank=True),
                    size=500,
                ),
                size=200,
                null=True
    )

    comment = models.TextField(null=True, blank=True)#models.JSONField()
  
   