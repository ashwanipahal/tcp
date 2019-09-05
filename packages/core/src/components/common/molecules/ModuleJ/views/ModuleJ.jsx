/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import errorBoundary from '../../../hoc/withErrorBoundary';
import withStyles from '../../../hoc/withStyles';
import ProductTabList from '../../../organisms/ProductTabList';
import categoryListMock from './categoryListMock';
import moduleJStyle from '../ModuleJ.style';

class ModuleJ extends React.PureComponent {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <ProductTabList
          onProductTabChange={this.onProductTabChange}
          categoryList={categoryListMock}
        />
      </div>
    );
  }
}

ModuleJ.defaultProps = {
  className: '',
  productTabList: {},
};

ModuleJ.propTypes = {
  className: PropTypes.string,
  productTabList: PropTypes.shape({}),
};

export default withStyles(errorBoundary(ModuleJ), moduleJStyle);
export { ModuleJ as ModuleJVanilla };
