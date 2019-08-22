import React from 'react';
import PropTypes from 'prop-types';
import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.container';
import {
  getProductName,
  getProductDetails,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import ErrorMessage from '@tcp/core/src/components/features/CnC/common/molecules/ErrorMessage';
import EmptyBag from '@tcp/core/src/components/features/CnC/EmptyBagPage/views/EmptyBagPage.view';
import productTileCss, { customStyles } from '../styles/ProductTileWrapper.style';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';

class ProductTileWrapper extends React.PureComponent<props> {
  constructor(props) {
    super(props);
    this.state = {
      isEditAllowed: true,
    };
  }

  toggleEditAllowance = () => {
    const { isEditAllowed } = this.state;
    this.setState({
      isEditAllowed: !isEditAllowed,
    });
  };

  getRemoveString = labels => {
    const subHeading = `<span className="spanNoRush">${labels.removeSoldOut.replace(
      '#remove#',
      `<u><Anchor
      fontSizeVariation="medium"
      underline
      anchorVariation="primary"
      data-locator="addressbook-makedefault"
    >
    remove
    </Anchor></u>`
    )}</span>`;
    return (
      // eslint-disable-next-line react/no-danger
      <span dangerouslySetInnerHTML={{ __html: subHeading }} />
    );
  };

  render() {
    const { orderItems, bagLabels, labels, pageView, isUserLoggedIn, isPlcc } = this.props;
    let isAvailable;
    const { isEditAllowed } = this.state;
    if (orderItems && orderItems.size > 0) {
      const orderItemsView = orderItems.map(tile => {
        const productDetail = getProductDetails(tile);
        if (
          productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT ||
          productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_UNAVAILABLE
        ) {
          isAvailable = true;
        }
        return (
          <CartItemTile
            inheritedStyles={pageView === 'myBag' && productTileCss}
            labels={labels}
            productDetail={productDetail}
            key={`${getProductName(tile)}`}
            pageView={pageView}
            toggleEditAllowance={this.toggleEditAllowance}
            isEditAllowed={isEditAllowed}
            isPlcc={isPlcc}
          />
        );
      });
      return (
        <>
          {isAvailable && (
            <>
              <ErrorMessage customClass={customStyles} error={labels.problemWithOrder} />
              <BodyCopy
                className="removeItem"
                component="span"
                fontFamily="secondary"
                fontSize="fs12"
              >
                {this.getRemoveString(labels)}
              </BodyCopy>
            </>
          )}
          {orderItemsView}
        </>
      );
    }
    return <EmptyBag bagLabels={bagLabels} isUserLoggedIn={isUserLoggedIn} />;
  }
}

ProductTileWrapper.defaultProps = {
  pageView: '',
  bagLabels: {},
};

ProductTileWrapper.propTypes = {
  orderItems: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  isPlcc: PropTypes.bool.isRequired,
  pageView: PropTypes.string,
  bagLabels: PropTypes.shape(),
};

export default ProductTileWrapper;
export { ProductTileWrapper as ProductTileWrapperVanilla };
