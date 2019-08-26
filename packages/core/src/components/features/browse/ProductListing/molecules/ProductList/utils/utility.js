/**
 * @method getPromotionalMessage - this function checks whether the user is PLCC or not and
 *         returns the message respectively
 * @param isPlcc  boolean value for plcc user
 * @param {handlers}  the messages containing both plcc user message and non-plcc user message
 */
/* eslint-disable */
const getPromotionalMessage = (isPlcc, handlers) => {
  if (!!handlers.promotionalPLCCMessage || !!handlers.promotionalMessage) {
    return isPlcc ? handlers.promotionalPLCCMessage : handlers.promotionalMessage;
  }
};

/**
 * @method getAddToBagFormName - this method returns the form name with productId appending the
 * text 'AddToBagForm-'
 * @param {string} productId - id needs to be append to the add to bag text
 */
// const getAddToBagFormName = productId => labels.ADD_TO_BAG_FORM_NAME + productId;

/**
 * @method validateBossEligibility
 * @description checks the bopis product flags for returning the boolean
 * value
 * @param {bool} isBossClearanceProductEnabled this flag is derived through the kill
 * Switch API. If a product is of Clearance then we need to check this kill switch
 * @param {bool} isBossEnabled this flag is a global bopss Enability flag, which is
 * derived from the UserRegisteredInfo API. Backend sends this flag along with
 * validating country and state bopis availability
 * @param {object} miscInfo object data with pickup eligibility of product
 */

function validateBossEligibility({ isBossClearanceProductEnabled, isBossEnabled, miscInfo }) {
  const bossEligibility = isBossEnabled && miscInfo.isBossEligible;
  // adding this check as productDynamicAbstractor and cartDynamicAbstractor return
  // different keys for clearance item identification
  return miscInfo.isClearance || miscInfo.clearanceItem
    ? isBossClearanceProductEnabled && bossEligibility
    : bossEligibility;
}

/**
 * @method validateBopisEligibility
 * @description checks the bopis product flags for returning the boolean
 * value
 * @param {bool} isBopisClearanceProductEnabled this flag is derived through the kill
 * Switch API. If a product is of Clearance then we need to check this kill switch
 * @param {bool} isBopisEnabled this flag is a global bopis Enability flag, which is
 * derived from the UserRegisteredInfo API. Backend sends this flag along with
 * validating country and state bopis availability
 * @param {object} miscInfo object data with pickup eligibility of product
 */
function validateBopisEligibility({ isBopisClearanceProductEnabled, isBopisEnabled, miscInfo }) {
  const bopisEligibility = isBopisEnabled && miscInfo.isBopisEligible;
  // productDynamicAbstractor and cartDynamicAbstractor return different keys for clearance item
  return miscInfo.isClearance || miscInfo.clearanceItem
    ? isBopisClearanceProductEnabled && bopisEligibility
    : bopisEligibility;
}

export {
  getPromotionalMessage,
  // getAddToBagFormName,
  validateBossEligibility,
  validateBopisEligibility,
};
