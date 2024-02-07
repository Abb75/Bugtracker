from users.serializers import UserSerializer
from rest_framework import serializers

from .models import Bug, BugHistory, BugComment


class BugHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = BugHistory
        fields = ['id', 'bug','data', 'date', 'comment']


class BugCommentSerializer(serializers.ModelSerializer):

    created_by_name = serializers.CharField(read_only=True)

    class Meta:
        model = BugComment
        fields = ['id','created_at', 'related_bug', 'created_by', 'description', 'created_by_name']



class BugSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bug
        fields = ['id', 'title', 'date', 'project', 'assigned_to', 'description', 'status','priority', 'created_by', 'is_archived', 'archived_by']

    def to_representation(self, instance):
        from projects.serializers import ProjectSerializer
        representation = {
                    'id': instance.id,
                    'title': instance.title,
                    'date': instance.date,
                    'project': ProjectSerializer(instance.project).data['name'],
                    'project_id' : ProjectSerializer(instance.project).data['id'],
                    'assigned_to_email' : UserSerializer(instance.assigned_to).data['email'],
                    'assigned_to_id' : UserSerializer(instance.assigned_to).data['id'],
                    'assigned_to_name': UserSerializer(instance.assigned_to).data['first_name'],
                    'description': instance.description,
                    'status': instance.status,
                    'priority': instance.priority,
                    'created_by': UserSerializer(instance.created_by).data['email'],
                    'is_archived': instance.is_archived,
                    'archived_by': UserSerializer(instance.archived_by).data['first_name']
                }

        return representation

