from rest_framework.decorators import api_view
from rest_framework.views import APIView
from users.models import CustomUser
from .serializers import ProjectDetailSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from .models import ProjectDetail


@api_view(['GET'])
def getProjectByUserId(request):
    user = CustomUser.objects.filter(id=request.data.get('id'))
    project = ProjectDetail.objects.filter(owner=user)
    serializer = ProjectDetailSerializer(project, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createProject(request):
    serializer = ProjectDetailSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateProject(request):
    serializer = ProjectDetailSerializer(data=request.data)
    if serializer.is_valid():
        project_id = request.data.get('id')
        project = ProjectDetail.objects.get(id=project_id)
        serializer.update(project, request.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def deleteProject(request):
    serializer = ProjectDetailSerializer(data=request.data)
    if serializer.is_valid():
        project_id = request.data.get('id')
        project = ProjectDetail.objects.filter(id=project_id)
        project.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]


class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = ProjectDetail.objects.all().order_by('-post_date')  # 使用自定义用户模型
    serializer_class = ProjectDetailSerializer
