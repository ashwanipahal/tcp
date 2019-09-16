import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../LoadedProductsCount.style';

class LoadedProductsCount extends React.PureComponent {
  render() {
    const { className, totalProductsCount } = this.props;

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
            Showing
            <span className="items-count-content-number">
              {totalProductsCount > 0 ? totalProductsCount : 0}
            </span>
            {totalProductsCount > 1 ? 'Items' : 'Item'}
          </span>
        )}
      </BodyCopy>
    );
  }
}

LoadedProductsCount.propTypes = {
  className: PropTypes.string,
  totalProductsCount: PropTypes.number,
};

LoadedProductsCount.defaultProps = {
  className: '',
  totalProductsCount: 0,
};

export default withStyles(errorBoundary(LoadedProductsCount), style);
export { LoadedProductsCount as LoadedProductsCountVanilla };
