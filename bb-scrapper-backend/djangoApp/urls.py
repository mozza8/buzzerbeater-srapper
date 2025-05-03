# djangoApp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('scrape/', views.call_scraper, name='call_scraper'),
]
