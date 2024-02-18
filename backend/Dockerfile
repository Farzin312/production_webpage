FROM python:3.9-slim

WORKDIR /usr/src/app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5001

ENV FLASK_APP=server.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV TZ=America/New_York

CMD ["flask", "run", "--port=5001"]
