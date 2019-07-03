import { connect } from 'react-redux';
import {
  getUserAddress,
  getSuggestedAddress,
  getVerificationResult,
} from './AddressVerification.selectors';
import AddressVerificationComponent from '../views/AddressVerification.view';
import { resetVerifyAddress } from './AddressVerification.actions';

const mapStateToProps = state => {
  return {
    userAddress: getUserAddress(state),
    suggestedAddress: getSuggestedAddress(state),
    verificationResult: getVerificationResult(state),
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
)(AddressVerificationComponent);
