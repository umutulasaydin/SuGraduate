from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://umutulas:Umut6262@cluster0.nfluwpq.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(uri, server_api=ServerApi('1'))

try:
    database = client["SABANCIGRADUATIONAPP"]
    db = database["Requirements"]
except Exception as e:
    print(e)