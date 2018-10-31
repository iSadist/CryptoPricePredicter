import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';

class Predicter extends Component {
  constructor() {
	const model = tf.sequential();

	model.add(tf.layers.dense({units: 32, inputShape: [1]}));
	model.add(tf.layers.dense({units: 4, kernelRegularizer: "l1l2"}));
	model.add(tf.layers.dense({units: 1, activation: "relu"}));
	this.model = model;
  }

  render() {
    return (
      
    );
  }
}
