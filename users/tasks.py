from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from django.utils import timezone


# python manage.py crontab add
# python manage.py crontab show
# python manage.py crontab remove
def clean_expired_tokens():
    now = timezone.now()
    expired_tokens = OutstandingToken.objects.filter(expires_at__lte=now)
    expired_tokens.delete()
