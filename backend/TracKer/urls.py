from django.urls import path
from TracKer.views import home,login

urlpatterns = [
    path('login',login,name='login'),
    path('home',home,name='home'),

]
