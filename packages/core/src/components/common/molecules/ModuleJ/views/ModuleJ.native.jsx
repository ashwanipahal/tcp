/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button } from '../../../atoms';
import {
  Container,
  PromoContainer,
  HeaderContainer,
  ImageContainer,
} from '../styles/ModuleJ.style.native';

import ProductTabList from '../../../organisms/ProductTabList';
import categoryListMock from './categoryListMock';
import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';
import moduleJMock from '../mock';

class ModuleJ extends React.PureComponent {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <LinkText headerText={moduleJMock.moduleJ.composites.headerText} />
        </HeaderContainer>
        <PromoContainer>
          <PromoBanner promoBanner={moduleJMock.moduleJ.composites.promoBanner} />
        </PromoContainer>
        <ProductTabList
          onProductTabChange={this.onProductTabChange}
          categoryList={categoryListMock}
        />
        <ImageContainer>
          <Image
            url="https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME3_vmfhnu.jpg"
            height="300px"
            width="100%"
          />
        </ImageContainer>

        <Button text="SHOP ALL" />
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
