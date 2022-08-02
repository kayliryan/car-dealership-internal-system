from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Technician
# Create your views here.

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
    ]

@require_http_methods(["POST"])
def api_create_technician(request):
    content = json.loads(request.body)
    technician = Technician.objects.create(**content)
    return JsonResponse(
        technician,
        encoder = TechnicianDetailEncoder,
        safe = False,
    )

# @require_http_methods(["GET", "POST"])
# def api_list_hats(request, automobile_vo_id=None):
#     if request.method == "GET":
#         if automobile_vo_id == None:
#             hats = Hat.objects.all()
#         else:
#             hats = Hat.objects.filter(location=automobile_vo_id)
#         # print("hats***********************************************************",hats.values())
#         return JsonResponse(
#             {"hats": hats},
#             encoder = HatListEncoder,
#             safe=False,
#         )
#     else: # POST
#         content = json.loads(request.body)
#         try:
#             location = LocationVO.objects.get(id=location_vo_id)
#             content["location"] = location
#         except LocationVO.DoesNotExist:
#             return JsonResponse(
#                 {"message": "Invalid location id"},
#                 status=400,
#             )

#         hat = Hat.objects.create(**content)
#         return JsonResponse(
#             hat,
#             encoder=HatListEncoder,
#             safe=False,
#         )