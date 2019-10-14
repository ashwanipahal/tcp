import React from 'react';
import { View, Image, FlatList } from 'react-native';
import { PropTypes } from 'prop-types';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import {
  StyleProductDescription,
  StyleLongDescription,
  ImageStyleWrapper,
  ItemStyleWrapper,
} from '../ProductDescription.native.style';

const downIcon = require('../../../../../../../assets/carrot-small-down.png');
const upIcon = require('../../../../../../../assets/carrot-small-up.png');

// Key extractor for flat list
const keyExtractor = (_, index) => index.toString();

const renderItem = item => {
  return item ? (
    <StyleLongDescription>
      <BodyCopyWithSpacing text={`\u2022`} spacingStyles="padding-right-XXS" />
      <BodyCopyWithSpacing
        fontFamily="secondary"
        fontWeight="regular"
        fontSize="fs14"
        text={item}
        spacingStyles="padding-bottom-XXS"
      />
    </StyleLongDescription>
  ) : null;
};

class ProductDetailDescription extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAccordionOpen: false,
    };
  }

  handleAccordionToggle = () => {
    const { isAccordionOpen } = this.state;
    this.setState({ isAccordionOpen: !isAccordionOpen });
  };

  renderLongDescription = longDescription => {
    const longDescriptionText = longDescription.replace(/<\/li>/g, '');
    return longDescriptionText.split('<li>');
  };

  render() {
    const { longDescription, shortDescription, pdpLabels, itemPartNumber } = this.props;
    const { ProductDescription, ClaimMessage, PartNumber } = pdpLabels;
    const { isAccordionOpen } = this.state;
    return (
      <View>
        <StyleProductDescription onPress={this.handleAccordionToggle}>
          <BodyCopy
            fontFamily="secondary"
            fontWeight="black"
            fontSize="fs14"
            isAccordionOpen={isAccordionOpen}
            text={ProductDescription}
            textAlign="center"
          />
          <ImageStyleWrapper>
            <Anchor onPress={this.handleAccordionToggle}>
              <Image source={isAccordionOpen ? upIcon : downIcon} />
            </Anchor>
          </ImageStyleWrapper>
        </StyleProductDescription>

        {isAccordionOpen ? (
          <>
            {shortDescription ? (
              <BodyCopyWithSpacing
                text={shortDescription}
                fontFamily="secondary"
                fontWeight="regular"
                fontSize="fs14"
                spacingStyles="padding-bottom-XXS"
              />
            ) : null}
            {longDescription ? (
              <FlatList
                numColumns={1}
                keyExtractor={keyExtractor}
                data={this.renderLongDescription(longDescription)}
                renderItem={({ item }) => renderItem(item)}
              />
            ) : null}
            <BodyCopyWithSpacing
              text={ClaimMessage}
              spacingStyles="padding-top-LRG"
              fontFamily="secondary"
              fontSize="fs14"
              fontWeight="regular"
            />
            <ItemStyleWrapper>
              <BodyCopy
                text={`${PartNumber} ${itemPartNumber}`}
                fontFamily="secondary"
                fontWeight="regular"
                fontSize="fs10"
              />
            </ItemStyleWrapper>
          </>
        ) : null}
      </View>
    );
  }
}

ProductDetailDescription.propTypes = {
  pdpLabels: PropTypes.shape({}),
  longDescription: PropTypes.string,
  shortDescription: PropTypes.string,
  itemPartNumber: PropTypes.string,
};

ProductDetailDescription.defaultProps = {
  longDescription: '',
  pdpLabels: {},
  shortDescription: '',
  itemPartNumber: '',
};

export default ProductDetailDescription;
export { ProductDetailDescription as ProductDetailDescriptionVanilla };
