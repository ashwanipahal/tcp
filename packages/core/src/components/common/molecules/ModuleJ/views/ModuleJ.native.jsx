/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from '../styles/ModuleJ.style.native';

import ProductTabList from '../../../organisms/ProductTabList';
import categoryListMock from './categoryListMock';

class ModuleJ extends React.PureComponent {
  render() {
    return (
      <Container>
        <ProductTabList
          onProductTabChange={this.onProductTabChange}
          categoryList={categoryListMock}
        />
      </Container>
    );
  }
}

ModuleJ.defaultProps = {
  productTabList: {},
};

ModuleJ.propTypes = {
  productTabList: PropTypes.shape({}),
};

export default ModuleJ;
export { ModuleJ as ModuleJVanilla };
