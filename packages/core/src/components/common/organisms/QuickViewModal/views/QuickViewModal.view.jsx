import React from 'react';
import PropTypes from 'prop-types';
import { getMapSliceForColorProductId } from '@tcp/core/src/components/features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import ProductPickupContainer from '../../ProductPickup';
import withStyles from '../../../hoc/withStyles';
import styles, {
  customHeaderStyle,
  quickViewColorSwatchesCss,
  customSpinnerStyle,
} from '../styles/QuickViewModal.style';
import { getLocator } from '../../../../../utils';
import Modal from '../../../molecules/Modal';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import ProductCustomizeFormPart from '../molecules/ProductCustomizeFormPart';
import QuickViewAddToBagButton from '../atoms/QuickViewAddToBagButton';
import { getCartItemInfo } from '../../../../features/CnC/AddedToBag/util/utility';
import QuickViewSkeleton from '../molecules/QuickViewSkeleton';

class QuickViewModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleMultipleItemsAddToBagClick = this.handleMultipleItemsAddToBagClick.bind(this);
    this.state = {
      showAddProductValidation: false,
    };
  }

  changeQuickViewState = state => {
    // const {showAddProductValidation} = this.state
    this.setState({ showAddProductValidation: state });
  };

  onCloseClick = () => {
    const { closeQuickViewModal, clearAddToBagError, clearMultipleItemsAddToBagError } = this.props;
    closeQuickViewModal();
    clearAddToBagError();
    clearMultipleItemsAddToBagError();
  };

  getHeadingText = () => {
    const { quickViewLabels, fromBagPage, isLoading, isFavoriteEdit } = this.props;
    if (isLoading) {
      return ' ';
    }
    const { editItem, addToBag, editProduct } = quickViewLabels;
    let headerText = addToBag;
    if (fromBagPage) {
      headerText = editItem;
    } else if (isFavoriteEdit) {
      headerText = editProduct;
    }
    return headerText;
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
      this.setState({ showAddProductValidation: !addProductToBag });
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
      quickViewLabels,
    } = this.props;
    const { showAddProductValidation } = this.state;
    return (
      <QuickViewAddToBagButton
        dataLocator="MULTI_QV_ATB"
        onClickActn={this.handleMultipleItemsAddToBagClick}
        buttonLabel={addToBag}
        quickViewLabels={quickViewLabels}
        showAddProductValidation={showAddProductValidation}
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
      currencyAttributes,
      toastMessage,
      ...otherProps
    } = this.props;
    this.skuFormRefs = [];
    return (
      productInfo &&
      productInfo.map(({ product }) => {
        const { colorFitsSizesMap, colorFitSizeDisplayNames, alternateSizes, isGiftCard } = product;
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
            currencyAttributes={currencyAttributes}
            plpLabels={plpLabels}
            colorFitSizeDisplayNames={colorFitSizeDisplayNames}
            quickViewLabels={quickViewLabels}
            onCloseClick={this.onCloseClick}
            isMultiItemQVModal={isMultiItemQVModal}
            formRef={formRef}
            quickViewColorSwatchesCss={quickViewColorSwatchesCss}
            toastMessage={toastMessage}
            changeQuickViewState={this.changeQuickViewState}
            isQuickView
            marginTopNone
            alternateSizes={alternateSizes}
            isGiftCard={isGiftCard}
            {...otherProps}
          />
        );
      })
    );
  }

  renderFulFilmentSection = (
    isMultiItemQVModal,
    fromBagPage,
    product,
    currentColorEntry,
    isFavoriteEdit
  ) => {
    return (
      !isMultiItemQVModal &&
      !fromBagPage &&
      !isFavoriteEdit &&
      product &&
      currentColorEntry && (
        <ProductPickupContainer
          productInfo={product}
          formName={`ProductAddToBag-${product.generalProductId}`}
          miscInfo={currentColorEntry.miscInfo}
          onPickupClickAddon={this.onCloseClick}
        />
      )
    );
  };

  render() {
    const {
      isModalOpen,
      productInfo,
      isMultiItemQVModal,
      fromBagPage,
      isLoading,
      isFavoriteEdit,
    } = this.props;
    const product = productInfo && productInfo.length && productInfo[0].product;
    const currentColorEntry =
      product && getMapSliceForColorProductId(product.colorFitsSizesMap, product.generalProductId);
    return (
      <React.Fragment>
        {isModalOpen ? (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={this.onCloseClick}
            overlayClassName="TCPModal__Overlay"
            className="TCPModal__Content"
            dataLocator={getLocator('quick_view_modal')}
            dataLocatorHeader={getLocator('quick_view_add_to_bag_header')}
            closeIconDataLocator={getLocator('quick_view_icon_btn')}
            heading={this.getHeadingText()}
            widthConfig={{ small: '375px', medium: '600px', large: '704px' }}
            standardHeight
            fixedWidth
            inheritedStyles={customHeaderStyle}
            headingAlign="center"
            horizontalBar={false}
            stickyCloseIcon
            fullWidth
            stickyHeader
            rightAlignCrossIcon
            headingFontWeight="bold"
            fontSize="fs22"
          >
            {isLoading ? (
              <QuickViewSkeleton inheritedStyles={customSpinnerStyle} />
            ) : (
              <React.Fragment>
                {this.renderProductCustomizeFormPart()}
                {this.renderFulFilmentSection(
                  isMultiItemQVModal,
                  fromBagPage,
                  product,
                  currentColorEntry,
                  isFavoriteEdit
                )}

                {isMultiItemQVModal && this.renderAddToBagButton()}
              </React.Fragment>
            )}
          </Modal>
        ) : null}
      </React.Fragment>
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
  currencyAttributes: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  toastMessage: PropTypes.func,
  isFavoriteEdit: PropTypes.bool.isRequired,
};

QuickViewModal.defaultProps = {
  toastMessage: () => {},
};
export default withStyles(QuickViewModal, styles);
export { QuickViewModal as QuickViewModalVanilla };
