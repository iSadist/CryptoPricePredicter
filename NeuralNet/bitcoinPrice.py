import tensorflow as tf
from tensorflow import keras
import json
import numpy as np

lookback_days = 90
trained_model_file_path = "./Models/bitcoinprice.h5"

# Load in the data from the JSON file

bitcoin_price_data = {}

with open('bitcoin-price.json') as json_data:
    bitcoin_price_data = json.load(json_data)["bpi"]

price_list = []

for price in bitcoin_price_data.values():
    price_list.append(price)

# Putting output the same as the input
# Needs to be changed later on
train_correct = price_list
train_price = price_list

# Create a sequential network to look at the prices for the past days
model = keras.Sequential([
	    keras.layers.Dense(20, activation=tf.nn.relu, input_shape=(1,)), # Inputs are only the price for the last lookback_days
        # Add recurring layers
	    keras.layers.Dense(20, activation=tf.nn.relu),
	    keras.layers.Dense(1, activation=tf.nn.relu) # Only output one value, the price prediction
	])

model.compile(optimizer=keras.optimizers.Adam(),
	              loss='mean_squared_error',
	              metrics=['accuracy'])
model.summary() # Print a summary of the model

# Train the model
model.fit(train_price, train_correct, epochs=20, batch_size=10, verbose=1)

print(model.predict([6500]))

model.save(trained_model_file_path)

# Test the model
