from rest_framework.response import Response
from rest_framework import status
from .permissions.perm import is_admin

def admin_required(func):
    print(func, 'EE')
    def wrapper(self, request, *args, **kwargs):
        print(request, self.get_object().id, 'YYY')
        if is_admin(request, self.get_object()):
            print('DDDDDDDDDDDDDDDDDDDDDD')
            return func(self, request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN, data={'detail': 'Permission denied.'})
    return wrapper
