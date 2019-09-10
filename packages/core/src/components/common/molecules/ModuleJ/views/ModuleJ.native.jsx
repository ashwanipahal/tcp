/* eslint-disable no-useless-constructor */
/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '../../../atoms';
import {
  Container,
  PromoContainer,
  HeaderContainer,
  ImageContainer,
  MessageContainer,
  Border,
  Wrapper,
  ProductTabListContainer,
} from '../styles/ModuleJ.style.native';

import ProductTabList from '../../../organisms/ProductTabList';
import categoryListMock from './categoryListMock';
import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';
import moduleJMock from '../mock';

class ModuleJ extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, layout } = this.props;

    return (
      <Container>
        <MessageContainer layout={layout}>
          <Wrapper>
            <Border layout={layout} />
            <HeaderContainer layout={layout}>
              <LinkText
                navigation={navigation}
                headerText={moduleJMock.moduleJ.composites.headerText}
                renderComponentInNewLine
                useStyle
              />
            </HeaderContainer>
          </Wrapper>

          <PromoContainer>
            <PromoBanner
              promoBanner={moduleJMock.moduleJ.composites.promoBanner}
              navigation={navigation}
            />
          </PromoContainer>
        </MessageContainer>
        <ProductTabListContainer>
          <ProductTabList
            onProductTabChange={this.onProductTabChange}
            categoryList={categoryListMock}
            navigation={navigation}
          />
        </ProductTabListContainer>
        <ImageContainer layout={layout}>
          <Image
            url="https://res.cloudinary.com/tcp-dam-test/image/upload/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME3_vmfhnu.jpg"
            height="300px"
            width="100%"
          />
        </ImageContainer>
      </Container>
    );
  }
}

ModuleJ.defaultProps = {
  productTabList: {},
  layout: 'default',
};

ModuleJ.propTypes = {
  productTabList: PropTypes.shape({}),
  layout: PropTypes.string,
};

export default ModuleJ;
export { ModuleJ as ModuleJVanilla };
