import React from 'react';
import { connect } from 'react-redux';
import BagPageSelector from './BagPage.selectors';
import BagPage from '../views/BagPage.view';
import BAG_PAGE_ACTIONS from './BagPage.actions';

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

  componentWillMount = () => {
    const { initialActions } = this.props;
    initialActions();
  };

  render() {
    const { labels } = this.props;
    return <BagPage labels={labels} />;
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    initialActions: () => {
      dispatch(BAG_PAGE_ACTIONS.getCartData());
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
