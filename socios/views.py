from django.shortcuts import render, redirect, get_object_or_404
from .forms import SocioForm
from .models import Socio

# Create your views here.
def socios_form(request):
    if request.method == "POST":
        form = SocioForm(request.POST)
        if form.is_valid():
            socio = form.save(commit=False)
            socio.save()
            return redirect('socios_res', pk=socio.pk)
    else:
        form = SocioForm()
    return render(request, 'socios/index.html', {'form': form})

def socios_respuesta(request, pk):
    socio = get_object_or_404(Socio, pk=pk)
    return render(request, 'socios/socios_respuesta.html', {'socio': socio})
