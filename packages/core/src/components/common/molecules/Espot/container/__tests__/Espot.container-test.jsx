import { mapDispatchToProps } from '../Espot.container';
import { toggleApplyNowModal } from '../../../ApplyNowPLCCModal/container/ApplyNowModal.actions';

describe('#Espot container', () => {
  describe('#mapDispatchToProps', () => {
    const dispatch = jest.fn();
    it('should return togglePlccModal prop which will call dispatch with toggleApplyNowModal action with payload', () => {
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.togglePlccModal(true);
      expect(dispatch).toHaveBeenLastCalledWith(
        toggleApplyNowModal({
          isModalOpen: true,
        })
      );
    });

    it('should return togglePlccModal prop which will call dispatch with toggleApplyNowModal action with false if payload not passed', () => {
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.togglePlccModal();
      expect(dispatch).toHaveBeenLastCalledWith(
        toggleApplyNowModal({
          isModalOpen: false,
        })
      );
    });
  });
});
