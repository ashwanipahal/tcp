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
      labels,
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
    } = this.props;
    return (
      <ul className="outfiting-list-container">
        {currentBundle &&
          currentBundle.map(product => (
            <li key={product.generalProductId} className="bundle-product-item">
              <OutfitProduct
                plpLabels={plpLabels}
                labels={labels}
                outfitProduct={product.products}
                productIndexText=""
                handleAddToBag={() => {
                  handleAddToBag(addToBagEcom, product, product.generalProductId, currentState);
                }}
                className={`${className} outfiting-list-details`}
                addToBagError={addToBagErrorId === product.generalProductId && addToBagError}
                isLoggedIn={isLoggedIn}
                addToFavorites={addToFavorites}
                currencySymbol={currencySymbol}
                currencyExchange={currencyExchange}
                isBundleProduct
              />
            </li>
          ))}
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
  addToBagEcom: PropTypes.func.isRequired,
  handleAddToBag: PropTypes.func.isRequired,
  currentState: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}),
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
  labels: {},
  addToBagError: '',
  addToBagErrorId: '',
  isLoggedIn: false,
  currencyExchange: 1,
  currencySymbol: 'USD',
  pdpLabels: {},
  className: '',
};

export default withStyles(BundleProductItems, styles);
