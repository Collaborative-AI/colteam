from django.contrib.auth.models import Permission


class UserPermissions(Permission):
    class Meta:
        permissions = [
            ("can_do_something", "Can do something"),
            ("can_view_something", "Can view something"),
        ]
