import React from 'react';
import { connect } from 'react-redux';
import { getLabelValue } from '@tcp/core/src/utils';
import { closeAddedToBag } from './AddedToBag.actions';
import {
  getAddedToBagData,
  isOpenAddedToBag,
  getQuantityValue,
  getAddedToBagLoaderState,
} from './AddedToBag.selectors';
import AddedToBag from '../views/AddedToBag.view';
import { getIsInternationalShipping } from '../../../../../reduxStore/selectors/session.selectors';
import BagPageSelectors from '../../BagPage/container/BagPage.selectors';

// @flow
type Props = {
  closeModal: Function,
  addedToBagData: any,
  isOpenDialog: boolean,
  labels: any,
  quantity: number,
  navigation: object,
  isInternationalShipping: boolean,
  isPayPalWebViewEnable: boolean,
  addedToBagLoaderState: boolean,
};

export class AddedToBagContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillUnmount() {
    this.handleCloseModal();
  }

  handleCloseModal = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  hideHeaderWhilePaypalView = hide => {
    const { navigation } = this.props;
    navigation.setParams({ headerMode: hide });
  };

  closeModal(event) {
    if (event) event.preventDefault();
    this.handleCloseModal();
  }

  render() {
    const {
      addedToBagData,
      isOpenDialog,
      labels,
      quantity,
      navigation,
      isInternationalShipping,
      isPayPalWebViewEnable,
      addedToBagLoaderState,
    } = this.props;
    return (
      <AddedToBag
        openState={isOpenDialog}
        onRequestClose={this.closeModal}
        addedToBagData={addedToBagData}
        isInternationalShipping={isInternationalShipping}
        labels={labels}
        quantity={quantity}
        handleContinueShopping={this.closeModal}
        navigation={navigation}
        isPayPalWebViewEnable={isPayPalWebViewEnable}
        hideHeader={this.hideHeaderWhilePaypalView}
        addedToBagLoaderState={addedToBagLoaderState}
      />
    );
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    closeModal: () => {
      dispatch(closeAddedToBag());
    },
  };
};

const mapStateToProps = state => {
  // ----------- commenting usage of labels as we are getting labels values from backend intermittently. ------------

  const newState = {
    addedToBagData: getAddedToBagData(state),
    isOpenDialog: isOpenAddedToBag(state),
    quantity: getQuantityValue(state),
    isInternationalShipping: getIsInternationalShipping(state),
    isPayPalWebViewEnable: BagPageSelectors.getPayPalWebViewStatus(state),
    addedToBagLoaderState: getAddedToBagLoaderState(state),
  };

  if (state.Labels.global) {
    newState.labels = {
      colorLabel: getLabelValue(state.Labels, 'lbl_info_color', 'addedToBagModal', 'global'),
      sizeLabel: getLabelValue(state.Labels, 'lbl_info_size', 'addedToBagModal', 'global'),
      qtyLabel: getLabelValue(state.Labels, 'lbl_info_Qty', 'addedToBagModal', 'global'),
      pickUpText: getLabelValue(
        state.Labels,
        'lbl_bossBanner_headingDefault',
        'addedToBagModal',
        'global'
      ),
      simplyChooseText: getLabelValue(
        state.Labels,
        'lbl_bossBanner_subHeadingDefault',
        'addedToBagModal',
        'global'
      ),
      noRushText: getLabelValue(state.Labels, 'lbl_bossBanner_noRush', 'addedToBagModal', 'global'),
      price: getLabelValue(state.Labels, 'lbl_info_price', 'addedToBagModal', 'global'),
      pointsYouCanEarn: getLabelValue(
        state.Labels,
        'lbl_info_pointYouCanEarn',
        'addedToBagModal',
        'global'
      ),
      MPRPoints: getLabelValue(state.Labels, 'lbl_info_mprPoint', 'addedToBagModal', 'global'),
      bagSubTotal: getLabelValue(state.Labels, 'lbl_info_subTotal', 'addedToBagModal', 'global'),
      totalRewardsInPoints: getLabelValue(
        state.Labels,
        'lbl_info_totalRewardsInBag',
        'addedToBagModal',
        'global'
      ),
      totalNextRewards: getLabelValue(
        state.Labels,
        'lbl_info_totalNextRewards',
        'addedToBagModal',
        'global'
      ),
      addedToBag: getLabelValue(state.Labels, 'lbl_header_addedToBag', 'addedToBagModal', 'global'),
      giftDesign: getLabelValue(state.Labels, 'lbl_info_giftDesign', 'addedToBagModal', 'global'),
      giftValue: getLabelValue(state.Labels, 'lbl_info_giftValue', 'addedToBagModal', 'global'),
      continueShopping: getLabelValue(
        state.Labels,
        'lbl_footer_continueShopping',
        'addedToBagModal',
        'global'
      ),
      viewBag: getLabelValue(state.Labels, 'lbl_cta_viewBag', 'addedToBagModal', 'global'),
      checkout: getLabelValue(state.Labels, 'lbl_cta_checkout', 'addedToBagModal', 'global'),
      close: getLabelValue(state.Labels, 'lbl_aria_close', 'addedToBagModal', 'global'),
      overlayAriaText: getLabelValue(
        state.Labels,
        'lbl_aria_overlay_text',
        'addedToBagModal',
        'global'
      ),
    };
  } else {
    newState.labels = {
      colorLabel: '',
      sizeLabel: '',
      qtyLabel: '',
      pickUpText: '',
      simplyChooseText: '',
      noRushText: '',
      price: '',
      pointsYouCanEarn: '',
      MPRPoints: '',
      bagSubTotal: '',
      totalRewardsInPoints: '',
      totalNextRewards: '',
      addedToBag: '',
      giftDesign: '',
      giftValue: '',
      continueShopping: '',
      viewBag: '',
      checkout: '',
      close: getLabelValue(state.Labels, 'lbl_aria_close', 'addedToBagModal', 'global'),
      overlayAriaText: getLabelValue(
        state.Labels,
        'lbl_aria_overlay_text',
        'addedToBagModal',
        'global'
      ),
    };
  }

  return newState;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagContainer);
