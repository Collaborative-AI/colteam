from django.core.cache import cache
from rest_framework.response import Response
from rest_framework import status
from rest_framework import authentication


class TokenValidationMiddleware(authentication.BaseAuthentication):

    def authenticate(self, request):
        token = get_token_from_request(request)
        if token:
            if cache.get(token):
                return Response({"Unauthorized": "Token is blacklisted."}, status=status.HTTP_401_UNAUTHORIZED)


def get_token_from_request(request):
    authorization_header = request.META.get('HTTP_AUTHORIZATION', '')

    if not authorization_header:
        return None  # 如果请求头中没有 Authorization 字段，则返回 None

    try:
        auth_type, token = authorization_header.split()
        if auth_type.lower() == 'bearer':
            return token
        else:
            return None  # 如果认证类型不是 'token'，则返回 None
    except ValueError:
        return None  # 如果请求头无法分割成两部分（认证类型和令牌），则返回 None
