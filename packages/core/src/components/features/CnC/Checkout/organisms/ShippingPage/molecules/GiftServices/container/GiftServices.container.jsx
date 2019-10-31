import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import { getCurrencySymbol } from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger/container/orderLedger.selector';
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

class GiftServicesContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    const { giftWrap } = this.props;

    this.state = {
      brandState: giftWrap ? giftWrap.get('brand') : '',
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
    }
    this.setState({ brandState: brandName });
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
  detailsRichTextGymboree: getDetailsContentZymboorie(state),
  giftWrapOptions: getGiftWrapOptions(state),
  giftWrap: getInitialGiftWrapOptions(state),
  currencySymbol: getCurrencySymbol(state),
});

export default connect(mapStateToProps)(GiftServicesContainer);
