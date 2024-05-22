import requests
from flask import Flask, request, render_template

HOST = 'localhost'
PORT = 5000
STATIC_FOLDER = 'static'

app = Flask("WeatherApp", static_folder=STATIC_FOLDER)

@app.route('/')
def weather():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host=HOST, port=PORT, debug=True)