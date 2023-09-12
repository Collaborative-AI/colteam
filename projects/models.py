from djongo import models
from django.contrib.auth.models import User
from django.utils import timezone
from users.models import CustomUser

TAG_CHOICES = (
    ("tag1", "tag1"),
    ("tag2", "tag2"),
    # add more here
)

# Create your models here.
class ProjectDetail(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.TextField("project title", max_length=50, null=False)
    post_date = models.DateTimeField("post data", default=timezone.now)
    end_date = models.DateTimeField("project deadline", default=timezone.now() + timezone.timedelta(days=7))
    description = models.TextField(blank=True, default='')
    group_member = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    categories = models.CharField(
        max_length=20,
        choices=TAG_CHOICES,
        default='1'
    )
    website = models.URLField(max_length = 200)
    # contact information: Email, name
    email = models.EmailField("contact email", max_length = 254)
    qualification = models.TextField("qualifications", default='')

    def __str__(self):
        return '(%s, %s)' % (self.owner.username, self.title)

    def get_project_title(self):
        return self.title

    def get_post_date(self):
        return self.post_date
