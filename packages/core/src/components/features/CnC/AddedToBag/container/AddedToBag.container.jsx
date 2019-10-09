import React from 'react';
import { connect } from 'react-redux';
import {
  getLabelValue,
  isMobileApp,
  enableBodyScroll,
  disableBodyScroll,
} from '@tcp/core/src/utils';
import { closeAddedToBag } from './AddedToBag.actions';
import { getAddedToBagData, isOpenAddedToBag, getQuantityValue } from './AddedToBag.selectors';
import AddedToBag from '../views/AddedToBag.view';

// @flow
type Props = {
  closeModal: Function,
  addedToBagData: any,
  isOpenDialog: boolean,
  labels: any,
  quantity: number,
  navigation: object,
};

export class AddedToBagContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isOpenDialog } = this.props;
    const { isOpenDialog: previousOpenState } = prevProps;

    if (!isMobileApp() && isOpenDialog !== previousOpenState && isOpenDialog) {
      disableBodyScroll();
    }
  }

  closeModal(event) {
    if (event) event.preventDefault();
    const { closeModal } = this.props;
    if (!isMobileApp()) {
      enableBodyScroll();
    }
    closeModal();
  }

  render() {
    const { addedToBagData, isOpenDialog, labels, quantity, navigation } = this.props;
    return (
      <AddedToBag
        openState={isOpenDialog}
        onRequestClose={this.closeModal}
        addedToBagData={addedToBagData}
        labels={labels}
        quantity={quantity}
        handleContinueShopping={this.closeModal}
        navigation={navigation}
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
  return {
    addedToBagData: getAddedToBagData(state),
    isOpenDialog: isOpenAddedToBag(state),
    quantity: getQuantityValue(state),
    labels: {
      colorLabel,
      sizeLabel,
      qtyLabel,
      pickUpText,
      simplyChooseText,
      noRushText,
      price,
      pointsYouCanEarn,
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
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagContainer);
