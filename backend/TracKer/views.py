
from django import http
from django.http.response import HttpResponse
from django.shortcuts import redirect, render
import requests
from requests.api import get, head
from rest_framework import status
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from .models import Card, Comment, Maintainer, Project,List
from .serializers import CardSerializerElse, CardSerializerGet, CommentSerializer, ListSerializer, MaintainerSerializer, ProjectSerializerGet, ProjectSerializerElse
from rest_framework import generics
from rest_framework import viewsets




# Create your views here.
def login(request):

  data = {
     'client_id' : 'EmokDB3z2HAFDN4Wr37yf0wBuzT0ZVFIYgYOcVTQ',
     'redirect_uri':'http://127.0.0.1:8000/TracKer/home',
     'state' : 'ho_gaya_kya'
   }
  #headers = {'Content-type':'application/json'}
  r= requests.get("https://channeli.in/oauth/authorise/",params=data)
  #print(r.url)
  return redirect(r.url)

def home(request):

  code = request.GET['code']

  data = {
     'client_id' : 'EmokDB3z2HAFDN4Wr37yf0wBuzT0ZVFIYgYOcVTQ',
     'client_secret':'63OF6z9LJYzU81olw6MkHxehLdlRGnAEifWty1A0AGJp47ftD5eqcW7Q5CFXKgviREn5QXJuKjTnO31RaX2SV8xH9YzqKHJmbeSIZU4tt8qiyPS9fpfkjj2yJPUSEaca',
     'grant_type':'authorization_code',
     'redirect_uri':'http://127.0.0.1:8000/TracKer/home',
     'code':code
   }
  #headers = {'Content-type':'application/json'}
  r= requests.post("https://channeli.in/open_auth/token/",data=data)
  
  access_token = (r.json()["access_token"])
  print(access_token)
  header= {
    "Authorization" : "Bearer "+access_token
  }

  p = requests.get("https://channeli.in/open_auth/get_user_data/", headers=header)
  print(p.url)

  return HttpResponse(p)


# @api_view(['GET','POST'])
# def maintainer_list(request):
#   if request.method == 'GET':
#     Maintainers = Maintainer.objects.all()
#     serializer = MaintainerSerializer(Maintainers,many =True)
#     return Response(serializer.data)

#   elif request.method == 'POST':
#         serializer = MaintainerSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class MaintainerList(generics.ListCreateAPIView):
#     queryset = Maintainer.objects.all()
#     serializer_class = MaintainerSerializer


# class MaintainerDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Maintainer.objects.all()
#     serializer_class = MaintainerSerializer

class MaintainerViewSet(viewsets.ModelViewSet):

    queryset = Maintainer.objects.all()
    serializer_class = MaintainerSerializer
    #permission_classes = [IsAccountAdminOrReadOnly]

class ProjectViewSet(viewsets.ModelViewSet):
    
    queryset = Project.objects.all()
    def get_serializer_class(self):
        if self.action == 'get' or self.action=='list' or self.action=='retrieve' :
            return ProjectSerializerGet
        else:
            return ProjectSerializerElse

 
    #    serializer_class = ProjectSerializer2
    
    # permission_classes = [IsAccountAdminOrReadOnly]

    # def create(self, request, *args, **kwargs):
    #     data = request.data
    #     new_project = Project.objects.create(
    #         project_name=data["project_name"], project_desc=data['project_desc']) 

    #     for maintainers in data["project_maintained_by"]:
    #         module1 = Maintainer.objects.get(name=maintainers["name"])
    #         new_project.project_maintained_by.add(module1)
    #         new_project.save()

    #     serializer = ProjectSerializer(new_project)
    # def update(self, request, *args, **kwargs):
    #     data = request.data
    #     new_project = Project.objects.get(
    #         project_name=data["project_name"]) 

    #     for maintainers in data["project_maintained_by"]:
    #         module1 = Maintainer.objects.get(name=maintainers["name"])
    #         new_project.project_maintained_by.add(module1)
    #         new_project.save()

        # serializer = ProjectSerializer(new_project)

        #return Response(serializer.data)
    # def post(self, request, format=None):
    #     serializer = ProjectSerializer(data=request.data)
    #     print(serializer.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListViewSet(viewsets.ModelViewSet):

    queryset = List.objects.all()
    serializer_class = ListSerializer
    #permission_classes = [IsAccountAdminOrReadOnly]

class CardViewSet(viewsets.ModelViewSet):

    queryset = Card.objects.all()
    def get_serializer_class(self):
        if self.action == 'get' or self.action=='list' or self.action=='retrieve' :
            return CardSerializerGet
        else:
            return CardSerializerElse
    #serializer_class = CardSerializer
    #permission_classes = [IsAccountAdminOrReadOnly]

class CommentViewSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    #permission_classes = [IsAccountAdminOrReadOnly]