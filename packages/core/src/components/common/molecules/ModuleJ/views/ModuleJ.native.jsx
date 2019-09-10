/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button } from '../../../atoms';
import {
  Container,
  PromoContainer,
  HeaderContainer,
  ImageContainer,
  ButtonContainer,
  MessageContainer,
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
        <MessageContainer layout="layout2">
          <HeaderContainer>
            <LinkText headerText={moduleJMock.moduleJ.composites.headerText} />
          </HeaderContainer>
          <PromoContainer>
            <PromoBanner promoBanner={moduleJMock.moduleJ.composites.promoBanner} />
          </PromoContainer>
        </MessageContainer>
        <ProductTabList
          onProductTabChange={this.onProductTabChange}
          categoryList={categoryListMock}
        />
        <ImageContainer layout="layout2">
          <Image
            url="https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME3_vmfhnu.jpg"
            height="300px"
            width="100%"
          />
        </ImageContainer>
        <ButtonContainer>
          <Button buttonVariation="variable-width" width="225px" text="SHOP ALL" />
        </ButtonContainer>
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
