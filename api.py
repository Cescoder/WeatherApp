from fastapi import FastAPI, Request
import requests
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests
import uvicorn



HOST = 'localhost'
PORT = 8000

API_KEY = 'XWXsuElCfkpjMrw2+9Xt+Q==0gzlAI8tj9DX04Be'
API_URL = 'https://api.api-ninjas.com/v1/weather?city={}'


app = FastAPI()


# Enable CORS
app.add_middleware(
    CORSMiddleware,

    allow_origins=['*'],
    allow_methods=['*'],

    allow_headers=['*'],
)

@app.get("/weather/{city}")
def read_root(request: Request):
    city = request.path_params['city']

    url = API_URL.format(city)
    response = requests.get(url, headers={'X-Api-Key': API_KEY})
    if response.status_code == requests.codes.ok:
        print(response.json())
        return response.json()
    else:
        return {'error': 'City not found'}

if __name__ == '__main__':
    uvicorn.run(app, host=HOST, port=PORT)