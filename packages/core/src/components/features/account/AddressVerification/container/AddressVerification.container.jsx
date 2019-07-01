import { connect } from 'react-redux';
import {
  getUserAddress,
  getSuggestedAddress,
  getModalState,
} from './AddressVerification.selectors';
import AddressVerification from '../views/AddressVerification.view';
import { resetVerifyAddress } from './AddressVerification.actions';

const mapStateToProps = state => {
  return {
    userAddress: getUserAddress(state),
    suggestedAddress: getSuggestedAddress(state),
    modalState: getModalState(state),
  };
};

const mapDispatchToProps = dispatch => ({
  resetVerifyAddressAction: () => {
    dispatch(resetVerifyAddress());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressVerification);
