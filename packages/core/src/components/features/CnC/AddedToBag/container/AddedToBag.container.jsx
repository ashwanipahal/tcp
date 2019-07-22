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
  return {
    addedToBagData: getAddedToBagData(state),
    isOpenDialog: isOpenAddedToBag(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagContainer);
