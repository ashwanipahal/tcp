import BAGPAGE_CONSTANTS from '../BagPage.constants';

const closeAddedToBag = payload => ({
  type: BAGPAGE_CONSTANTS.SET_ADDED_TO_BAG,
  payload,
});

export default {
  closeAddedToBag,
};
