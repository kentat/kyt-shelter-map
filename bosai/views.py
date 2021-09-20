from bosai.models import ShelterModel
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

# Create your views here.
def index(request):
    list = ShelterModel.objects.all()
    return render(request, 'bosai/index.html', {'shelters': list})
    # return HttpResponse("You're looking at question .")
def detail(request, id):
    shelter = get_object_or_404( ShelterModel, pk=id)
    return render(request, 'bosai/detail.html', {'shelter':shelter})
