import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; // eslint-disable-line
import PropTypes from 'prop-types';
import QuickViewModal from '../views';
import { closeQuickViewModal } from './QuickViewModal.actions';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { getModalState, getProductInfo, getQuickViewLabels } from './QuickViewModal.selectors';
import {
  getPlpLabels,
  getCurrentCurrency,
} from '../../../../features/browse/ProductDetail/container/ProductDetail.selectors';

class QuickViewModalContainer extends React.PureComponent {
  render() {
    const { isModalOpen, closeQuickViewModalAction, productInfo, ...otherProps } = this.props;
    return (
      <React.Fragment>
        {productInfo ? (
          <QuickViewModal
            isModalOpen={isModalOpen}
            closeQuickViewModal={closeQuickViewModalAction}
            productInfo={productInfo}
            {...otherProps}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isModalOpen: getModalState(state),
    productInfo: getProductInfo(state),
    plpLabels: getPlpLabels(state),
    currency: getCurrentCurrency(state),
    quickViewLabels: getQuickViewLabels(state),
    ...ownProps,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeQuickViewModalAction: () => {
      dispatch(closeQuickViewModal({ isModalOpen: false }));
    },
  };
}

QuickViewModalContainer.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeQuickViewModalAction: PropTypes.func.isRequired,
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuickViewModalContainer)
);
