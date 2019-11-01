import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyPlaceRewardsCreditCardComponent from '../views';
import { getMyPlaceRewardCreditCard } from '../../../../Payment/container/Payment.selectors';
import { getCardList } from '../../../../Payment/container/Payment.actions';

export class MyPlaceRewardsCreditCardTile extends React.Component {
  static propTypes = {
    getCardListAction: PropTypes.func,
    labels: PropTypes.shape({
      lbl_overview_paymentHeading: PropTypes.string,
      lbl_overview_paymentCTA: PropTypes.string,
    }),
    cardList: PropTypes.shape({}),
  };

  static defaultProps = {
    getCardListAction: () => {},
    labels: {
      lbl_overview_paymentHeading: '',
      lbl_overview_paymentCTA: '',
    },
    cardList: {},
  };

  componentDidMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  render() {
    const { cardList, labels } = this.props;
    const cardListValue = cardList && cardList.get(0);
    return <MyPlaceRewardsCreditCardComponent myPlaceRewardCard={cardListValue} labels={labels} />;
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getCardListAction: () => {
      dispatch(getCardList());
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
