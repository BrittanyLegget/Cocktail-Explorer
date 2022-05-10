from time import sleep

import requests

from common import (
    ENDPOINT,
    MICROSERVICE_FILEPATH,
    MICROSERVICE_START_TEXT,
    read_file,
    write_num_to_file,
)


def main():
    sleep(1)
    print("Listening...")
    line = read_file(filepath=MICROSERVICE_FILEPATH)
    if MICROSERVICE_START_TEXT in line:
        print(
            f"{MICROSERVICE_START_TEXT} found in {MICROSERVICE_FILEPATH}. Making GET request to {ENDPOINT}"
        )
        r = requests.get(ENDPOINT)
        json_blob = r.json()
        num_objects = len(json_blob["cocktails"])
        print(
            f"Found {num_objects} objects at {ENDPOINT}. Writing to {MICROSERVICE_FILEPATH}"
        )
        write_num_to_file(filepath=MICROSERVICE_FILEPATH, num=str(num_objects))


if __name__ == "__main__":
    while True:
        main()
