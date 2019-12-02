import React from 'react';
import PropTypes from 'prop-types';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import Recommendations from '@tcp/web/src/components/common/molecules/Recommendations';
import SpinnerOverlay from '@tcp/core/src/components/common/atoms/SpinnerOverlay';
import AddedToBagActions from '../../AddedToBagActions';
import AddedToBagViewPoints from '../../AddedToBagViewPoints';
import Modal from '../../../../common/molecules/Modal';
import withStyles from '../../../../common/hoc/withStyles';
import styles, {
  modalStyles,
  productInfoStyles,
  pointsInfoStyles,
  buttonActionStyles,
  LoyaltyWrapperStyles,
  recommendationStyles,
  customStyles,
} from '../styles/AddedToBag.style';
import ProductInformationView from '../molecules/ProductInformation/views/ProductInformation.views';
import BossBannerView from '../molecules/BossBanner/views/BossBanner.views';
import Anchor from '../../../../common/atoms/Anchor';
import LoyaltyBanner from '../../LoyaltyBanner';
import config from './config';

class AddedToBag extends React.PureComponent {
  /* eslint-disable-next-line */
  UNSAFE_componentWillReceiveProps({ router: nextRouter }) {
    const { router, closeModal } = this.props;
    /* istanbul ignore else */
    if (router.asPath !== nextRouter.asPath) {
      closeModal();
    }
  }

  renderProductInfo() {
    const { addedToBagData, labels, quantity, pointsSummary } = this.props;
    if (Array.isArray(addedToBagData)) {
      return addedToBagData.map(item => {
        return (
          <div className="elem-mb-SM">
            <ProductInformationView
              data={item}
              labels={labels}
              inheritedStyles={productInfoStyles}
            />
          </div>
        );
      });
    }
    return (
      <ProductInformationView
        data={{ ...addedToBagData, ...pointsSummary }}
        labels={labels}
        quantity={quantity}
        inheritedStyles={productInfoStyles}
      />
    );
  }

  render() {
    const {
      openState,
      onRequestClose,
      className,
      labels,
      handleContinueShopping,
      handleCartCheckout,
      isInternationalShipping,
      hideHeader,
      addedToBagLoaderState,
    } = this.props;
    return (
      <Modal
        fixedWidth
        isOpen={openState}
        onRequestClose={onRequestClose}
        heading="ADDED TO BAG"
        overlayClassName="TCPModal__Overlay"
        className={`TCPModal__Content, ${className}`}
        closeIconDataLocator="added-to-bg-close"
        aria={{
          labelledby: 'Added To Bag',
          describedby: 'Added To Bag Modal',
        }}
        data-locator="addedToBag-modal"
        inheritedStyles={modalStyles}
        innerContentClassName="atb-innerContent"
      >
        {addedToBagLoaderState && <SpinnerOverlay inheritedStyles={customStyles} />}
        <div className="addedToBagWrapper">
          {this.renderProductInfo()}
          <AddedToBagViewPoints
            labels={labels}
            className="added-to-bag-points"
            inheritedStyles={pointsInfoStyles}
          />
          <AddedToBagActions
            labels={labels}
            onRequestClose={onRequestClose}
            handleCartCheckout={handleCartCheckout}
            showVenmo={false}
            containerId="paypal-button-container-added-to-bag"
            inheritedStyles={buttonActionStyles}
            hideHeader={hideHeader}
            isAddedToBag
          />
          <div className="loyaltyAddedToBagWrapper">
            <LoyaltyBanner pageCategory="isAddedToBagPage" inheritedStyles={LoyaltyWrapperStyles} />
          </div>
          {!isInternationalShipping && <BossBannerView labels={labels} />}
          <div className="recommendationWrapper">
            <Recommendations
              page={Constants.RECOMMENDATIONS_PAGES_MAPPING.BAG}
              variations="moduleO"
              priceOnly
              inheritedStyles={recommendationStyles}
              carouselConfigProps={config.CAROUSEL_OPTIONS}
            />
          </div>
          <div className="continue-shopping">
            <Anchor
              fontSizeVariation="medium"
              underline
              anchorVariation="primary"
              handleLinkClick={handleContinueShopping}
              noLink
              to=""
              dataLocator="addedToBag-continueShopping"
            >
              {labels.continueShopping}
            </Anchor>
          </div>
        </div>
      </Modal>
    );
  }
}

AddedToBag.propTypes = {
  openState: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  addedToBagData: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  quantity: PropTypes.number.isRequired,
  handleContinueShopping: PropTypes.func.isRequired,
  isInternationalShipping: PropTypes.bool.isRequired,
  hideHeader: PropTypes.bool.isRequired,
  handleCartCheckout: PropTypes.func.isRequired,
  addedToBagLoaderState: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  pointsSummary: PropTypes.shape({}).isRequired,
};

export default withStyles(AddedToBag, styles);
export { AddedToBag as AddedToBagVanilla };
