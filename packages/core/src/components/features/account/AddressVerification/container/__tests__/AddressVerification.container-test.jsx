import { mapDispatchToProps } from '../AddressVerification.container';

describe('AddressVerificationContainer', () => {
  describe('#mapDispatchToProps', () => {
    it('should return resetVerifyAddressAction which call dispatch', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.resetVerifyAddressAction();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
