from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'socios', views.SociosListaJson)

urlpatterns = [
    path('', include(router.urls)),
]
