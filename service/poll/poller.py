import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()


from service_rest.models import AutomobileVO


def get_automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    print("response", response)
    print("*****************************", AutomobileVO.objects.all())
    content = json.loads(response.content)
    print("content", content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            import_href=automobile["href"],
            defaults={
                "id": automobile["id"],
                "vin": automobile["vin"],
                "vip": automobile["vip"],
                },
        )


        



def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_automobiles()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(3)


if __name__ == "__main__":
    poll()
