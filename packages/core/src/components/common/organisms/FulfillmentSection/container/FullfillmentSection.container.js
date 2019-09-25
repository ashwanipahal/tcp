import { connect } from 'react-redux';
import FullfillmentSectionView from '../views/FullfillmentSection.view';
import { togglePickupModal } from '../../PickupStoreModal/container/PickUpStoreModal.actions';
import { getIsPickupModalOpen } from '../../PickupStoreModal/container/PickUpStoreModal.selectors';

export const mapStateToProps = state => {
  return {
    pickupModalState: getIsPickupModalOpen(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    togglePickupModal: payload => {
      dispatch(togglePickupModal(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullfillmentSectionView);
