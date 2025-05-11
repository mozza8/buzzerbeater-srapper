# backend/Dockerfile
FROM python:3.13-slim

WORKDIR /app

# Install system dependencies + Chrome
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget curl gnupg unzip build-essential python3-dev \
    libnss3 libxss1 libasound2 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 \
    libxi6 libxtst6 libxrandr2 libgl1 libgbm1 libxshmfence1 libxext6 libxfixes3 \
    fonts-liberation xdg-utils ca-certificates \
    && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb || apt-get -fy install \
    && rm google-chrome-stable_current_amd64.deb \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PATH="/usr/lib/chromium/:${PATH}"

# Copy files early to make caching effective
COPY requirements.txt .

RUN pip install --upgrade pip setuptools wheel
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Make sure the entrypoint is executable
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
