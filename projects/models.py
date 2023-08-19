from djongo import models
from django.contrib.auth.models import User
from django.utils import timezone


# Create your models here.
class ProjectDetail(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField("project title", max_length=50, null=False)
    post_date = models.DateTimeField("post data", default=timezone.now)
    end_date = models.DateField()
    description = models.TextField(blank=True, default='')

    def __str__(self):
        return '(%s, %s)' % (self.owner.username, self.description)

    def get_project_title(self):
        return self.title

    def get_post_date(self):
        return self.post_date
