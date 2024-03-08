import uuid
from datetime import date
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny 
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics
from guardian.shortcuts import get_objects_for_user
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from django.db.models import F

from users.models import User
from .models import Project,  Invitation
from .permissions.permissions_bug import assign_bug_permissions, assign_bug_guest_admin_permissions
from .permissions.permissions_project import(assign_admin_project_permissions,
                                            assign_guest_project_permissions,
                                            assign_admin_project_permissions,
                                            assign_guest_admin_project_permissions,
                                            remove_guest_project_permissions,
                                            remove_guest_admin_project_permissions)
from .permissions.permissions_invitation import(assign_admin_invitation_permissions,
                                                assign_guest_invitation_permissions,
                                                assign_guest_admin_invitation_permissions)

from bugs.models import Bug, BugComment, BugHistory
from .serializers import  ( ProjectSerializer, 
                            InvitationSerializer,
                            AllGuestByAdminSerializer,
                            )
from bugs.serializers import BugSerializer, BugHistorySerializer, BugCommentSerializer
from users.serializers import UserSerializer
from .emails import (create_mail_content_new_user,
                    create_mail_content_user_exist,
                    send_invitation_email)



class ProjectView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticated]
   
    def get_queryset(self):
       return get_objects_for_user(self.request.user, 'view_project', Project )
   
    def perform_create(self, serializer):
            if self.request.user.groups.filter(name='admin').exists():
                instance = serializer.save()
                assign_admin_project_permissions(self.request.user, instance)
                return super().perform_create(serializer)

    


