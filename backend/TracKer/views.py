
from TracKer.permission import CardAssignedToProjectMaintainer, CommentedByUser, IsAdmin, ProjectMaintainerForCard, ProjectMaintainerForList, ProjectMaintainerForProject
from re import T
from django import http
from django.http.response import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
import requests
from requests.api import get, head
from rest_framework import status
from rest_framework import serializers
from rest_framework.decorators import action, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from .models import Card, Comment, Maintainer,  Project,List
from .serializers import CardSerializerElse, CardSerializerGet,  CommentSerializerElse, CommentSerializerGet, ListSerializerElse, ListSerializerGet, MaintainerSerializer, ProjectSerializerGet, ProjectSerializerElse
from rest_framework import generics
from rest_framework import viewsets
from django.contrib.auth import  login, logout
from django.core.exceptions import ValidationError


def login1(request):
  data = {
     'client_id' : 'EmokDB3z2HAFDN4Wr37yf0wBuzT0ZVFIYgYOcVTQ',
     'redirect_uri':'http://127.0.0.1:8000/TracKer/home',
     'state' : 'ho_gaya_kya'
   }
  r= requests.get("https://channeli.in/oauth/authorise/",params=data)
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

  r= requests.post("https://channeli.in/open_auth/token/",data=data)
  
  access_token = (r.json()["access_token"])
  print(access_token)
  header= {
    "Authorization" : "Bearer "+access_token
  }

  p = requests.get("https://channeli.in/open_auth/get_user_data/", headers=header)
 
      
  received_data= p.json()
  enroll = received_data["student"]["enrolmentNumber"]
  try:
      maintainer= Maintainer.objects.get(enrollment_number = enroll)
      if(not maintainer.disable):
        print("directly herre")
        login(request,maintainer)
      else:
        logout(request,maintainer)
  except: 
    status = received_data["person"]["roles"]
    if(status[1]["role"]=="Maintainer" and status[1]["activeStatus"]=="ActiveStatus.IS_ACTIVE"):
        name = received_data["person"]["fullName"]
        year = received_data["student"]["currentYear"]
        isAdmin = False
        if(enroll=="20114000"):
            isAdmin = True
        isDisabled=False
        maintainer = Maintainer(name=name, enrollment_number=enroll,year = year, admin=isAdmin,disable= isDisabled)
        maintainer.save()
        print("now here")
        login(request, maintainer)
    else:
        return HttpResponse("Made By IMG and Just for IMG")

  return redirect("http://127.0.0.1:8000/TracKer/maintainer/")


def logout2(request):
  logout(request)
  return HttpResponse("logged out")

class MaintainerViewSet(viewsets.ModelViewSet):

    queryset = Maintainer.objects.all()
    serializer_class = MaintainerSerializer
    permission_classes = [IsAuthenticated]

    @action(methods=['get'],permission_classes=[IsAdmin&IsAuthenticated],detail=True, url_path='ban', url_name='ban')
    def Ban(self, request, pk): 
        maintainer_to_be_banned=Maintainer.objects.get(pk=pk)
        maintainer_to_be_banned.disable = not maintainer_to_be_banned.disable
        maintainer_to_be_banned.save()

        return redirect(f"http://127.0.0.1:8000/TracKer/maintainer/{pk}/") #return something else di=uring frontend development

    @action(detail=True, url_path='changeadmin', url_name='Change Admin',permission_classes=[IsAdmin&IsAuthenticated])
    def Change_Admin_Status(self, request, pk): 
        maintainer_to_be_banned=Maintainer.objects.get(pk=pk)
        maintainer_to_be_banned.admin = not maintainer_to_be_banned.admin
        maintainer_to_be_banned.save()

        return redirect(f"http://127.0.0.1:8000/TracKer/maintainer/{pk}/")

class ProjectViewSet(viewsets.ModelViewSet):
    
    queryset = Project.objects.all()
    def get_serializer_class(self):
        if self.action == 'get' or self.action=='list' or self.action=='retrieve' :
            return ProjectSerializerGet
        else:
            return ProjectSerializerElse

    
    permission_classes = [IsAuthenticated&(IsAdmin|ProjectMaintainerForProject)]





class ListViewSet(viewsets.ModelViewSet):

    queryset = List.objects.all()

    def get_serializer_class(self):
        if self.action == 'get' or self.action=='list' or self.action=='retrieve' :
            return ListSerializerGet
        else:
            return ListSerializerElse
    permission_classes = [IsAuthenticated&(IsAdmin|ProjectMaintainerForList)]

class CardViewSet(viewsets.ModelViewSet):

    queryset = Card.objects.all()
    def get_serializer_class(self):
        if self.action == 'get' or self.action=='list' or self.action=='retrieve' :
            return CardSerializerGet
        else:
            return CardSerializerElse
    permission_classes = [IsAuthenticated&(IsAdmin|ProjectMaintainerForCard)]

    # def perform_update(self, serializer):
    #         data = self.request.data
    #         maintainers_list = data["card_assigned_to"]
    #         obj = Card.objects.get(id = pk)
    #         list_mapped_to1= obj.card_mapped_to
    #         # list_project = list_mapped_to1.list_mapped_to
    #         # for maintainer in maintainers_list:
    #         #      if maintainer not in list_project.project_maintained_by.all():
    #         #              raise ValidationError('Can be assigned to A project Member')
    #         print(obj)
    #         instance = serializer.save()


class CommentViewSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()    
    def get_serializer_class(self):
        if self.action == 'get' or self.action=='list' or self.action=='retrieve' :
            return CommentSerializerGet
        else:
            return CommentSerializerElse
    permission_classes = [IsAuthenticated&(IsAdmin|CommentedByUser)]