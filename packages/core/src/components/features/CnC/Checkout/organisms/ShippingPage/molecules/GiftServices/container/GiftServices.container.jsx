import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencySymbol } from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger/container/orderLedger.selector';
import GiftServices from '../views/GiftServices.view';
import {
  getGiftServicesLabels,
  getDetailsContent,
  getGiftWrapOptions,
  getInitialGiftWrapOptions,
} from './GiftServices.selector';

class GiftServicesContainer extends React.PureComponent {
  render() {
    const {
      labels,
      detailsRichText,
      formName,
      formSection,
      dispatch,
      giftWrapOptions,
      giftWrap,
      currencySymbol,
    } = this.props;
    const optionId = giftWrap ? giftWrap.get('optionId') : '';
    const message = giftWrap ? giftWrap.get('message') : '';
    const hasGiftWrapping = !!giftWrap.size;
    const brand = giftWrap ? giftWrap.get('brand') : '';
    const updateLabels = { ...labels, DETAILS_RICH_TEXT: detailsRichText };
    return (
      <GiftServices
        labels={updateLabels}
        formName={formName}
        dispatch={dispatch}
        isGiftServicesChecked={giftWrap.size}
        formSection={formSection}
        giftWrapOptions={giftWrapOptions}
        initialValues={{ optionId, message, hasGiftWrapping, brand }}
        currencySymbol={currencySymbol}
      />
    );
  }
}
GiftServicesContainer.propTypes = {
  labels: PropTypes.shape.isRequired,
  formName: PropTypes.string,
  formSection: PropTypes.string,
  dispatch: PropTypes.func,
  detailsRichText: PropTypes.shape.isRequired,
  giftWrapOptions: PropTypes.shape.isRequired,
  giftWrap: PropTypes.shape.isRequired,
  currencySymbol: PropTypes.string,
};
GiftServicesContainer.defaultProps = {
  dispatch: () => {},
  formName: '',
  formSection: '',
  currencySymbol: '$',
};

export const mapStateToProps = state => ({
  labels: getGiftServicesLabels(state),
  detailsRichText: getDetailsContent(state),
  giftWrapOptions: getGiftWrapOptions(state),
  giftWrap: getInitialGiftWrapOptions(state),
  currencySymbol: getCurrencySymbol(state),
});

export default connect(mapStateToProps)(GiftServicesContainer);
