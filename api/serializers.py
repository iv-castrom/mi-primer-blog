from rest_framework import serializers
#Modelos que se usan
from socios.models import Socio

class SociosListaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Socio
        fields = '__all__'