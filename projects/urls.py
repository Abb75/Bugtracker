from django.urls import path
from .views import( ProjectView,
                    ProjectById,
                    BugProjectView,
                    GuestUserByProjectView,
                    BugIdProjectView,
                    InvitationGuestUserByIdView,
                    SendInvitationView, 
                    GuestCreateView,
                    ListInvitationView,
                    BugHistoryViewById,
                    BugCommentView,
                    BugCommentViewById,
                    ArchivedProjectView,
                    ArchivedBugView,
                  
                    )

app_name = 'projects'

urlpatterns = [

    path('archived-bug/', ArchivedBugView.as_view(), name='archived_bug'),
    path('guests/', ListInvitationView.as_view(), name='invitation' ),
    path('project/', ProjectView.as_view(), name='create_project'), 
    path('project/<int:project_id>/', ProjectById.as_view(), name='project_by_id'), 
    path('project/<int:project_id>/users/', GuestUserByProjectView.as_view(), name='invitation_project'),   
    path('project/<int:project_id>/invitation/', SendInvitationView.as_view(), name='invitation' ),    
    path('project/<int:project_id>/invitation/<int:invitation_id>/', InvitationGuestUserByIdView.as_view(), name='invitation_project'),
    path('project/<int:project_id>/bug/', BugProjectView.as_view(), name='bug_project'),  
    path('project/<int:project_id>/bug/<int:bug_id>/', BugIdProjectView.as_view(), name='bug_project_by_id'),
    path('project/<int:project_id>/bug/<int:bug_id>/history/', BugHistoryViewById.as_view(), name='bug_history_by_id'),
    path('project/<int:project_id>/bug/<int:bug_id>/comment/', BugCommentView.as_view(), name='bug_comment'),
    path('project/<int:project_id>/bug/<int:bug_id>/comment/<int:comment_id>/', BugCommentViewById.as_view(), name='bug_comment_by_id'), 
    path('archived-project/', ArchivedProjectView.as_view(), name='archived_roject'),
    path('Register-invitation/<uuid:uuid_param>/',GuestCreateView.as_view() ),

]


