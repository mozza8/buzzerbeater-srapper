# backend/Dockerfile
FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY . .
RUN pip install --no-cache-dir -r requirements.txt



CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]