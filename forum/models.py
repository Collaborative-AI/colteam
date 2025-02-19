from django.db import models
from users.models import CustomUser
from projects.models import ProjectDetail
from tags.tag import Tag


# TODO: add tag，multipe projects, queto
class Thread(models.Model):
    project = models.ForeignKey(ProjectDetail, on_delete=models.CASCADE, related_name="project_belong")
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, related_name="threads_tags")
    visible = models.BooleanField(default = True)
    like_count = models.IntegerField(default=0)
    dislike_count = models.IntegerField(default=0)
    last_modified_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '(%s, %s)' % (self.id, self.title)


class Post(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name="thread_belong")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL, related_name="user_belong")
    visible = models.BooleanField(default = True)
    like_count = models.IntegerField(default=0)
    last_modified_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '(%s, %s, %s, %s)' % (self.id, self.content, self.user.id, self.thread.id)

class Thread_Like(models.Model):
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    class Meta:
        unique_together = ['user','thread']

class Thread_Dislike(models.Model):
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    class Meta:
        unique_together = ['user','thread']

class Post_Like(models.Model):
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    class Meta:
        unique_together = ['user','post']

class Post_Dislike(models.Model):
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    class Meta:
        unique_together = ['user','post']

class Collector(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    threads = models.ManyToManyField(Thread, related_name='collected_by')