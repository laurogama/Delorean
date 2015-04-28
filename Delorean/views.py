# Create your views here.
import json

from django.http import HttpResponse

from django.shortcuts import render


def home(request):
    return render(request, "index.html")


def mock_participants(request):
    obj_json = {
        "showTitle": "Circus",
        "participants": [
            {
                "id": 1,
                "name": "Pete Hunt",
                "profession": "Juggler"
            },
            {
                "id": 2,
                "name": "Jordan Walke",
                "profession": "Clown"
            },
            {
                "id": 3,
                "name": "Ivanna Fuckalot",
                "profession": "Sword Eater"
            }
        ]
    }
    return HttpResponse(json.dumps(obj_json))