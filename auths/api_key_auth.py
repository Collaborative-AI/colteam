from users.models import  ApiKey
from rest_framework import authentication

class ApiKeyBackend(authentication.BaseAuthentication):
    def api_key_authentication(self, request, key = None):
        try:
            api_key = ApiKey.objects.get(key = key)
            return api_key.user
        except ApiKey.DoesNotExist:
            return None
        