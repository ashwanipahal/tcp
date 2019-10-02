import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../LoadedProductsCount.style';

class LoadedProductsCount extends React.PureComponent {
  render() {
    const { className, totalProductsCount, showingItemsLabel } = this.props;
    const showingXItems = showingItemsLabel.lbl_showing_x_items;
    const ItemLabel = showingItemsLabel.lbl_item;
    const ItemsLabel = showingItemsLabel.lbl_items;
    return (
      <BodyCopy
        className={`${className} count-section`}
        component="div"
        fontSize="fs14"
        fontFamily="secondary"
        fontWeight="semibold"
      >
        {totalProductsCount > 0 && (
          <span className="items-count-content">
            <span className="show-label">{showingXItems}</span>
            <span className="items-count-content-number">
              {totalProductsCount > 0 ? totalProductsCount : 0}
            </span>
            <span>{totalProductsCount > 1 ? ItemsLabel : ItemLabel}</span>
          </span>
        )}
      </BodyCopy>
    );
  }
}

LoadedProductsCount.propTypes = {
  className: PropTypes.string,
  totalProductsCount: PropTypes.number,
  showingItemsLabel: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

LoadedProductsCount.defaultProps = {
  className: '',
  totalProductsCount: 0,
  showingItemsLabel: {},
};

export default withStyles(errorBoundary(LoadedProductsCount), style);
export { LoadedProductsCount as LoadedProductsCountVanilla };
