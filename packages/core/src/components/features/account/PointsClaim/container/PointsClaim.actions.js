import constants from '../PointsClaim.constants';

/**
 * @function submitClaimPoints
 * action creator for type: POINTS_CLAIM
 */
export const submitClaimPoints = payload => ({
  type: constants.POINTS_CLAIM,
  payload,
});

/**
 * @function submitClaimSuccess
 * action creator for type: POINTS_CLAIM_SUCCESS
 */
export const submitClaimSuccess = payload => ({
  type: constants.POINTS_CLAIM_SUCCESS,
  payload,
});

/**
 * @function submitClaimError
 * action creator for type: POINTS_CLAIM_ERROR
 */
export const submitClaimError = payload => ({
  type: constants.POINTS_CLAIM_ERROR,
  payload,
});

/**
 * @function resetState
 * action creator for type: RESET_STATE
 */
export const resetState = () => ({
  type: constants.RESET_STATE,
});
