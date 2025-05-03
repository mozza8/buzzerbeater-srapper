from django.db import models

class ScraperIgralci(models.Model):
    id = models.AutoField(primary_key=True)
    idIgralca = models.IntegerField()
    placa = models.IntegerField()
    starost = models.IntegerField()
    visina = models.IntegerField()
    potencial = models.CharField(max_length=255)
    metIzSkoka = models.IntegerField()
    razdaljaMeta = models.IntegerField()
    zunajnaObramba = models.IntegerField()
    vodenjeZoge = models.IntegerField()
    prodiranje = models.IntegerField()
    podajanje = models.IntegerField()
    metPodKosem = models.IntegerField()
    obrambaPodKosem = models.IntegerField()
    skok = models.IntegerField()
    blokade = models.IntegerField()
    vzdrzljivost = models.IntegerField()
    prostiMeti = models.IntegerField()

    def __str__(self):
        return self.placa

class timeOfScraperCall(models.Model):
    id = models.AutoField(primary_key=True)
    timeStamp = models.CharField(max_length=255)

    def __str__(self):
        return self.timeStamp