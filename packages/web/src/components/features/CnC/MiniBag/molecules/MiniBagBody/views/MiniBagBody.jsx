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
import styles from '../styles/MiniBagBody.style';
import EmptyMiniBag from '../../EmptyMiniBag/views/EmptyMiniBag';

class MiniBagBody extends React.PureComponent {
  isEditing = false;

  handleItemEdit = value => {
    this.isEditing = value;
  };

  render() {
    const {
      labels,
      className,
      userName,
      cartItemCount,
      subTotal,
      currencySymbol,
      isCartItemsUpdating,
    } = this.props;
    const { isDeleting, isUpdating } = isCartItemsUpdating;
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
                  >
                    {`${labels.viewBag}(${cartItemCount})`}
                  </Anchor>
                  {/* <Anchor
                  fontSizeVariation="medium"
                  underline
                  anchorVariation="primary"
                  noLink
                  data-locator="addressbook-makedefault"
                >
                  {`${labels.viewSaveForLater}(${data.savedforLaterQty})`}
                </Anchor> */}
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
                  >
                    {`${labels.viewBag}(${cartItemCount})`}
                  </Anchor>
                </BodyCopy>
              )}
            </Col>
          </Row>
        </div>
        <BodyCopy component="div" className="viewBagAndProduct">
          {isDeleting || isUpdating ? (
            <Row className="mainWrapper">
              <Col className="deleteMsg" colSize={{ small: 6, medium: 8, large: 12 }}>
                <Image
                  alt="closeIcon"
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
                  {isDeleting ? labels.itemDeleted : null}
                  {isUpdating ? labels.itemUpdated : null}
                </BodyCopy>
              </Col>
            </Row>
          ) : null}
          {cartItemCount ? (
            <ProductTileWrapper onItemEdit={this.handleItemEdit} />
          ) : (
            <EmptyMiniBag labels={labels} userName={userName} />
          )}
        </BodyCopy>
        {cartItemCount ? (
          <div className="miniBagFooter">
            <BodyCopy tag="span" fontSize="fs14" fontWeight="semibold" className="subTotal">
              {`${labels.subTotal}: ${currencySymbol}${subTotal.toFixed(2) || 0}`}
            </BodyCopy>
            <AddedToBagActions showAddTobag={false} isEditingItem={this.isEditing} />
            <AirmilesBanner />
          </div>
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
};

export default withStyles(MiniBagBody, styles);
export { MiniBagBody as MiniBagBodyVanilla };
