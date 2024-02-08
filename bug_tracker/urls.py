from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from users import views
from users.views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework import routers
from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi 
from django.conf.urls.static import static
from django.conf import settings

...

schema_view = get_schema_view(
   openapi.Info(
      title="Bug tracker Api",
      default_version='v1',
      description="Bug tracker Api",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
  
   ...
]

urlpatterns = [
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/bug/', include('bugs.urls')),
    #path('api/', include('bug_tracker.admin_urls')),
    path('api/', include('projects.urls')),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    #path("__debug__/", include("debug_toolbar.urls")),
] 




