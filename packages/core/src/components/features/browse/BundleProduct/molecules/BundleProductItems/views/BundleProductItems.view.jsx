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
  renderItem = () => {
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
    } = this.props;
    return (
      <div className="xxxx">
        <ul className="outfiting-list-container">
          {currentBundle &&
            currentBundle.map((product, index) => (
              <li key={product.generalProductId}>
                <OutfitProduct
                  plpLabels={plpLabels}
                  labels={labels}
                  outfitProduct={product.products}
                  productIndexText={`Product ${index + 1} of ${currentBundle.length}`}
                  handleAddToBag={() => {
                    handleAddToBag(addToBagEcom, product, product.generalProductId, currentState);
                  }}
                  className="outfiting-list-details"
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
      </div>
    );
  };

  render() {
    return <div className="container-xxxx">{this.renderItem()}</div>;
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
};

export default withStyles(BundleProductItems, styles);
