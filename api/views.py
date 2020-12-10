from rest_framework import viewsets, permissions
from .serializers import SociosListaSerializer

#Modelos que necesito llamar
from socios.models import Socio

# Create your views here.
class SociosListaJson(viewsets.ModelViewSet):
    """
    API endpoint que lista los socios de la organización.
    """
    queryset = Socio.objects.all().order_by('email')
    serializer_class = SociosListaSerializer
    #permisson_classes = [permissions.IsAuthenticated]
