import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QuickViewModal from '../views';
import { closeQuickViewModal } from './QuickViewModal.actions';
import { getAddedToBagError } from '../../../../features/CnC/AddedToBag/container/AddedToBag.selectors';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import {
  getModalState,
  getProductInfo,
  getQuickViewLabels,
  getQuickViewFormValues,
} from './QuickViewModal.selectors';
import {
  getPlpLabels,
  getCurrentCurrency,
} from '../../../../features/browse/ProductDetail/container/ProductDetail.selectors';
import {
  addToCartEcom,
  clearAddToBagErrorState,
} from '../../../../features/CnC/AddedToBag/container/AddedToBag.actions';
import { getCartItemInfo } from '../../../../features/CnC/AddedToBag/util/utility';

class QuickViewModalContainer extends React.PureComponent {
  handleAddToBag = () => {
    const { addToBagEcom, formValues, productInfo, closeQuickViewModalAction } = this.props;
    let cartItemInfo = getCartItemInfo(productInfo, formValues);
    cartItemInfo = { ...cartItemInfo, callBack: closeQuickViewModalAction };
    addToBagEcom(cartItemInfo);
  };

  render() {
    const { isModalOpen, closeQuickViewModalAction, productInfo, ...otherProps } = this.props;
    return (
      <React.Fragment>
        {productInfo ? (
          <QuickViewModal
            isModalOpen={isModalOpen}
            closeQuickViewModal={closeQuickViewModalAction}
            productInfo={productInfo}
            handleAddToBag={this.handleAddToBag}
            {...otherProps}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModalOpen: getModalState(state),
    productInfo: getProductInfo(state),
    plpLabels: getPlpLabels(state),
    currency: getCurrentCurrency(state),
    quickViewLabels: getQuickViewLabels(state),
    formValues: getQuickViewFormValues(state),
    addToBagError: getAddedToBagError(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeQuickViewModalAction: () => {
      dispatch(closeQuickViewModal({ isModalOpen: false }));
    },
    addToBagEcom: payload => {
      dispatch(addToCartEcom(payload));
    },
    clearAddToBagError: () => {
      dispatch(clearAddToBagErrorState());
    },
  };
}

QuickViewModalContainer.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  formValues: PropTypes.shape({}).isRequired,
  closeQuickViewModalAction: PropTypes.func.isRequired,
  addToBagEcom: PropTypes.func.isRequired,
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickViewModalContainer);
