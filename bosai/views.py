from django.views.generic import TemplateView
from bosai.models import ShelterModel
from bosai.forms import ShelterModelForm
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.core import serializers

# Create your views here.
def index(request):
    # tmp_list = ShelterModel.objects.all()
    return HttpResponse("You're looking at question .")
    # return render(request, 'bosai/index.html', {'shelters': tmp_list})
def list(request):
    shelter = ShelterModel()
    return render(request, 'bosai/list.html', {'shelters':shelter})