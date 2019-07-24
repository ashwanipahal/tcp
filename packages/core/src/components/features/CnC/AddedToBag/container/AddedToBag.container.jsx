import React from 'react';
import { connect } from 'react-redux';
import { addToCartEcom, closeAddedToBag } from './AddedToBag.actions';
import { getAddedToBagData, isOpenAddedToBag } from './AddedToBag.selectors';
import AddedToBag from '../views/AddedToBag.view';

// @flow
type Props = {
  closeModal: Function,
  addedToBagData: any,
  isOpenDialog: boolean,
  labels: any,
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
    const { addedToBagData, isOpenDialog, labels } = this.props;
    return (
      <AddedToBag
        openState={isOpenDialog}
        onRequestClose={this.closeModal}
        addedToBagData={addedToBagData}
        labels={labels}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    addToCartEcom: payload => {
      dispatch(addToCartEcom(payload));
    },
    closeModal: () => {
      dispatch(closeAddedToBag());
    },
  };
};

const mapStateToProps = state => {
  const {
    bag: {
      addedToBag: {
        lbl_info_color: colorLabel,
        lbl_info_size: sizeLabel,
        lbl_info_Qty: qtyLabel,
        lbl_bossBanner_headingDefault: pickUpText,
        lbl_bossBanner_subHeadingDefault: simplyChooseText,
        lbl_bossBanner_noRush: noRushText,
      },
    },
  } = state.Labels;
  return {
    addedToBagData: getAddedToBagData(state),
    isOpenDialog: isOpenAddedToBag(state),
    labels: {
      colorLabel,
      sizeLabel,
      qtyLabel,
      pickUpText,
      simplyChooseText,
      noRushText,
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagContainer);
