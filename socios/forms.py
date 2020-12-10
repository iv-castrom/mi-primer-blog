from django import forms
from .models import Socio

class SocioForm(forms.ModelForm):

    class Meta:
        model = Socio
        fields = ('email', 'nombre','nickname', 'telefono', 'info_req')
