import _ from 'underscore';

export const calculateMovingAverage = (data, length) => {
  var movingAverage = []

  for (var k = 0; k < length; k++) {
    const emptyItem = {
      value: 0
    };

    movingAverage.push(emptyItem);
  }

  var previousValues = []

  for (var i = 0; i < data.length; i++) {
    previousValues.push(data[i].value);

    if (previousValues.length === length + 1) {
      const sum = _.reduce(previousValues, (memo, num) => {
        return memo + num;
      }, 0);
      const average = sum / previousValues.length;
      const item = {
        value: average
      }
      movingAverage.push(item);
      previousValues.shift();
    }
  }

  return movingAverage
}
