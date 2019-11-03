import { connect } from 'react-redux';

import { toggleApplyNowModal } from './ApplyNowModal.actions';
import { getLabels, getIsModalOpen, getIsPLCCModalOpen } from './ApplyNowModal.selectors';
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
  };
};

const mapStateToProps = (state, ownProps) => {
  const { ApplyCardPage = {} } = state;
  return {
    isModalOpen: getIsModalOpen(state),
    labels: getLabels(state),
    isPLCCModalOpen: getIsPLCCModalOpen(state),
    plccBenefitsList: ApplyCardPage.plccData && ApplyCardPage.plccData.plcc_rewards_list,
    labelText: ownProps.labelText,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyNowModalWrapper);
