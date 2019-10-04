/* eslint-disable */
import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { BodyCopy } from '../../../../../../common/atoms';
// import { StyledBodyCopy } from '../ProductDescription.native.style';

// Key extractor for flat list
const keyExtractor = (_, index) => index.toString();

const renderItem = item => {
  return item ? (
    <View style={{ flexDirection: 'row' }}>
      <BodyCopyWithSpacing text={`\u2022`} spacingStyles="padding-right-XXS" />
      <BodyCopyWithSpacing
        fontFamily="secondary"
        fontWeight="regular"
        fontSize="fs14"
        text={item}
        spacingStyles="padding-bottom-XXS"
      />
    </View>
  ) : null;
};

class ProductDetailDescription extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // isShowMore: !!props.isShowMore,
      // isExpanded: true,
      isAccordionOpen: true,
    };
  }

  // handleToggleShowMoreOrLess = () => {
  //   const { isShowMore } = this.state;
  //   this.setState({
  //     isShowMore: !isShowMore,
  //   });
  // };

  handleAccordionToggle = () => {
    const { isAccordionOpen } = this.state;
    console.info('isAccordionOpen', isAccordionOpen);
    this.setState({ isAccordionOpen: !isAccordionOpen });
  };

  renderLongDescription = longDescription => {
    const longDescriptionText = longDescription.replace(/<\/li>/g, '');
    return longDescriptionText.split('<li>');
  };

  render() {
    const { longDescription, itemPartNumber, shortDescription } = this.props;
    const { isAccordionOpen } = this.state;
    return (
      <View>
        <BodyCopyWithSpacing
          fontFamily="secondary"
          fontWeight="black"
          fontSize="fs14"
          isAccordionOpen={isAccordionOpen}
          text="Product Description"
          onPress={this.handleAccordionToggle}
          spacingStyles="margin-bottom-MED"
        />
        {isAccordionOpen ? (
          <>
            {shortDescription ? (
              <BodyCopyWithSpacing text={shortDescription} spacingStyles="padding-bottom-XXS" />
            ) : null}
            <FlatList
              numColumns={1}
              keyExtractor={keyExtractor}
              data={this.renderLongDescription(longDescription)}
              renderItem={({ item }) => renderItem(item)}
            />
            <BodyCopyWithSpacing
              text="Big Fashion, Little Princess"
              spacingStyles="padding-top-LRG"
              fontFamily="secondary"
              fontSize="fs14"
            />
          </>
        ) : null}
        <BodyCopy text={`Part No. ${itemPartNumber}`} />
        {/* <TouchableOpacity
          accessible
          accessibilityLabel="Tap to show more"
          accessibilityRole="none"
          onPress={this.handleToggleShowMoreOrLess}
          activeOpacity={1}
        >
          <BodyCopy text="Read More" />
        </TouchableOpacity> */}
      </View>
    );
  }
}

ProductDetailDescription.propTypes = {
  itemPartNumber: PropTypes.string,
  pdpLabels: PropTypes.shape({}),
  longDescription: PropTypes.string,
  shortDescription: PropTypes.string,
  // isShowMore: PropTypes.bool,
};

ProductDetailDescription.defaultProps = {
  itemPartNumber: '',
  longDescription: '',
  pdpLabels: {},
  shortDescription: '',
  // isShowMore: false,
};

export default ProductDetailDescription;
export { ProductDetailDescription as ProductDetailDescriptionVanilla };
