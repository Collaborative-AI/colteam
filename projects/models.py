from djongo import models
from django.contrib.auth.models import User
from django.utils import timezone
from users.models import CustomUser


# Create your models here.
class ProjectDetail(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.TextField("project title", max_length=50, null=False)
    post_date = models.DateTimeField("post data", default=timezone.now)
    end_date = models.DateTimeField("project deadline")
    description = models.TextField(blank=True, default='')
    # group_member = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return '(%s, %s)' % (self.owner.username, self.description)

    def get_project_title(self):
        return self.title

    def get_post_date(self):
        return self.post_date