class ProjectById(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    lookup_url_kwarg = 'project_id'


    def get_queryset(self, *args, **kwargs):
        return get_objects_for_user(self.request.user, 'view_project',
                                    Project.objects.filter(id=self.kwargs['project_id'])) 
      
    
    def partial_update(self, request, *args, **kwargs):
        if self.request.user.has_perm('admin_user', self.get_object()):
            return super().partial_update(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN, data={'detail': 'Permission denied.'})
        

    def destroy(self, request, *args, **kwargs):
        if self.request.user.has_perm('admin_user', self.get_object()):
            return super().destroy(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN, data={'detail': 'Permission denied.'})
       

 


class BugProjectView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BugSerializer
    queryset = Bug.objects.all()

      
    def get_queryset(self, *args, **kwargs):
        project = get_object_or_404(Project, id=self.kwargs['project_id'])
        if self.request.user.has_perm('view_project', project):
            return Bug.objects.filter(project=self.kwargs['project_id'])
    
    
    def perform_create(self, serializer): 
        if self.request.user.has_perm('can_add_bug', serializer.validated_data['project']):
            bug = serializer.save()
            date_format = date.today().strftime("%Y-%m-%d")
            status_entry = [{"status":  bug.status, "date": date_format}]
            bug_history = BugHistory.objects.create(bug=bug, data=[], comment='')
            bug_history.data.append(status_entry)
            bug_history.save()
            assign_bug_permissions(self.request.user, bug.assigned_to, bug)
            return serializer.data
    


class BugIdProjectView(generics.RetrieveUpdateDestroyAPIView):  
    permission_classes = [IsAuthenticated]
    serializer_class = BugSerializer
    queryset = Bug.objects.all()
    lookup_url_kwarg = 'bug_id'

    def get_queryset(self, *args, **kwargs):
        if self.request.user.has_perm('view_bug', Bug.objects.get(id=self.kwargs['bug_id'])):
            return Bug.objects.filter(id=self.kwargs['bug_id'])
        return Response(status=status.HTTP_403_FORBIDDEN, data={'detail': 'Permission denied.'})
    
    def partial_update(self, request, *args, **kwargs):
     
        project = get_object_or_404(Project, id=self.kwargs['project_id'])
        bug = get_object_or_404(Bug, id=self.kwargs['bug_id'])

        if self.user_is_admin_or_guest_admin_permission(project):
            if not self.user_has_change_permission(bug):
                assign_bug_guest_admin_permissions(self.request.user, bug)

        if self.user_can_modify_bug(bug):
            self.get_or_create_bug_history_obj(request, bug)
         

            return super().partial_update(request, *args, **kwargs)
        return Response({"detail": "You do not have permission to perform this action."},status=status.HTTP_403_FORBIDDEN)
 
   
    def user_is_admin_or_guest_admin_permission(self, project):
        return self.request.user.has_perm('can_archived_bug', project)

    def user_has_change_permission(self, bug):
        return self.request.user.has_perm('change_bug', bug)

    def user_can_modify_bug(self, bug):
        return self.request.user in [bug.created_by, bug.assigned_to]
    
    def get_or_create_bug_history_obj(self, request, bug):
        date_format = date.today().strftime("%Y-%m-%d")

        if 'status' in request.data:
            new_status = request.data['status']
            bug_history, created = BugHistory.objects.get_or_create(bug=bug)

            if created:
                bug_history.data = []

            status_entry = [{"status": new_status, "date": date_format}]
            bug_history.data.append(status_entry)
            bug_history.save()

    def destroy(self, request, *args, **kwargs):
        if self.request.user.has_perm('admin_user', Project.objects.get(id=kwargs['project_id'])):
            return super().destroy(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN, data={'detail': 'Permission denied.'})
        



class BugHistoryViewById(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BugHistorySerializer
    queryset = BugHistory.objects.all()
    lookup_url_kwarg = 'bug_id'


    def get_queryset(self, *args, **kwargs):
        if self.request.user.has_perm('change_bug', get_object_or_404(Bug, id=self.kwargs['bug_id']) ):
            return BugHistory.objects.filter(bug=self.kwargs['bug_id'])
    
    



class GuestUserByProjectView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InvitationSerializer
   
    def get_queryset(self, *args, **kwargs):
        return get_objects_for_user(self.request.user, 'delete_invitation', klass=Invitation).filter(project=self.kwargs['project_id'])
     
    

class ListInvitationView(generics.ListAPIView):
    permission_classes = [ IsAuthenticated]
    serializer_class = AllGuestByAdminSerializer
    queryset = Invitation.objects.all()

    def get_queryset(self, *args, **kwargs):
       
        if self.request.user.groups.filter(name = 'admin').exists(): 
            return get_objects_for_user(self.request.user, 'delete_invitation', klass=Invitation).filter(accepted=False,
                                                                                                          invited_by=self.request.user)
        else:
            return get_objects_for_user(self.request.user, 'view_invitation', klass=Invitation).filter(invited_user=self.request.user,
                                                                                                        accepted=False)
               
    

class InvitationGuestUserByIdView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated ]
    serializer_class = InvitationSerializer
    queryset = Invitation.objects.all()
    lookup_field = 'invitation_id'

    def get_object(self):
        return get_object_or_404(Invitation,
                                project_id=self.kwargs['project_id'],
                                id=self.kwargs['invitation_id']
                                )

    def destroy(self, request, *args, **kwargs):
        project =  Project.objects.get(id=self.kwargs['project_id'])
        if self.request.user.has_perm('admin_user',project): 
            remove_guest_project_permissions(self.get_object().invited_user, project)
            self.get_object().delete()
            
            return Response(status=status.HTTP_204_NO_CONTENT)


    def get_queryset(self, *args, **kwargs):
        return Invitation.objects.get(id=self.kwargs['invitation_id'])
    

    def partial_update(self, request, *args, **kwargs):   
      
        invitation = get_object_or_404(Invitation, id=kwargs['invitation_id'])  
        if self.request.user.has_perm('change_invitation', invitation):   
            self.handle_partial_update( request, *args, **kwargs)
            return Response({'message': 'Partial update successful'}, status=status.HTTP_200_OK)
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
       

    def handle_partial_update(self, request, *args, **kwargs):
       
        project = get_object_or_404(Project, id=kwargs['project_id'])
        invitation = get_object_or_404(Invitation, id=kwargs['invitation_id'])

        if 'role' in request.data:
            self.handle_role_update(request, project, invitation)
        elif 'accepted' in request.data:
            self.handle_accepted_update(request, project, invitation)  
        
        return super().partial_update(request, *args, **kwargs)


    def handle_role_update(self, request, project, invitation):
        if self.request.user.has_perm('admin_user', project) and project.admin == request.user:
            if request.data['role'] == 'admin':
                assign_guest_admin_project_permissions(invitation.invited_user, project)
            else:
                assign_guest_project_permissions(invitation.invited_user, project)
                remove_guest_admin_project_permissions(invitation.invited_user, project)


    def handle_accepted_update(self, request, project, invitation):
        if request.data['accepted'] is False:
            invitation.delete()
            return Response({'Invitation deleted'}, status=status.HTTP_200_OK)
        else:
            if invitation.role == 'admin':
                assign_guest_admin_project_permissions(invitation.invited_user, project)
            else:
                assign_guest_project_permissions(invitation.invited_user, project)
 


class SendInvitationView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InvitationSerializer
    lookup_url_kwarg = 'project_id'
              

    def assign_permissions(self, project, new_invitation, invited_user):

        if not self.request.user.has_perm('admin_user', project):
            assign_guest_admin_invitation_permissions(self.request.user, new_invitation)
        assign_admin_invitation_permissions(project.admin, new_invitation)
        assign_guest_invitation_permissions(invited_user, new_invitation)



    @transaction.atomic
    def post(self, request, project_id):
        project = get_object_or_404(Project, id=project_id)
        if self.request.user.has_perm('can_add_invitation', project):
            uuid_code = str(uuid.uuid4())
            project_id = get_object_or_404(Project, id=project_id)
            email = request.data['email']
        
            try:
                user_exist = User.objects.get(email=email)
            except ObjectDoesNotExist:
                user_exist = False


            if user_exist:
                 message, subject = create_mail_content_user_exist(project_id.name)
              
            else:
                message, subject = create_mail_content_new_user(uuid_code)
            
                
            send_invitation_email(email, message, subject)
            invited_user, created = User.objects.get_or_create(email=request.data['email'])
            new_invitation = Invitation.objects.create( invitation_code= uuid_code,
                                                        email = request.data['email'],
                                                        name = request.data['name'],
                                                        role = request.data['role'],
                                                        project = project_id,
                                                        invited_user = invited_user, 
                                                        invited_by = self.request.user
                                                    )
            new_invitation.save()
            project_id.user.add(invited_user.id)
            project_id.save()

            self.assign_permissions(project, new_invitation, invited_user)

            return Response({'message': 'E-mail d\'invitation envoyé avec succès'})
        
        return Response({"detail": "You do not have permission to perform this action."},status=status.HTTP_403_FORBIDDEN)


class GuestCreateView(generics.UpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        data = request.data
        guest = get_object_or_404(User, email=data['email'])
        serializer = self.get_serializer(guest, data=data, partial=True)  
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        user = serializer.save()  
        user.set_password(data['password']) 
        user.save()
        return Response(serializer.data, status=200)




class BugCommentView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BugCommentSerializer
    queryset = BugComment.objects.all()

    def get_queryset(self,  *args, **kwargs):
        return BugComment.objects.filter(related_bug=self.kwargs['bug_id']).order_by('id').annotate(created_by_name=F('created_by__email'))

    
    


class BugCommentViewById(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BugCommentSerializer
    queryset = BugComment.objects.all()
    lookup_url_kwarg = 'comment_id'

    
    def get_queryset(self,  *args, **kwargs):
        return  BugComment.objects.filter(id=self.kwargs['comment_id'])
       
        
    def delete(self, request, *args, **kwargs):
        obj = self.get_object()
    
        if self.request.user == obj.created_by:
            obj.delete()
            return Response("Comment delete with success", status=status.HTTP_204_NO_CONTENT)
        else:
            return Response("You do not have permission to perform this action.", status=status.HTTP_401_UNAUTHORIZED)

        
  



class ArchivedProjectView(generics.ListAPIView):
    permission_classes = [IsAuthenticated  ]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def get_queryset(self, *agrs, **kwargs):
        return get_objects_for_user(self.request.user, 'admin_user', klass=Project, accept_global_perms=True).filter(is_archived=True)
       
     



class ArchivedBugView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BugSerializer
    queryset = Bug.objects.all()

    def get_queryset(self, *args, **kwargs):
        if self.request.user.groups.filter(name='admin').exists():
            user_projects = get_objects_for_user(self.request.user, 'admin_user', klass=Project).filter(is_archived=False)
            return Bug.objects.filter(project__in=user_projects, is_archived=True)
        else :
             return Bug.objects.filter( is_archived=True,
                                        archived_by = self.request.user )
        
   






   

   
