import React from 'react';
import PropTypes from 'prop-types';
import OutfitProduct from '@tcp/core/src/components/features/browse/OutfitDetails/molecules/OutfitProduct/OutfitProduct';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/BundleProductItems.style';

class BundleProductItems extends React.PureComponent {
  /**
   * @function renderItem populates the L1 menu item from the data passed to it
   * @param {object} item Details of the L1 menu item passed from the loop
   */
  renderItems = () => {
    const {
      currentBundle,
      plpLabels,
      addToBagEcom,
      addToFavorites,
      currentState,
      addToBagError,
      addToBagErrorId,
      handleAddToBag,
      isLoggedIn,
      currencySymbol,
      currencyExchange,
      className,
      outfitLabels,
    } = this.props;
    return (
      <ul className="outfiting-list-container">
        {currentBundle &&
          currentBundle.map(product => {
            const productItem = product && product.products;
            return (
              <li key={product.generalProductId} className="bundle-product-item">
                <OutfitProduct
                  plpLabels={plpLabels}
                  labels={outfitLabels}
                  outfitProduct={productItem}
                  productIndexText=""
                  handleAddToBag={() => {
                    handleAddToBag(
                      addToBagEcom,
                      productItem,
                      productItem.generalProductId,
                      currentState
                    );
                  }}
                  className={`${className} outfiting-list-details`}
                  addToBagError={addToBagErrorId === productItem.generalProductId && addToBagError}
                  isLoggedIn={isLoggedIn}
                  addToFavorites={() => {
                    addToFavorites({ colorProductId: productItem.generalProductId });
                  }}
                  currencySymbol={currencySymbol}
                  currencyExchange={currencyExchange}
                  isBundleProduct
                />
              </li>
            );
          })}
      </ul>
    );
  };

  render() {
    return <div className="bundle-productsList-container">{this.renderItems()}</div>;
  }
}

BundleProductItems.propTypes = {
  currentBundle: PropTypes.shape({}),
  plpLabels: PropTypes.shape({}),
  outfitLabels: PropTypes.shape({}),
  addToBagEcom: PropTypes.func.isRequired,
  handleAddToBag: PropTypes.func.isRequired,
  currentState: PropTypes.shape({}).isRequired,
  addToBagError: PropTypes.string,
  addToBagErrorId: PropTypes.string,
  addToFavorites: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  currencyExchange: PropTypes.string,
  currencySymbol: PropTypes.string,
  pdpLabels: PropTypes.shape({}),
  className: PropTypes.string,
};

BundleProductItems.defaultProps = {
  currentBundle: null,
  plpLabels: {},
  outfitLabels: {},
  addToBagError: '',
  addToBagErrorId: '',
  isLoggedIn: false,
  currencyExchange: 1,
  currencySymbol: 'USD',
  pdpLabels: {},
  className: '',
};

export default withStyles(BundleProductItems, styles);
