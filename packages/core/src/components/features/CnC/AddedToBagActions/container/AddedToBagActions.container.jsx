import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddedToBagActionsView from '../views/AddedToBagActions';
import { getLabelsAddToActions } from '../../AddedToBag/container/AddedToBag.selectors';
import { routerPush } from '../../../../../utils';

export class AddedToBagContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.handleContinueShopping = this.handleContinueShopping.bind(this);
  }

  handleContinueShopping() {
    const { closeAddedToBag } = this.props;
    closeAddedToBag();
  }

  render() {
    const { labels, showAddTobag, inheritedStyles, navigation } = this.props;
    const onClickViewBag = () => {
      routerPush('/cart', '/bag');
    };
    return (
      <AddedToBagActionsView
        onClickViewBag={onClickViewBag}
        labels={labels}
        handleContinueShopping={this.handleContinueShopping}
        showAddTobag={showAddTobag}
        inheritedStyles={inheritedStyles}
        navigation={navigation}
      />
    );
  }
}

AddedToBagContainer.propTypes = {
  // loginInfo: PropTypes.shape.isRequired,
  labels: PropTypes.shape.isRequired,
};

const mapDispatchToProps = state => {
  return {
    labels: getLabelsAddToActions(state),
  };
};

export default connect(mapDispatchToProps)(AddedToBagContainer);
