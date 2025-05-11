#!/bin/sh

# Optional: wait for database to be ready (if using PostgreSQL)
echo "Waiting for database..."
# wait-for-it db:5432 --timeout=30
# or sleep 5

# Apply migrations every time the container starts
python manage.py makemigrations --noinput
python manage.py migrate --noinput

# Start the Django server
python manage.py runserver 0.0.0.0:8000
