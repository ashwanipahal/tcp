/* eslint-disable no-useless-constructor */
/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Anchor } from '../../../atoms';
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

class ModuleJ extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, layout, mediaLinkedList, headerText, promoBanner } = this.props;

    return (
      <Container>
        <MessageContainer layout={layout}>
          <Wrapper>
            <Border layout={layout} />
            <HeaderContainer layout={layout}>
              <LinkText
                navigation={navigation}
                headerText={headerText}
                renderComponentInNewLine
                useStyle
              />
            </HeaderContainer>
          </Wrapper>

          <PromoContainer>
            <PromoBanner promoBanner={promoBanner} navigation={navigation} />
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
          <Anchor navigation={navigation} url={mediaLinkedList[1].link.url}>
            <Image url={mediaLinkedList[1].image.url} height="300px" width="100%" />
          </Anchor>
        </ImageContainer>
      </Container>
    );
  }
}

ModuleJ.defaultProps = {
  productTabList: {},
  layout: 'default',
  mediaLinkedList: [],
};

ModuleJ.propTypes = {
  productTabList: PropTypes.shape({}),
  layout: PropTypes.string,
  mediaLinkedList: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      link: PropTypes.object,
    })
  ),
};

export default ModuleJ;
export { ModuleJ as ModuleJVanilla };
