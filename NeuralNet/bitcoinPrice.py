import tensorflow as tf
from tensorflow import keras

lookback_days = 90
trained_model_file_path = "./Models/bitcoinprice.h5"

# Load in the data from the JSON file

# Create a sequential network to look at the prices for the past days
model = keras.Sequential([
	    keras.layers.Dense(20, kernel_regularizer=keras.regularizers.l2(0.003), activation=tf.nn.relu, input_shape=(lookback_days, 1, 1)), # Inputs are only the price for the last lookback_days
        # Add recurring layers
	    keras.layers.Dense(20, kernel_regularizer=keras.regularizers.l2(0.003), activation=tf.nn.relu),
	    keras.layers.Dense(1, activation=tf.nn.relu) # Only output one value, the price prediction
	])

model.compile(optimizer=keras.optimizers.Adam(),
	              loss='mean_squared_error',
	              metrics=['accuracy'])
model.summary() # Print a summary of the model

# Train the model

model.save(trained_model_file_path)

# Test the model
