import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { toastMessageInfo } from '@tcp/core/src/components/common/atoms/Toast/container/Toast.actions.native';
import AddGiftCardComponent from '../views/AddGiftCard.view';
import { addGiftCardRequest, resetShowNotification } from './AddGiftCard.actions';
import { getCardList } from '../../container/Payment.actions';
import {
  getAddGiftCardResponse,
  getAddGiftCardErrorMessage,
  getshowNotification,
} from './AddGiftCard.selector';
import utils, { isMobileApp } from '../../../../../../utils';
import { getFormValidationErrorMessages } from '../../../Account/container/Account.selectors';

class AddGiftCardContainer extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      addGiftCardResponse,
      toggleModal,
      getCardListAction,
      getAddGiftCardErr,
      showNotification,
      toastMessage,
    } = this.props;
    if (addGiftCardResponse === 'success') {
      if (isMobileApp()) {
        toggleModal();
        getCardListAction();
      } else this.goBackToPayment();
    }

    if (isMobileApp() && !prevProps.showNotification && showNotification) {
      toastMessage(getAddGiftCardErr);
    }
  }

  componentWillUnmount() {
    const { getAddGiftCardErr } = this.props;
    if (getAddGiftCardErr) {
      const { resetNotificationStateAction } = this.props;
      resetNotificationStateAction();
    }
  }

  goBackToPayment = () => {
    utils.routerPush('/account?id=payment', '/account/payment');
    return null;
  };

  render() {
    const {
      onAddGiftCardClick,
      getAddGiftCardErr,
      labels,
      toggleModal,
      formErrorMessage,
      showNotification,
    } = this.props;
    return (
      <AddGiftCardComponent
        onAddGiftCardClick={onAddGiftCardClick}
        labels={labels}
        addGiftCardResponse={getAddGiftCardErr}
        goBackToPayment={this.goBackToPayment}
        toggleModal={toggleModal}
        formErrorMessage={formErrorMessage}
        showNotification={showNotification}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onAddGiftCardClick: payload => {
      dispatch(addGiftCardRequest(payload));
    },
    resetNotificationStateAction: () => {
      dispatch(resetShowNotification());
    },
    getCardListAction: () => {
      dispatch(getCardList());
    },
    toastMessage: palyoad => {
      dispatch(toastMessageInfo(palyoad));
    },
  };
};

const mapStateToProps = state => {
  return {
    addGiftCardResponse: getAddGiftCardResponse(state),
    getAddGiftCardErr: getAddGiftCardErrorMessage(state),
    formErrorMessage: getFormValidationErrorMessages(state),
    showNotification: getshowNotification(state),
  };
};

AddGiftCardContainer.propTypes = {
  onAddGiftCardClick: PropTypes.func,
  getAddGiftCardErr: PropTypes.string,
  labels: PropTypes.shape({}),
  addGiftCardResponse: PropTypes.string,
  toggleModal: PropTypes.func,
  resetNotificationStateAction: PropTypes.func,
  getCardListAction: PropTypes.func,
  formErrorMessage: PropTypes.shape({}).isRequired,
  showNotification: PropTypes.bool.isRequired,
  toastMessage: PropTypes.func.isRequired,
};

AddGiftCardContainer.defaultProps = {
  onAddGiftCardClick: () => {},
  getAddGiftCardErr: null,
  labels: {},
  addGiftCardResponse: null,
  toggleModal: () => {},
  resetNotificationStateAction: () => {},
  getCardListAction: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGiftCardContainer);
export { AddGiftCardContainer as AddGiftCardContainerVanilla };
