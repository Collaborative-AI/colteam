from rest_framework.decorators import api_view
from rest_framework.views import APIView
from users.models import CustomUser
from .serializers import ProjectDetailSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from .models import ProjectDetail


@api_view(['POST'])
def getProjectByUsername(request):
    try:
        user_name = request.data.get('username')
        user = CustomUser.objects.get(username=user_name)
        project = ProjectDetail.objects.filter(owner=user)
        serializer = ProjectDetailSerializer(project, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception:
        return Response({'message':'Invalid username'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def createProject(request):
    user_id = request.data.get('id')
    title = request.data.get('title')
    description = request.data.get('description')
    user = CustomUser.objects.get(id=user_id)
    project = ProjectDetail()
    project.title = title
    project.owner = user
    project.description = description
    project.save()
    return Response({'message': 'Create project successfully'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def updateProject(request):
    try:
        project_id = request.data.get('id')
        new_title = request.data.get('title')
        new_description = request.data.get('description')
        project = ProjectDetail.objects.get(id=project_id)
        project.title = new_title
        project.description = new_description
        project.save()
        return Response({'message': 'Update project successfully'}, status=status.HTTP_200_OK)
    except Exception:
        return Response({'message': 'Invalid project id'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def deleteProject(request):
    try:
        project_id = request.data.get('id')
        project = ProjectDetail.objects.filter(id=project_id)
        project.delete()
        return Response({'message': 'Delete project successfully'}, status=status.HTTP_200_OK)
    except Exception:
        return Response({'message': 'Invalid project id'}, status=status.HTTP_400_BAD_REQUEST)


class ProjectApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]


class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = ProjectDetail.objects.all().order_by('-post_date')  # 使用自定义用户模型
    serializer_class = ProjectDetailSerializer
