import React from 'react';
import { connect } from 'react-redux';
import BagPageActions from './BagPage.actions';
import BagPageSelector from './BagPage.selectors';
import BagPage from '../views/BagPage.view';

// @flow
// type Props = {
//   closeModal: Function,
//   addedToBagData: any,
//   isOpenDialog: boolean,
//   labels: any,
//   quantity: number,
// };

export class BagPageContainer extends React.Component<Props> {
  closeModal = () => {};

  render() {
    const { labels } = this.props;
    return <BagPage labels={labels} />;
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    closeModal: () => {
      dispatch(BagPageActions.closeAddedToBag());
    },
  };
};

const mapStateToProps = state => {
  return {
    labels: BagPageSelector.getBagPageLabels(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BagPageContainer);
