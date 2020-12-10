from django.db import models
from django.utils import timezone

# Opcion Seleccionar 
TIPO_INFO_REQ = (
    ('ayuda-dev', '¿Como ayudar a los creadores?'),
    ('contacto-dev','Quiero contactarme con el desarrollador de la pagína'),
)

# Create your models here.
class Socio(models.Model):
    email=models.EmailField(max_length=200)
    nombre=models.CharField(max_length=50)
    nickname=models.CharField(max_length=50)
    telefono=models.CharField(max_length=25, default='+56988889999')
    info_req=models.CharField(max_length=25, choices=TIPO_INFO_REQ, default='ayuda-dev')

    def __str__(self):
        return self.nombre