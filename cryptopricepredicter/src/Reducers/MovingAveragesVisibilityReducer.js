import { UPDATE_MOVING_AVERAGES_VISIBILITY } from '../Actions/updateMovingAveragesVisibility-actions';

export default function movingAveragesReducer(state = [], { type, payload }) {
  switch (type) {
    case UPDATE_MOVING_AVERAGES_VISIBILITY:
      return payload.showMovingAverages;
    default:
      return state;
  }
}
