import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PaymentOverviewTileComponent from '../views';
import {
  getCreditCardDefault,
  getGiftCards,
  getVenmoCards,
  getCardListFetchingState,
} from '../../../../Payment/container/Payment.selectors';
import { getCardList } from '../../../../Payment/container/Payment.actions';
import PaymentOverviewTileSkelton from '../skelton/PaymentOverviewTileSkelton.view';

export class PaymentOverviewTile extends React.Component {
  static propTypes = {
    getCardListAction: PropTypes.func,
    labels: PropTypes.shape({
      lbl_overview_paymentHeading: PropTypes.string,
      lbl_overview_paymentCTA: PropTypes.string,
    }),
    creditCardDefault: PropTypes.shape({}),
    giftCardList: PropTypes.shape({}),
    venmoCardList: PropTypes.shape({}),
    isFetching: PropTypes.bool,
  };

  static defaultProps = {
    getCardListAction: () => {},
    labels: {
      lbl_overview_paymentHeading: '',
      lbl_overview_paymentCTA: '',
    },
    creditCardDefault: {},
    giftCardList: {},
    venmoCardList: {},
    isFetching: false,
  };

  componentDidMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  render() {
    const { creditCardDefault, giftCardList, venmoCardList, labels, isFetching } = this.props;
    const creditCardDefaultValue = creditCardDefault && creditCardDefault.get(0);
    const giftCardListValue = giftCardList && giftCardList.get(-1);
    const venmoCardListValue = venmoCardList && venmoCardList.get(0);

    if (isFetching) {
      return <PaymentOverviewTileSkelton />;
    }
    return (
      <PaymentOverviewTileComponent
        creditCardDefault={creditCardDefaultValue}
        giftCardList={giftCardListValue}
        venmoCardList={venmoCardListValue}
        labels={labels}
      />
    );
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
    creditCardDefault: getCreditCardDefault(state),
    giftCardList: getGiftCards(state),
    venmoCardList: getVenmoCards(state),
    isFetching: getCardListFetchingState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentOverviewTile);
