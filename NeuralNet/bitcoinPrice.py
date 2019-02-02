import tensorflow as tf
from tensorflow import keras
import json
import numpy as np

lookback_days = 1
number_of_features = 1
trained_model_file_path = "./Models/bitcoinprice.h5"

# Load in the data from the JSON file

bitcoin_price_data = {}

with open('bitcoin-price.json') as json_data:
    bitcoin_price_data = json.load(json_data)["bpi"]

price_list = []

for price in bitcoin_price_data.values():
    price_list.append(price)

data_size = len(price_list)

train_input = price_list[0:data_size-1]
train_input = np.asarray(train_input).reshape((data_size-1, number_of_features, lookback_days))

train_output = price_list[1:data_size]

# Setting up train data with input and label
# train_output = price_list[lookback_days::lookback_days+1]
#
# train_input = price_list
# del train_input[lookback_days::lookback_days+1]; # Remove the output values from the list

# Reshape the input data from a single list
# number_of_sections = int(len(train_output))
# number_of_days = number_of_sections * lookback_days
# input_length = len(train_input)
# days_to_remove = input_length - number_of_days
# train_input = np.asarray(train_input)
# train_input = train_input[0:input_length-days_to_remove] # Remove the overflow days to fit the data structure when reshaping
# train_input = train_input.reshape((number_of_sections, lookback_days, number_of_features))

# Create a sequential network to look at the prices for the past days
model = keras.Sequential([
	    keras.layers.Dense(20, activation=tf.nn.relu, input_shape=(lookback_days, number_of_features)), # Inputs are only the price for the last lookback_days
        keras.layers.Dense(20, activation=tf.nn.relu),
        keras.layers.Dense(20, activation=tf.nn.relu),
        keras.layers.Dense(20, activation=tf.nn.relu),
        keras.layers.Dense(20, activation=tf.nn.relu),
        keras.layers.Dense(20, activation=tf.nn.relu),
        keras.layers.Dense(20, activation=tf.nn.relu),
        keras.layers.SimpleRNN(units=100, activation=tf.nn.relu),
        keras.layers.Dense(20, activation=tf.nn.relu),
	    keras.layers.Dense(1, activation=tf.nn.relu) # Only output one value, the price prediction
	])

model.compile(optimizer=keras.optimizers.Adam(),
	              loss='mean_squared_error',
	              metrics=['accuracy'])
model.summary() # Print a summary of the model

# Train the model
model.fit(train_input, train_output, epochs=5, batch_size=1, verbose=1)

test_value = np.asarray([4013.5]).reshape((1,1,1))

print(model.predict(test_value))

model.save(trained_model_file_path)

# Test the model
