FROM python:3.10-slim-bullseye

RUN apt-get update \
		&& apt-get install -y --no-install-recommends --no-install-suggests \
		build-essential ffmpeg \
		&& pip install --no-cache-dir --upgrade pip

WORKDIR /usr/src/app

COPY ./requirements.txt /usr/src/app

RUN pip install --no-cache-dir --requirement /usr/src/app/requirements.txt

COPY . /usr/src/app

CMD ["python3", "consumer.py"]
