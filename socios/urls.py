from django.urls import path
from . import views

urlpatterns = [
    path('', views.socios_form, name='socios_form'),
    path('socio/<int:pk>/', views.socios_respuesta, name='socios_res'),
]
