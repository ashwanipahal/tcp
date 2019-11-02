import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyPlaceRewardsCreditCardComponent from '../views';
import { getMyPlaceRewardCreditCard } from '../../../../Payment/container/Payment.selectors';
import { getCardList } from '../../../../Payment/container/Payment.actions';
import { toggleApplyNowModal } from '../../../../../../common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.actions';

export class MyPlaceRewardsCreditCardTile extends React.PureComponent {
  static propTypes = {
    getCardListAction: PropTypes.func,
    labels: PropTypes.shape({
      lbl_overview_manageYourCard: PropTypes.string,
    }),
    cardList: PropTypes.shape({}),
    toggleModal: PropTypes.func,
  };

  static defaultProps = {
    getCardListAction: () => {},
    labels: {
      lbl_overview_manageYourCard: '',
    },
    cardList: {},
    toggleModal: () => {},
  };

  componentDidMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  openModal = e => {
    e.preventDefault();
    const { toggleModal } = this.props;
    toggleModal({ isModalOpen: true });
  };

  render() {
    const { cardList, labels } = this.props;
    const cardListValue = cardList && cardList.get(0);
    return (
      <MyPlaceRewardsCreditCardComponent
        myPlaceRewardCard={cardListValue}
        labels={labels}
        openModal={this.openModal}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getCardListAction: () => {
      dispatch(getCardList());
    },
    toggleModal: payload => {
      dispatch(toggleApplyNowModal(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    cardList: getMyPlaceRewardCreditCard(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPlaceRewardsCreditCardTile);
