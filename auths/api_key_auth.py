from users.models import  ApiKey
from rest_framework import authentication
from rest_framework.response import Response
from rest_framework import status


class ApiKeyValidationMiddleware(authentication.BaseAuthentication):
    def api_key_authentication(self, request):
        try:
            key = get_key_from_request(request)
            api_key = ApiKey.objects.get(key = key)
            return api_key.user
        except ApiKey.DoesNotExist:
            return Response({"Unauthorized": "Token is blacklisted."}, status=status.HTTP_401_UNAUTHORIZED)
        
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