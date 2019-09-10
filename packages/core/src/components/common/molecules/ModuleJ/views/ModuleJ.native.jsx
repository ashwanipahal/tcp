/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import { Button, Anchor, Image } from '../../../atoms';
import { getLocator } from '../../../../../utils';

import {
  Container,
  ImageItemWrapper,
  ImageItemContainer,
  ButtonContainer,
} from '../styles/ModuleJ.style.native';

import ProductTabList from '../../../organisms/ProductTabList';
import categoryListMock from './categoryListMock';

class ModuleJ extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategoryId: null,
    };
  }

  onProductTabChange = catId => {
    this.setState({
      selectedCategoryId: catId,
    });
  };

  renderProductFlatListItem = ({ item, index }) => {
    const { navigation, productTabList } = this.props;
    const { selectedCategoryId } = this.state;
    const selectedProductList = productTabList[selectedCategoryId];

    const {
      seo_token: seoToken,
      uniqueId,
      imageUrl: [imageUrl],
    } = item;

    console.info(imageUrl, '---');
    const pdpUrl = `/p/${seoToken || uniqueId}`;
    return (
      <ImageItemWrapper isFullMargin={index === selectedProductList.length - 1}>
        <Anchor
          url={pdpUrl}
          navigation={navigation}
          locator={`${getLocator('moduleJ_product_image')}${index}`}
        >
          <Image url={imageUrl} height={110} width={89} style={{}} />
        </Anchor>
      </ImageItemWrapper>
    );
  };

  render() {
    const { selectedCategoryId } = this.state;
    const { productTabList } = this.props;
    const selectedProductList = productTabList[selectedCategoryId];
    const { navigation } = this.props;

    return (
      <Container>
        <ProductTabList
          onProductTabChange={this.onProductTabChange}
          categoryList={categoryListMock}
        />
        <ImageItemContainer>
          <FlatList
            data={selectedProductList}
            renderItem={this.renderProductFlatListItem}
            horizontal
          />
        </ImageItemContainer>
        <ButtonContainer>
          <Button
            buttonVariation="variable-width"
            width="225px"
            text="SHOP ALL"
            navigation={navigation}
          />
        </ButtonContainer>
      </Container>
    );
  }
}

ModuleJ.defaultProps = {
  productTabList: {},
  navigation: null,
};

ModuleJ.propTypes = {
  productTabList: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      uniqueId: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      seo_token: PropTypes.string,
    }),
  }),
  navigation: PropTypes.shape({}),
};

export default ModuleJ;
export { ModuleJ as ModuleJVanilla };
