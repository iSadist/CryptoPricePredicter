import numpy
import json
import sys

moving_average_length = int(sys.argv[1])
moving_average = []

bitcoin_price_data = {}
previous_values = []

def get_average(array):
  return sum(array) / len(array)

with open('bitcoin-price.json') as json_data:
  bitcoin_price_data = json.load(json_data)["bpi"]

for current_price in bitcoin_price_data.values():
    previous_values.append(current_price)
    if (len(previous_values) == moving_average_length + 1):
        moving_average.append(get_average(previous_values))
        previous_values.pop(0)

# Write a new JSON file with the results appended
