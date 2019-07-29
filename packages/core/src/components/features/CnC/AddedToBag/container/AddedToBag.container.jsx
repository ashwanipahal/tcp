import React from 'react';
import { connect } from 'react-redux';
import { closeAddedToBag } from './AddedToBag.actions';
import { getAddedToBagData, isOpenAddedToBag } from './AddedToBag.selectors';
import AddedToBag from '../views/AddedToBag.view';

// @flow
type Props = {
  closeModal: Function,
  addedToBagData: any,
  isOpenDialog: boolean,
  // labels: any,
};

export class AddedToBagContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const { closeModal } = this.props;
    closeModal();
  }

  render() {
    const { addedToBagData, isOpenDialog } = this.props;
    return (
      <AddedToBag
        openState={isOpenDialog}
        onRequestClose={this.closeModal}
        addedToBagData={addedToBagData}
        // labels={labels}
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

  // const {
  //   bag: {
  //     addedToBag: {
  //       lbl_info_color: colorLabel,
  //       lbl_info_size: sizeLabel,
  //       lbl_info_Qty: qtyLabel,
  //       lbl_bossBanner_headingDefault: pickUpText,
  //       lbl_bossBanner_subHeadingDefault: simplyChooseText,
  //       lbl_bossBanner_noRush: noRushText,
  //       lbl_cta_viewBag: viewBag,
  //       lbl_cta_checkout: checkout,
  //       lbl_info_price: price,
  //       lbl_info_pointYouCanEarn: pointsYouCanEarn,
  //       lbl_info_subTotal: bagSubTotal,
  //       lbl_info_totalRewardsInBag: totalRewardsInPoints,
  //       lbl_info_totalNextRewards: totalNextRewards,
  //       lbl_header_addedToBag: addedToBag,
  //     },
  //   },
  // } = state.Labels;
  return {
    addedToBagData: getAddedToBagData(state),
    isOpenDialog: isOpenAddedToBag(state),
    // labels: {
    //   colorLabel,
    //   sizeLabel,
    //   qtyLabel,
    //   pickUpText,
    //   simplyChooseText,
    //   noRushText,
    //   viewBag,
    //   checkout,
    //   price,
    //   pointsYouCanEarn,
    //   bagSubTotal,
    //   totalRewardsInPoints,
    //   totalNextRewards,
    //   addedToBag,
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagContainer);
