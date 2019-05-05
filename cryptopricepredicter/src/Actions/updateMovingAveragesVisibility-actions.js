export const UPDATE_MOVING_AVERAGES_VISIBILITY = 'movingAverage:updateMovingAveragesVisibility';

export function updateMovingAveragesVisibility(visible) {
  return {
      type: UPDATE_MOVING_AVERAGES_VISIBILITY,
      payload: {
        showMovingAverages: visible,
      },
    };
}
