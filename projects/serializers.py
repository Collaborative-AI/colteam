from rest_framework import serializers
from .models import ProjectDetail
class ProjectDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectDetail
        fields = ["owner", "description"]