# myapp/views.py
from django.http import JsonResponse
from .scrapper import main  # Import the scraper function
from django.db import transaction
from .models import ScraperIgralci
from .models import timeOfScraperCall
from django.utils import timezone
import json
from datetime import datetime
from django.forms.models import model_to_dict

# View that calls the scraper
def call_scraper(request):
    try:
        # Call the scrape_data function and get the result
        data = main()

        save_scraper_data(data)
        saveTimeOfTheCall()
        return JsonResponse({'status': 'success', 'savedPlayers': len(data)}, status=200)
    except Exception as e:
        # Handle any errors that occur during scraping
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

def save_scraper_data(data):

    if isinstance(data, list):
        # Create a list of ScraperIgralci objects
        scraper_objects = [
            ScraperIgralci(
                id_igralca=int(igralec.get('id', 0)),  # Use .get() to avoid KeyError if key doesn't exist
                placa=int(igralec.get('placa', 0)),
                starost=int(igralec.get('starost', 0)),
                visina=int(igralec.get('visina', 0)),
                potencial=igralec.get('potencial', ''),  # Ensure the default is an empty string
                metIzSkoka=int(igralec.get('metIzSkoka', 0)),
                razdaljaMeta=int(igralec.get('razdaljaMeta', 0)),
                zunajnaObramba=int(igralec.get('zunajnaObramba', 0)),
                vodenjeZoge=int(igralec.get('vodenjeZoge', 0)),
                prodiranje=int(igralec.get('prodiranje', 0)),
                podajanje=int(igralec.get('podajanje', 0)),
                metPodKosem=int(igralec.get('metPodKosem', 0)),
                obrambaPodKosem=int(igralec.get('obrambaPodKosem', 0)),
                skok=int(igralec.get('skok', 0)),
                blokade=int(igralec.get('blokade', 0)),
                vzdrzljivost=int(igralec.get('vzdrzljivost', 0)),
                prostiMeti=int(igralec.get('prostiMeti', 0)),
            )
            for igralec in data  # Iterate over the list of player data
        ]

        # Use bulk_create for efficient database insertion
        with transaction.atomic():
            ScraperIgralci.objects.bulk_create(scraper_objects)

    else:
        print("Invalid data format: data should be a list.")


def saveTimeOfTheCall():
    current_time = timezone.now()

    scraper_call = timeOfScraperCall(timeStamp=current_time)
    scraper_call.save()

    return JsonResponse({'message': 'Timestamp saved successfully!', 'time': current_time})

# Pridobi podatke iz baze za zadnji klic
def getLastScraperCall(request):
    last_call = timeOfScraperCall.objects.last()

    if last_call is None:
        return JsonResponse({"lastCall": None, "message": "No scraper calls found"}, status=200)

    parsed = datetime.fromisoformat(last_call.timeStamp)
    json.dumps({"last_call": parsed.isoformat()})

    try:
        # Call the scrape_data function and get the result
        return JsonResponse({'status': 'success', 'lastCall': parsed}, status=200)
    except Exception as e:
        # Handle any errors that occur during scraping
        return JsonResponse({'status': 'error',  'message': str(e)}, status=500)


def getAllPlayers(request):
    players = [model_to_dict(obj) for obj in ScraperIgralci.objects.all()]
    json.dumps(players)

    try:
        # Call the scrape_data function and get the result
        return JsonResponse({'status': 'success', 'players': players}, status=200)
    except Exception as e:
        # Handle any errors that occur during scraping
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
