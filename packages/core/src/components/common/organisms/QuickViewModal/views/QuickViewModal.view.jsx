import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import styles, {
  customHeaderStyle,
  quickViewColorSwatchesCss,
} from '../styles/QuickViewModal.style';
import FulfillmentSection from '../../FulfillmentSection';
import { getLocator, enableBodyScroll, isMobileApp } from '../../../../../utils';
import Modal from '../../../molecules/Modal';
import { Spinner } from '../../../atoms';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import ProductCustomizeFormPart from '../molecules/ProductCustomizeFormPart';
import QuickViewAddToBagButton from '../atoms/QuickViewAddToBagButton';
import { getCartItemInfo } from '../../../../features/CnC/AddedToBag/util/utility';

class QuickViewModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleMultipleItemsAddToBagClick = this.handleMultipleItemsAddToBagClick.bind(this);
  }

  onCloseClick = () => {
    if (!isMobileApp()) {
      enableBodyScroll();
    }
    const { closeQuickViewModal, clearAddToBagError, clearMultipleItemsAddToBagError } = this.props;
    closeQuickViewModal();
    clearAddToBagError();
    clearMultipleItemsAddToBagError();
  };

  handleMultipleItemsAddToBagClick(e) {
    e.preventDefault();
    const productItemsInfo = [];
    const { addMultipleItemsToBagEcom, formValues, productInfo, closeQuickViewModal } = this.props;
    const hasNoError = this.skuFormRefs.every((formRef, index) => {
      const {
        current: {
          props: { fitChanged, formEnabled, displayErrorMessage },
        },
      } = formRef;
      const addProductToBag = formEnabled; // Add product only when the form is enabled
      const displayError = formEnabled && fitChanged; // Validate error only when the form is enabled and fit has changed
      if (displayError) {
        displayErrorMessage(fitChanged);
        return !displayError;
      }
      if (addProductToBag) {
        const { product } = productInfo[index];
        const formValue = formValues[index];
        const cartItem = getCartItemInfo(product, formValue);
        productItemsInfo.push(cartItem);
      }
      return !displayError;
    });
    if (hasNoError && productItemsInfo.length) {
      const cartItemInfo = { productItemsInfo, callBack: closeQuickViewModal };
      addMultipleItemsToBagEcom(cartItemInfo);
    }
  }

  /**
   * @function renderAddToBagButton
   * @returns Add To Bag Butyon
   *
   * @memberof ProductAddToBag
   */
  renderAddToBagButton = () => {
    const {
      plpLabels: { addToBag },
    } = this.props;
    return (
      <QuickViewAddToBagButton
        onClickActn={this.handleMultipleItemsAddToBagClick}
        buttonLabel={addToBag}
      />
    );
  };

  renderProductCustomizeFormPart() {
    const {
      productInfo,
      isMultiItemQVModal,
      quickViewLabels,
      selectedColorProductId,
      plpLabels,
      addToBagError,
      addToBagMultipleItemError,
      currencyExchange,
      ...otherProps
    } = this.props;
    this.skuFormRefs = [];
    return (
      productInfo &&
      productInfo.map(({ product }) => {
        const { colorFitsSizesMap, colorFitSizeDisplayNames } = product;
        const formRef = React.createRef();
        this.skuFormRefs.push(formRef);
        const modifiedColorFitsSizesMap = selectedColorProductId
          ? colorFitsSizesMap.filter(item => item.colorDisplayId === selectedColorProductId)
          : colorFitsSizesMap;
        const { errorProductId, errMsg } = addToBagMultipleItemError;
        const errorMessage = !isMultiItemQVModal
          ? addToBagError
          : (product.generalProductId === errorProductId && errMsg) || null;
        return (
          <ProductCustomizeFormPart
            productInfo={product}
            addToBagError={errorMessage}
            colorFitsSizesMap={
              modifiedColorFitsSizesMap.length ? modifiedColorFitsSizesMap : colorFitsSizesMap
            }
            currencyExchange={currencyExchange}
            plpLabels={plpLabels}
            colorFitSizeDisplayNames={colorFitSizeDisplayNames}
            quickViewLabels={quickViewLabels}
            onCloseClick={this.onCloseClick}
            isMultiItemQVModal={isMultiItemQVModal}
            formRef={formRef}
            quickViewColorSwatchesCss={quickViewColorSwatchesCss}
            {...otherProps}
          />
        );
      })
    );
  }

  render() {
    const {
      isModalOpen,
      productInfo,
      isMultiItemQVModal,
      quickViewLabels,
      fromBagPage,
      isLoading,
    } = this.props;

    const product = productInfo && productInfo.length && productInfo[0].product;
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={this.onCloseClick}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        dataLocator={getLocator('quick_view_modal')}
        dataLocatorHeader={getLocator('quick_view_add_to_bag_header')}
        closeIconDataLocator={getLocator('quick_view_icon_btn')}
        heading={fromBagPage ? quickViewLabels.editItem : quickViewLabels.addToBag}
        widthConfig={{ small: '375px', medium: '600px', large: '704px' }}
        heightConfig={{ height: '95%' }}
        fixedWidth
        inheritedStyles={customHeaderStyle}
        headingAlign="center"
        horizontalBar={false}
        stickyCloseIcon
        fullWidth
        stickyHeader
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {this.renderProductCustomizeFormPart()}
            {!isMultiItemQVModal && !fromBagPage && (
              <FulfillmentSection
                btnClassName="added-to-bag"
                dataLocator={getLocator('global_addtocart_Button')}
                buttonLabel="Pickup In Store"
                currentProduct={product}
                closeQuickViewClick={this.onCloseClick}
              />
            )}
            {isMultiItemQVModal && this.renderAddToBagButton()}
          </React.Fragment>
        )}
      </Modal>
    );
  }
}

QuickViewModal.propTypes = {
  plpLabels: PropTypes.shape({}).isRequired,
  addToBagMultipleItemError: PropTypes.shape({}).isRequired,
  quickViewLabels: PropTypes.shape({
    addToBag: PropTypes.string,
    viewProductDetails: PropTypes.string,
  }).isRequired,
  closeQuickViewModal: PropTypes.func.isRequired,
  addMultipleItemsToBagEcom: PropTypes.func.isRequired,
  clearAddToBagError: PropTypes.func.isRequired,
  formValues: PropTypes.shape([]).isRequired,
  clearMultipleItemsAddToBagError: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  isMultiItemQVModal: PropTypes.bool.isRequired,
  addToBagError: PropTypes.string.isRequired,
  fromBagPage: PropTypes.bool.isRequired,
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
  selectedColorProductId: PropTypes.string.isRequired,
  currencyExchange: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

QuickViewModal.defaultProps = {
  currencyExchange: 1,
};
export default withStyles(QuickViewModal, styles);
export { QuickViewModal as QuickViewModalVanilla };
