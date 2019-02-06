export const UPDATE_MOVING_AVERAGES = 'movingAverage:updateMovingAverages';

export function updateMovingAverages(newMovingAverages) {
  return {
      type: UPDATE_MOVING_AVERAGES,
      payload: {
        movingAverages: newMovingAverages,
      },
    };
}
