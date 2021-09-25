from bosai.models import ShelterModel
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.core import serializers
import json

# Create your views here.
def index(request):
    shelters = ShelterModel.objects.all()
    # users_json = serializers.serialize("json", shs)
    # return render(request, 'bosai/index.html', {'shelter':users_json})
    return render(request, 'bosai/index.html', {'shelters':shelters})
def detail(request, id):
    # shs = ShelterModel.objects.all()
    # shs = ShelterModel.objects.get(pk=sh_id)
    # shelter = get_object_or_404( ShelterModel, pk=sh_id)
    # shs = ShelterModel.objects.all()
    # users_json = serializers.serialize("json", shs)
    # return render(request, 'bosai/detail.html', {'shelter':shs})
    shelter = get_object_or_404( ShelterModel, pk=id)
    return render(request, 'bosai/detail.html', {'shelter':shelter})
def test(request):
    shs = ShelterModel.objects.all()
    users_json = serializers.serialize("json", shs)
    # users_json = json.parse("{{ shs | safe }}");
    # users_json = json.dumps(shs); 
    # return HttpResponse(users_json, content_type="text/json-comment-filtered")
    return render(request, 'bosai/test.html', {'shelter':users_json})
