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

export const translateToColorHex = (colorName) => {
  switch (colorName) {
    case "green":
      return '#34c735';
    case "yellow":
      return '#f5ff3c';
    case 'red':
      return '#de2915';
    case 'blue':
      return '#3372dd';
    case 'purple':
      return '#aa2dd0';
    default:
      return '#000000';
  }
}
