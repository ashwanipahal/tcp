import constants from '../PointsClaim.constants';

export const submitClaimPoints = payload => ({
  type: constants.POINTS_CLAIM,
  payload,
});

export const submitClaimSuccess = payload => ({
  type: constants.POINTS_CLAIM_SUCCESS,
  payload,
});

export const submitClaimError = payload => ({
  type: constants.POINTS_CLAIM_ERROR,
  payload,
});

export const resetState = () => ({
  type: constants.RESET_STATE,
});
