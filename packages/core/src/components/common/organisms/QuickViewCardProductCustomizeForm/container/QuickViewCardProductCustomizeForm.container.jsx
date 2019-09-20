import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; // eslint-disable-line
import PropTypes from 'prop-types';
import QuickViewCardProductCustomizeForm from '../views';
import { closeQuickViewModal } from './QuickViewCardProductCustomizeForm.actions';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { getModalState, getProductInfo } from './QuickViewCardProductCustomizeForm.selectors';
import {
  getPlpLabels,
  getCurrentCurrency,
} from '../../../../features/browse/ProductDetail/container/ProductDetail.selectors';

class QuickViewCardProductCustomizeFormContainer extends React.PureComponent {
  render() {
    const { isModalOpen, closeQuickViewModalAction, productInfo, ...otherProps } = this.props;
    return (
      <React.Fragment>
        {productInfo ? (
          <QuickViewCardProductCustomizeForm
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

function mapStateToProps(state) {
  return {
    isModalOpen: getModalState(state),
    productInfo: getProductInfo(state),
    plpLabels: getPlpLabels(state),
    currency: getCurrentCurrency(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeQuickViewModalAction: payload => {
      dispatch(closeQuickViewModal(payload));
    },
  };
}

QuickViewCardProductCustomizeFormContainer.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeQuickViewModalAction: PropTypes.func.isRequired,
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuickViewCardProductCustomizeFormContainer)
);
