import { UPDATE_MOVING_AVERAGES } from '../Actions/movingAverage-actions';

export default function movingAveragesReducer(state = [], { type, payload }) {
  switch (type) {
    case UPDATE_MOVING_AVERAGES:
      return payload.movingAverages;
    default:
      return state;
  }
}
