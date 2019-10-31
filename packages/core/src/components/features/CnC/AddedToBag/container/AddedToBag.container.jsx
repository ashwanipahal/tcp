import React from 'react';
import { connect } from 'react-redux';
import { getLabelValue } from '@tcp/core/src/utils';
import { closeAddedToBag } from './AddedToBag.actions';
import { getAddedToBagData, isOpenAddedToBag, getQuantityValue } from './AddedToBag.selectors';
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
    if (hide) {
      this.props.navigation.setParams({ headerMode: true });
    } else {
      this.props.navigation.setParams({ headerMode: false });
    }
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
  };

  if (state.Labels.global) {
    const {
      global: {
        addedToBagModal: {
          lbl_info_color: colorLabel,
          lbl_info_size: sizeLabel,
          lbl_info_Qty: qtyLabel,
          lbl_bossBanner_headingDefault: pickUpText,
          lbl_bossBanner_subHeadingDefault: simplyChooseText,
          lbl_bossBanner_noRush: noRushText,
          lbl_info_price: price,
          lbl_info_pointYouCanEarn: pointsYouCanEarn,
          lbl_info_mprPoint: MPRPoints,
          lbl_info_subTotal: bagSubTotal,
          lbl_info_totalRewardsInBag: totalRewardsInPoints,
          lbl_info_totalNextRewards: totalNextRewards,
          lbl_header_addedToBag: addedToBag,
          lbl_info_giftDesign: giftDesign,
          lbl_info_giftValue: giftValue,
          lbl_footer_continueShopping: continueShopping,
          lbl_cta_viewBag: viewBag,
          lbl_cta_checkout: checkout,
        },
      },
    } = state.Labels;

    newState.labels = {
      colorLabel,
      sizeLabel,
      qtyLabel,
      pickUpText,
      simplyChooseText,
      noRushText,
      price,
      pointsYouCanEarn,
      MPRPoints,
      bagSubTotal,
      totalRewardsInPoints,
      totalNextRewards,
      addedToBag,
      giftDesign,
      giftValue,
      continueShopping,
      viewBag,
      checkout,
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
