# myapp/views.py
from django.http import JsonResponse
from .scrapper import main  # Import the scraper function
from django.db import transaction
from .models import ScraperIgralci

# View that calls the scraper
def call_scraper(request):
    try:
        # Call the scrape_data function and get the result
        data = main()
        save_scraper_data(data)
        return JsonResponse({'status': 'success', 'savedPlayers': len(data)}, status=200)
    except Exception as e:
        # Handle any errors that occur during scraping
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

def save_scraper_data(data):

    scraper_objects = [
        ScraperIgralci(
            id=int(data['id']),
            placa=int(data['placa']),
            starost=int(data['starost']),
            visina=int(data['visina']),
            potencial=data['potencial'],
            metIzSkoka=int(data['metIzSkoka']),
            razdaljaMeta=int(data['razdaljaMeta']),
            zunajnaObramba=int(data['zunajnaObramba']),
            vodenjeŽoge=int(data['vodenjeŽoge']),
            prodiranje=int(data['prodiranje']),
            podajanje=int(data['podajanje']),
            metPodKosem=int(data['metPodKosem']),
            obrambaPodKosem=int(data['obrambaPodKosem']),
            skok=int(data['skok']),
            blokade=int(data['blokade']),
            vzdržljivost=int(data['vzdržljivost']),
            prostiMeti=int(data['prostiMeti']),
            )
            for igrauc in data
        ]

    with transaction.atomic():
        ScraperIgralci.objects.bulk_create(scraper_objects)

