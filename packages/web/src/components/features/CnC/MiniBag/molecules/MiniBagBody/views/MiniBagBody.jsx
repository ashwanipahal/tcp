import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath } from '@tcp/core/src/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import ProductTileWrapper from '@tcp/core/src/components/features/CnC/CartItemTile/organisms/ProductTileWrapper/container/ProductTileWrapper.container';
import AirmilesBanner from '@tcp/core/src/components/features/CnC/common/organism/AirmilesBanner';
import AddedToBagActions from '@tcp/core/src/components/features/CnC/AddedToBagActions';
import { CHECKOUT_ROUTES } from '@tcp/core/src/components/features/CnC/Checkout/Checkout.constants';
import LoyaltyBanner from '@tcp/core/src/components/features/CnC/LoyaltyBanner';
import InformationHeader from '@tcp/core/src/components/features/CnC/common/molecules/InformationHeader';
import ErrorMessage from '../../../../../../../../../core/src/components/features/CnC/common/molecules/ErrorMessage';
import styles from '../styles/MiniBagBody.style';
import EmptyMiniBag from '../../EmptyMiniBag/views/EmptyMiniBag';

class MiniBagBody extends React.PureComponent {
  isEditing = false;

  constructor(props) {
    super(props);
    this.state = {
      headerError: false,
    };
  }

  componentWillUnmount() {
    const { resetSuccessMessage } = this.props;
    resetSuccessMessage(false);
  }

  setHeaderErrorState = (state, ...params) => {
    this.setState({ headerError: true, params });
  };

  handleItemEdit = value => {
    this.isEditing = value;
  };

  ViewSaveForLaterLink = (savedforLaterQty, isShowSaveForLaterSwitch) => {
    const { labels, closeMiniBag } = this.props;
    if (!isShowSaveForLaterSwitch || savedforLaterQty <= 0) {
      return null;
    }
    return (
      <Anchor
        fontSizeVariation="medium"
        underline
        anchorVariation="primary"
        asPath={CHECKOUT_ROUTES.bagPage.asPath}
        to={`${CHECKOUT_ROUTES.bagPage.to}?isSfl=true`}
        data-locator="cartitem-saveforlater"
        className="elem-ml-MED"
        onClick={() => closeMiniBag()}
      >
        {`${labels.viewSfl} (${savedforLaterQty})`}
      </Anchor>
    );
  };

  renderCartItemSflSuceessMessage = () => {
    const { isCartItemSFL, labels } = this.props;
    if (isCartItemSFL) {
      return (
        <Row className="mainWrapper">
          <Col className="deleteMsg" colSize={{ small: 6, medium: 8, large: 12 }}>
            <Image
              alt={labels.tickIcon}
              className="tick-icon-image"
              src={getIconPath('active_icon')}
              height={12}
              width={12}
            />
            <BodyCopy
              component="span"
              fontSize="fs12"
              textAlign="center"
              fontFamily="secondary"
              fontWeight="extrabold"
            >
              {labels.sflSuccess}
            </BodyCopy>
          </Col>
        </Row>
      );
    }
    return null;
  };

  renderGiftCardError = () => {
    const { cartItemSflError } = this.props;
    if (cartItemSflError) {
      return (
        <Row className="mainWrapper">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ErrorMessage className="error_box" error={cartItemSflError} />
          </Col>
        </Row>
      );
    }
    return null;
  };

  renderLoyaltyBanner = () => {
    return <LoyaltyBanner />;
  };

  getHeaderError = ({
    labels,
    orderItems,
    pageView,
    isUnavailable,
    isSoldOut,
    getUnavailableOOSItems,
    confirmRemoveCartItem,
    isBagPageSflSection,
    isCartItemSFL,
    isCartItemsUpdating,
    isSflItemRemoved,
  }) => {
    return (
      <InformationHeader
        labels={labels}
        orderItems={orderItems}
        pageView={pageView}
        isUnavailable={isUnavailable}
        isSoldOut={isSoldOut}
        getUnavailableOOSItems={getUnavailableOOSItems}
        confirmRemoveCartItem={confirmRemoveCartItem}
        isBagPageSflSection={isBagPageSflSection}
        isCartItemSFL={isCartItemSFL}
        isCartItemsUpdating={isCartItemsUpdating}
        isSflItemRemoved={isSflItemRemoved}
      />
    );
  };

