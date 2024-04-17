from users.models import  ApiKey
from rest_framework import authentication
from rest_framework.response import Response
from rest_framework import status


class ApiKeyValidationMiddleware(authentication.BaseAuthentication):
    def authenticate(self, request):
        key = get_key_from_request(request)
        if key:
            try:
                api_key = ApiKey.objects.get(key=key)
                if api_key.is_active:
                    print("API key is active"+api_key.user.username)
                    return (api_key.user, None)
                else:
                    return Response({"Unauthorized": "Api Key is not active."}, status=status.HTTP_401_UNAUTHORIZED)
            except ApiKey.DoesNotExist:
                return Response({"Unauthorized": "Api Key is not available."}, status=status.HTTP_401_UNAUTHORIZED)
        return None


def get_key_from_request(request):
    # get from the 请求体
    key = request.data.get('apikey', None)
    if key:
        return key
    # 从 URL 查询参数中获取 key
    # key = request.GET.get('apikey', None)  
    # return key
    # get from the header 
    # authorization_header = request.META.get('HTTP_API_KEY', '')#APIKEY
    # if not authorization_header:
    #     return None
    # try:
    #     auth_type, key = authorization_header.split()
    #     if auth_type.lower() == 'apikey':
    #         return key
    #     else:
    #         return None
    # except ValueError:
    #     return None