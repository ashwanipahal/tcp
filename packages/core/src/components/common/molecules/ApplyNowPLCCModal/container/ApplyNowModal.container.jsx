import { connect } from 'react-redux';

import { toggleApplyNowModal } from './ApplyNowModal.actions';
import { getLabels, getIsModalOpen, getIsPLCCModalOpen } from './ApplyNowModal.selectors';
import CheckoutSelectors from '../../../../features/CnC/Checkout/container/Checkout.selector';
import CHECKOUT_ACTIONS from '../../../../features/CnC/Checkout/container/Checkout.action';
import ApplyNowModalWrapper from '../views';
import {
  resetPLCCResponse,
  fetchModuleX,
} from '../../../../features/browse/ApplyCardPage/container/ApplyCard.actions';

export const mapDispatchToProps = dispatch => {
  return {
    toggleModal: payload => {
      dispatch(toggleApplyNowModal(payload));
    },
    resetPLCCApplicationStatus: payload => {
      dispatch(resetPLCCResponse(payload));
    },
    fetchModuleXContent: payload => {
      dispatch(fetchModuleX(payload));
    },
    setIsRTPSFlow: payload => {
      dispatch(CHECKOUT_ACTIONS.setIsRTPSFlow(payload))
    },
    submitAcceptOrDeclinePlcc: payload => {
      dispatch(CHECKOUT_ACTIONS.submitAcceptOrDeclinePlccOffer(payload))
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  const { ApplyCardPage = {} } = state;
  return {
    isModalOpen: getIsModalOpen(state),
    labels: getLabels(state),
    isPLCCModalOpen: getIsPLCCModalOpen(state),
    plccBenefitsList: ApplyCardPage.plccData && ApplyCardPage.plccData.plcc_rewards_list,
    rtpsCongratsMsg: ApplyCardPage.plccData && ApplyCardPage.plccData.rtps_congralutaions_msg,
    rtpsOptOutMsg: ApplyCardPage.plccData && ApplyCardPage.plccData.rtps_opt_out_notice,
    rtpsTextTerms: ApplyCardPage.plccData && ApplyCardPage.plccData.rtps_text_terms,
    labelText: ownProps.labelText,
    isRtpsFlow: CheckoutSelectors.getIsRtpsFlow(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyNowModalWrapper);