  renderServerError = () => {
    const { addedToBagError } = this.props;
    if (!addedToBagError) {
      return null;
    }
    return (
      <Row className="mainWrapper">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <ErrorMessage error={addedToBagError} className="error_box minibag-error" />
        </Col>
      </Row>
    );
  };

  render() {
    const {
      labels,
      className,
      userName,
      cartItemCount,
      savedforLaterQty,
      subTotal,
      currencySymbol,
      closeMiniBag,
      onLinkClick,
      isShowSaveForLaterSwitch,
    } = this.props;
    const { headerError, params } = this.state;
    return (
      <div className={className}>
        <div className="minibag-viewbag">
          <Row className="mainWrapper">
            <Col className="subHeaderText" colSize={{ small: 6, medium: 8, large: 12 }}>
              {userName ? (
                <BodyCopy component="span" fontSize="fs12" textAlign="left">
                  <Anchor
                    fontSizeVariation="medium"
                    underline
                    anchorVariation="primary"
                    asPath={CHECKOUT_ROUTES.bagPage.asPath}
                    to={CHECKOUT_ROUTES.bagPage.to}
                    dataLocator="addressbook-makedefault"
                    onClick={() => closeMiniBag()}
                  >
                    {`${labels.viewBag} (${cartItemCount})`}
                  </Anchor>
                  {this.ViewSaveForLaterLink(savedforLaterQty, isShowSaveForLaterSwitch)}
                </BodyCopy>
              ) : (
                <BodyCopy component="span" fontSize="fs12" textAlign="left">
                  <Anchor
                    fontSizeVariation="medium"
                    underline
                    anchorVariation="primary"
                    asPath={CHECKOUT_ROUTES.bagPage.asPath}
                    to={CHECKOUT_ROUTES.bagPage.to}
                    data-locator="addressbook-makedefault"
                    onClick={() => closeMiniBag()}
                  >
                    {`${labels.viewBag} (${cartItemCount})`}
                  </Anchor>
                  {this.ViewSaveForLaterLink(savedforLaterQty, isShowSaveForLaterSwitch)}
                </BodyCopy>
              )}
            </Col>
            {headerError && this.getHeaderError(params[0])}
            {this.renderGiftCardError()}
          </Row>
        </div>
        {this.renderServerError()}
        <BodyCopy component="div" className="viewBagAndProduct">
          {cartItemCount ? (
            <ProductTileWrapper
              sflItemsCount={savedforLaterQty}
              onItemEdit={this.handleItemEdit}
              setHeaderErrorState={this.setHeaderErrorState}
            />
          ) : (
            <EmptyMiniBag
              labels={labels}
              userName={userName}
              closeMiniBag={closeMiniBag}
              onLinkClick={onLinkClick}
            />
          )}
        </BodyCopy>
        {cartItemCount ? (
          <React.Fragment>
            <div className="miniBagFooter">
              <BodyCopy tag="span" fontSize="fs14" fontWeight="semibold" className="subTotal">
                {`${labels.subTotal}: ${currencySymbol}${subTotal.toFixed(2) || 0}`}
              </BodyCopy>
              <AddedToBagActions
                containerId="paypal-button-container-minibag"
                showAddTobag={false}
                isEditingItem={this.isEditing}
                closeMiniBag={closeMiniBag}
                showVenmo={false} // No Venmo CTA on Minibag, as per venmo requirement
              />
              <AirmilesBanner />
            </div>
          </React.Fragment>
        ) : (
          <div className="miniBagFooter">
            <BodyCopy
              tag="span"
              fontSize="fs14"
              fontWeight="semibold"
              className="subTotalEmpty"
              fontFamily="secondary"
            >
              {`${labels.subTotal}: ${currencySymbol}0.00`}
            </BodyCopy>
          </div>
        )}
        {this.renderLoyaltyBanner()}
      </div>
    );
  }
}

MiniBagBody.propTypes = {
  className: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  isCartItemsUpdating: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  subTotal: PropTypes.number.isRequired,
  cartItemCount: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  savedforLaterQty: PropTypes.number.isRequired,
  isCartItemSFL: PropTypes.bool.isRequired,
  cartItemSflError: PropTypes.string.isRequired,
  closeMiniBag: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  resetSuccessMessage: PropTypes.func.isRequired,
  addedToBagError: PropTypes.string.isRequired,
  isShowSaveForLaterSwitch: PropTypes.bool.isRequired,
};

export default withStyles(MiniBagBody, styles);
export { MiniBagBody as MiniBagBodyVanilla };
