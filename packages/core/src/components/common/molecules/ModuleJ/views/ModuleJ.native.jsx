/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from '../ModuleJ.style.native';

import ProductListTabs from '../../../organisms/ProductListTabs';
import categoryListMock from './categoryListMock';

class ModuleJ extends React.PureComponent {
  render() {
    return (
      <Container>
        <ProductListTabs
          onProductTabChange={this.onProductTabChange}
          categoryList={categoryListMock}
        />
      </Container>
    );
  }
}

ModuleJ.defaultProps = {
  productListTabs: {},
};

ModuleJ.propTypes = {
  productListTabs: PropTypes.shape({}),
};

export default ModuleJ;
export { ModuleJ as ModuleJVanilla };
