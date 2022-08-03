from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO
# Create your views here.

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
        "id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "owner",
        "date",
        "time",
        "reason",
        "id",
    ]
    def get_extra_data(self, o):
        return {
        "vin": o.automobile.vin,
        "technician": o.technician.name,
        "vip": o.automobile.vip
        }


@require_http_methods(["GET", "POST"])
def api_create_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianDetailEncoder
        )
    else: #POST
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder = TechnicianDetailEncoder,
            safe = False,
        )

@require_http_methods(["GET", "POST"])
def api_list_appointments(request, automobile_vo_vin=None):
    if request.method == "GET":
        if automobile_vo_vin == None:
            appts = Appointment.objects.all()
        else:
            appts = Appointment.objects.filter(vin=automobile_vo_vin)
        return JsonResponse(
            {"appointments": appts},
            encoder = AppointmentEncoder,
            safe=False,
        )
    else: # POST
        content = json.loads(request.body)
        try:
            content["technician"] = Technician.objects.get(id=content["technician"])
            content["automobile"] = AutomobileVO.objects.get(vin=content["vin"])
            del content["vin"]
            appt = Appointment.objects.create(**content)
            return JsonResponse(
                appt,
                encoder=AppointmentEncoder,
                safe=False,
            )

        except AutomobileVO.DoesNotExist:
            autocontent = {}
            autocontent["vin"] = content["vin"]
            autocontent["vip"] = False
            throwvin = content["vin"]
            autocontent["import_href"] = f'/api/automobiles/{throwvin}/'
            auto = AutomobileVO.objects.create(**autocontent)
            content["automobile"] = AutomobileVO.objects.get(vin=content["vin"])
            del content["vin"]
            appt = Appointment.objects.create(**content)
            return JsonResponse(
                appt,
                encoder=AppointmentEncoder,
                safe=False,
            )

@require_http_methods(["GET"])
def api_show_appointment(request, vin):
    if request.method == "GET":
        automobile = AutomobileVO.objects.get(vin=vin)
        appointments = Appointment.objects.filter(automobile=automobile)
        return JsonResponse(
            {"appointments": appointments},
            encoder = AppointmentEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def api_delete_appointment(request, pk):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
