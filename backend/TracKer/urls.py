from django.urls import path
from TracKer.views import CardViewSet, CommentViewSet, MaintainerViewSet, home,login1,ProjectViewSet,ListViewSet, logout2
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'maintainer', MaintainerViewSet)
router.register(r'project', ProjectViewSet)
router.register(r'list', ListViewSet)
router.register(r'card', CardViewSet)
router.register(r'comment', CommentViewSet)


urlpatterns = [
    path('login',login1,name='login'),
    path('home',home,name='home'),
    path('logout',logout2,name='logout'),
    #path('maintainerlist',MaintainerViewSet.as_view(),name='maintainerlist'),
    #path('maintainerdetail/<int:pk>',MaintainerDetail.as_view(),name='maintainerdetail'),
]
urlpatterns+=router.urls
