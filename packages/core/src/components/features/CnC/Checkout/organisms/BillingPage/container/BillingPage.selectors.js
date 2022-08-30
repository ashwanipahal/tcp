import CONSTANTS from '../../../Checkout.constants';

const getCVVCodeInfoContentId = state => {
  let cvvCodeCID;
  /* istanbul ignore else */
  if (state.Labels.checkout.billing && Array.isArray(state.Labels.checkout.billing.referred)) {
    state.Labels.checkout.billing.referred.forEach(label => {
      /* istanbul ignore else */
      if (label.name === CONSTANTS.CREDIT_CARD_CVV_INFO_LABEL) cvvCodeCID = label.contentId;
    });
  }
  return cvvCodeCID;
};

const getCVVCodeRichTextSelector = state => {
  const rContent = state.CartPageReducer.get('moduleXContent').find(
    moduleX => moduleX.name === getCVVCodeInfoContentId(state)
  );
  return rContent && rContent.richText;
};

export { getCVVCodeInfoContentId, getCVVCodeRichTextSelector };
