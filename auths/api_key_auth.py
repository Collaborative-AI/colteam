from users.models import  ApiKey
from rest_framework import authentication
from rest_framework.response import Response
from rest_framework import status


class ApiKeyValidationMiddleware(authentication.BaseAuthentication):
    def authenticate(self, request):
        key = get_key_from_request(request)
        if key:
            try:
                api_key = ApiKey.objects.get(key = key)
                if api_key.is_active:
                    return api_key.user, None
                else:
                    return Response({"Unauthorized": "Api Key is not active."}, status=status.HTTP_401_UNAUTHORIZED)
            except ApiKey.DoesNotExist:
                return Response({"Unauthorized": "Api Key is not available."}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            None


def get_key_from_request(request):
    authorization_header = request.META.get('HTTP_AUTHORIZATION', '')
    if not authorization_header:
        return None
    try:
        auth_type, key = authorization_header.split()
        if auth_type.lower() == 'apikey':
            return key
        else:
            return None
    except ValueError:
        return None