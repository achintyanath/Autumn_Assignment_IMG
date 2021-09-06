from django.urls import path
from TracKer.views import CardViewSet, home,login, MaintainerViewSet,ProjectViewSet,ListViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'maintainers', MaintainerViewSet)
router.register(r'project', ProjectViewSet)
router.register(r'list', ListViewSet)
router.register(r'card', CardViewSet)


urlpatterns = [
    path('login',login,name='login'),
    path('home',home,name='home'),
    #path('maintainerlist',MaintainerViewSet.as_view(),name='maintainerlist'),
    #path('maintainerdetail/<int:pk>',MaintainerDetail.as_view(),name='maintainerdetail'),
]
urlpatterns+=router.urls
