from bosai.models import ShelterModel
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.core import serializers

# Create your views here.
def index(request):
    shs = ShelterModel.objects.all()
    # users_json = serializers.serialize("json", shs)
    # return render(request, 'bosai/index.html', {'shelters': users_json})
    return render(request, 'bosai/index.html', {'shelters': shs})
    # return HttpResponse("You're looking at question .")
def detail(request, id):
    shelter = get_object_or_404( ShelterModel, pk=id)
    return render(request, 'bosai/detail.html', {'shelter':shelter})
