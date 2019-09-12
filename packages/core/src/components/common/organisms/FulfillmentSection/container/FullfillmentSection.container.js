import { connect } from 'react-redux';
import FullfillmentSectionView from '../views/FullfillmentSection.view';
import { togglePickupModal } from '../../PickupStoreModal/container/PickUpStoreModal.actions';

export const mapDispatchToProps = dispatch => {
  return {
    togglePickupModal: payload => {
      dispatch(togglePickupModal(payload));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FullfillmentSectionView);
