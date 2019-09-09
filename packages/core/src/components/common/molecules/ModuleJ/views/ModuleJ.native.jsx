/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import { Container, PromoContainer } from '../styles/ModuleJ.style.native';

import ProductTabList from '../../../organisms/ProductTabList';
import categoryListMock from './categoryListMock';
import PromoBanner from '../../PromoBanner';
import moduleJMock from '../mock';

class ModuleJ extends React.PureComponent {
  render() {
    return (
      <Container>
        <PromoContainer>
          <PromoBanner promoBanner={moduleJMock.moduleJ.composites.promoBanner} />
        </PromoContainer>
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
