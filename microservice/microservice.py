import json
import time
import requests
import random
from random import choice

prevNumber = -1

while True:
    time.sleep(1)

    fi = open('../microservice.txt', 'r')
    content = fi.read()
    fi.close()

    if content == "GET":
        res = requests.get('http://localhost:5000/api/clubs')
        response = json.loads(res.text)

        # Number of clubs
        numClubs = len(response)

        # Random number in range of clubs that is not the one selected on last round
        rand = (choice([i for i in range(0, numClubs) if i != prevNumber]))

        # Uncomment for random where same club can be selected twice in
        rand = random.randrange(0, numClubs)

        # Select club at random number index
        club = response[rand]["name"]

        prevNumber = rand

    # Write club name to microservice.txt
    fi = open('../microservice.txt', 'w+')
    fi.write(club)

    # Close file
    fi.close()
