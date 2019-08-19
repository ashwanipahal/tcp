import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AddGiftCardComponent from '../views/AddGiftCard.view';
import { addGiftCardRequest, resetShowNotification } from './AddGiftCard.actions';
import { getCardList } from '../../container/Payment.actions';
import { getAddGiftCardResponse, getAddGiftCardError } from './AddGiftCard.selector';
import utils, { isMobileApp } from '../../../../../../utils';

class AddGiftCardContainer extends React.Component {
  componentDidMount() {
    const { addGiftCardResponse, toggleModal } = this.props;
    if (isMobileApp() && addGiftCardResponse === 'success') {
      toggleModal();
      const { getCardListAction } = this.props;
      return getCardListAction();
    }

    if (addGiftCardResponse === 'success') {
      return this.goBackToPayment();
    }

    return null;
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
    const { onAddGiftCardClick, getAddGiftCardErr, labels, toggleModal } = this.props;
    return (
      <AddGiftCardComponent
        onAddGiftCardClick={onAddGiftCardClick}
        labels={labels}
        addGiftCardResponse={getAddGiftCardErr}
        goBackToPayment={this.goBackToPayment}
        toggleModal={toggleModal}
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
  };
};

const mapStateToProps = state => {
  return {
    addGiftCardResponse: getAddGiftCardResponse(state),
    getAddGiftCardErr: getAddGiftCardError(state),
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
