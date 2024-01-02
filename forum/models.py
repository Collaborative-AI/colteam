from django.db import models
from users.models import CustomUser
from projects.models import ProjectDetail
from tags.tag import Tag


# TODO: add tag，multipe projects, queto
class Thread(models.Model):
    project = models.ForeignKey(ProjectDetail, on_delete=models.CASCADE, related_name="project_belong")
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, related_name="threads")
    visible = models.BooleanField(default_auto_field = True)

    def __str__(self):
        return '(%s, %s)' % (self.id, self.title)


class Post(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name="thread_belong")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL, related_name="user_belong")
    visible = models.BooleanField(default_auto_field = True)

    def __str__(self):
        return '(%s, %s, %s, %s)' % (self.id, self.content, self.user.id, self.thread.id)
