from django.urls import path,include
from django.conf.urls import url
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('test/', views.test, name='test'),
    path('<int:id>/', views.detail, name='detail'),
]