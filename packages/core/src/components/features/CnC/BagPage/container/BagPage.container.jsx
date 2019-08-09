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
  componentDidMount() {
    const { needHelpContentId, fetchNeedHelpContent } = this.props;
    fetchNeedHelpContent(needHelpContentId);
  }

  closeModal = () => {};

  componentWillMount = () => {
    const { initialActions } = this.props;
    initialActions();
  };

  render() {
    const { labels, totalCount } = this.props;
    return <BagPage labels={labels} totalCount={totalCount} />;
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    initialActions: () => {
      dispatch(BAG_PAGE_ACTIONS.getCartData());
    },
    fetchNeedHelpContent: contentId => {
      dispatch(BAG_PAGE_ACTIONS.fetchModuleX(contentId));
    },
  };
};

const mapStateToProps = state => {
  return {
    labels: BagPageSelector.getBagPageLabels(state),
    totalCount: BagPageSelector.getTotalItems(state),
    productsTypes: BagPageSelector.getProductsTypes(state),
    needHelpContentId: BagPageSelector.getNeedHelpContentId(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BagPageContainer);
