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
                "profession": "Juggler",
                "likes": 0
            },
            {
                "id": 2,
                "name": "Jordan Walke",
                "profession": "Clown",
                "likes": 0
            },
            {
                "id": 3,
                "name": "Ivanna Fuckalot",
                "profession": "Sword Eater",
                "likes": 0
            }
        ]
    }
    return HttpResponse(json.dumps(obj_json))