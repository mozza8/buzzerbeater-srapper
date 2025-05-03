# myapp/views.py
from django.http import JsonResponse
from .scrapper import main  # Import the scraper function
from django.db import transaction
from .models import ScraperIgralci
from .models import timeOfScraperCall
from django.utils import timezone

# View that calls the scraper
def call_scraper(request):
    try:
        # Call the scrape_data function and get the result
        print('jou jou jou jou jou')
        data = main()
        #save_scraper_data(data)
        saveTimeOfTheCall()
        return JsonResponse({'status': 'success', 'savedPlayers': len(data)}, status=200)
    except Exception as e:
        # Handle any errors that occur during scraping
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

def save_scraper_data(data):

    scraper_objects = [
        ScraperIgralci(
            idIgralca=int(data['id']),
            placa=int(data['placa']),
            starost=int(data['starost']),
            visina=int(data['visina']),
            potencial=data['potencial'],
            metIzSkoka=int(data['metIzSkoka']),
            razdaljaMeta=int(data['razdaljaMeta']),
            zunajnaObramba=int(data['zunajnaObramba']),
            vodenjeZoge=int(data['vodenjeZoge']),
            prodiranje=int(data['prodiranje']),
            podajanje=int(data['podajanje']),
            metPodKosem=int(data['metPodKosem']),
            obrambaPodKosem=int(data['obrambaPodKosem']),
            skok=int(data['skok']),
            blokade=int(data['blokade']),
            vzdrzljivost=int(data['vzdrzljivost']),
            prostiMeti=int(data['prostiMeti']),
            )
            for igrauc in data
        ]

    with transaction.atomic():
        ScraperIgralci.objects.bulk_create(scraper_objects)


def saveTimeOfTheCall():
    current_time = timezone.now()

    print('current time:', current_time)

    scraper_call = timeOfScraperCall(timeStamp=current_time)
    scraper_call.save()

    return JsonResponse({'message': 'Timestamp saved successfully!', 'time': current_time})

# Pridobi podatke iz baze za zadnji klic
def getLastScraperCall(request):
    current_time = timezone.now()
    try:
        # Call the scrape_data function and get the result
        return JsonResponse({'status': 'success', 'lastCall': current_time}, status=200)
    except Exception as e:
        # Handle any errors that occur during scraping
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)