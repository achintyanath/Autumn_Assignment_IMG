from django import http
from django.http.response import HttpResponse
from django.shortcuts import redirect, render
import requests
from requests.api import head

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


