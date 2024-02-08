from rest_framework import serializers
from users.models import User
from .models import Project, Invitation




class InvitationSerializer(serializers.ModelSerializer):

    user_id = serializers.SerializerMethodField()


    class Meta:
        model = Invitation
        fields = ['id', 'name','role', 'email', 'project', 'user_id', 'invited_user', 'accepted', 'invited_by']


    def get_user_id(self, obj):
        email = obj.email 
        try:
            user = User.objects.get(email=email)  
            return user.id 
        except User.DoesNotExist:
            return None  #

    

   
       
class ProjectSerializer(serializers.ModelSerializer):

    invitation = serializers.SerializerMethodField()
    

    class Meta:
        model = Project
        fields = [  'id', 
                    'name',
                    'submission_date',
                    'project_duration', 
                    'project_lead',
                    'description',
                    'admin',
                    'invitation',
                    'status',
                    'is_archived']
        
   
    def get_invitation(self, instance):
        query = Invitation.objects.filter(project=instance)
        serializer = InvitationSerializer(query, many=True)
        return serializer.data
    
    
    
class ProjectDetailsSerializer(serializers.ModelSerializer):
    
    bugs = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [  'id', 
                    'name', 
                    'submission_date',
                    'project_duration', 
                    'project_lead',
                    'description',
                    'admin',
                    'bugs',
                    'status']
        
    def get_bugs(self, instance):
        from bugs.serializers import BugSerializer
        from bugs.models import Bug

        queryset = Bug.objects.filter(project=instance.id)
         
        return BugSerializer(queryset, many=True).data



    
   




class AllGuestByAdminSerializer(serializers.ModelSerializer):

    project = serializers.StringRelatedField()
    project_id =  serializers.SerializerMethodField()

    class Meta:
        model = Invitation
        fields = ['id', 'name','role', 'email', 'project', 'project_id']

    def get_project_id(self, obj):
        if obj.project:  
            return obj.project.id 
        return None


