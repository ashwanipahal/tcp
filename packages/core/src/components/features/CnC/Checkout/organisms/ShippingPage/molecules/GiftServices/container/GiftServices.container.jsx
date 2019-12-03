import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import { getCurrencySymbol } from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger/container/orderLedger.selector';
import { setClickAnalyticsData, trackClick } from '@tcp/core/src/analytics/actions';
import { getProductDetails } from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import CONSTANTS from '@tcp/core/src/components/features/CnC/Checkout/Checkout.constants';
import GiftServices from '../views/GiftServices.view';
import {
  getGiftServicesLabels,
  getDetailsContent,
  getGiftWrapOptions,
  getInitialGiftWrapOptions,
  getDetailsContentZymboorie,
} from './GiftServices.selector';
import GIFT_SERVICES_CONSTANTS from '../GiftServices.constants';
import { isGymboree, isCanada } from '../../../../../../../../../utils';
import BagPageSelector from '../../../../../../BagPage/container/BagPage.selectors';

class GiftServicesContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    const { giftWrap, cartOrderItems } = this.props;
    const productsData = [];
    if (cartOrderItems) {
      cartOrderItems.map(tile => {
        const productDetail = getProductDetails(tile);
        const {
          itemInfo: { itemId, color, name, offerPrice, size, listPrice, qty },
          productInfo: { skuId, upc, productPartNumber, generalProductId },
        } = productDetail;

        const prodData = {
          color,
          id: itemId,
          name,
          price: offerPrice,
          extPrice: offerPrice,
          listPrice,
          partNumber: productPartNumber,
          size,
          upc,
          sku: skuId.toString(),
          quantity: qty,
          colorId: generalProductId,
        };
        productsData.push(prodData);
        return prodData;
      });
    }
    this.state = {
      brandState: giftWrap ? giftWrap.get('brand') : '',
      orderItems: productsData,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const brand = this.getBrandForGiftServices();
    if (dispatch) {
      dispatch(change('GiftServices', `brand`, brand));
    }
  }

  getBrandForGiftServices = () => {
    const { brandState } = this.state;
    let brand = '';
    if (brandState) {
      brand = brandState;
    } else {
      brand = isGymboree() ? GIFT_SERVICES_CONSTANTS.GYM : GIFT_SERVICES_CONSTANTS.TCP;
    }
    return brand;
  };

  handleToggle = (e, brandName) => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch(change('GiftServices', `brand`, brandName));
      dispatch(change('GiftServices', `optionId`, 'standard'));
      dispatch(change('GiftServices', `message`, ''));
    }
    this.setState({ brandState: brandName });
  };

  handleAnalytics = () => {
    const { setClickAnalyticsDataGC, trackClickAnalytics } = this.props;
    const { orderItems } = this.state;
    const { CHECKOUT_PAGE, CHECKOUT_SHIPPING_PAGE } = CONSTANTS;
    setClickAnalyticsDataGC({
      customEvents: ['event10'],
      eventName: 'select gift option',
      products: orderItems,
    });
    trackClickAnalytics({
      name: 'gift_options',
      module: 'checkout',
      pageData: {
        pageName: CHECKOUT_SHIPPING_PAGE,
        pageSection: CHECKOUT_PAGE,
        pageSubSection: CHECKOUT_PAGE,
        pageType: CHECKOUT_PAGE,
        pageShortName: CHECKOUT_SHIPPING_PAGE,
      },
    });
  };

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
      detailsRichTextGymboree,
      setClickAnalyticsDataGC,
      cartOrderItems,
    } = this.props;
    if (!isCanada()) {
      const optionId = giftWrap ? giftWrap.get('optionId') : '';
      const message = giftWrap ? giftWrap.get('message') : '';
      const hasGiftWrapping = giftWrap && !!giftWrap.size;
      const brand = giftWrap ? giftWrap.get('brand') : '';
      const SelectedBrand = this.getBrandForGiftServices();
      const updateLabels = {
        ...labels,
        DETAILS_RICH_TEXT: detailsRichText,
        DETAILS_RICH_TEXT_GYM: detailsRichTextGymboree,
      };
      return (
        <>
          {!!giftWrapOptions && (
            <GiftServices
              labels={updateLabels}
              formName={formName}
              dispatch={dispatch}
              isGiftServicesChecked={giftWrap && giftWrap.size}
              formSection={formSection}
              giftWrapOptions={giftWrapOptions}
              initialValues={{ optionId, message, hasGiftWrapping, brand }}
              currencySymbol={currencySymbol}
              handleToggle={this.handleToggle}
              SelectedBrand={SelectedBrand}
              setClickAnalyticsDataGC={setClickAnalyticsDataGC}
              cartOrderItems={cartOrderItems}
              handleAnalytics={this.handleAnalytics}
            />
          )}
        </>
      );
    }
    return null;
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
  detailsRichTextGymboree: PropTypes.shape.isRequired,
  setClickAnalyticsDataGC: PropTypes.func.isRequired,
  cartOrderItems: PropTypes.shape([]).isRequired,
  trackClickAnalytics: PropTypes.func.isRequired,
};
GiftServicesContainer.defaultProps = {
  dispatch: () => {},
  formName: '',
  formSection: '',
  currencySymbol: '$',
};

export const mapDispatchToProps = dispatch => {
  return {
    setClickAnalyticsDataGC: payload => {
      dispatch(setClickAnalyticsData(payload));
    },
    trackClickAnalytics: payload => {
      dispatch(trackClick(payload));
    },
  };
};

export const mapStateToProps = state => ({
  labels: getGiftServicesLabels(state),
  detailsRichText: getDetailsContent(state),
  detailsRichTextGymboree: getDetailsContentZymboorie(state),
  giftWrapOptions: getGiftWrapOptions(state),
  giftWrap: getInitialGiftWrapOptions(state),
  currencySymbol: getCurrencySymbol(state),
  cartOrderItems: BagPageSelector.getOrderItems(state) || [],
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftServicesContainer);
