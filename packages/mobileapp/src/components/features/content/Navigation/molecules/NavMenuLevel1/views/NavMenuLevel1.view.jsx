import React from 'react';
import { PropTypes } from 'prop-types';
import { getScreenWidth, cropImageUrl } from '@tcp/core/src/utils';
import { Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import InitialPropsHOC from '@tcp/core/src/components/common/hoc/InitialPropsHOC/InitialPropsHOC.native';
import {
  L1TouchableOpacity,
  L1TextView,
  ContainerList,
  L1TouchableOpacityNoImage,
} from '../NavMenuLevel1.style';

const imageWidth = getScreenWidth() / 2;
const keyExtractor = (_, index) => index.toString();

const Icon = require('../../../../../../../../../core/src/assets/caret-large-right-black.png');

/**
 * @function NavMenuLevel1 The Navigation menu level1 is created by this component
 * @param {object} props Props passed from Stack navigator screen
 */
class NavMenuLevel1 extends React.PureComponent {
  /**
   * @function ShowL2Navigation populates the L2 menu for the L1 link that has been clicked
   * @param {object} item Details of the L1 menu item that has been clicked
   */
  showL2Navigation = (item, name) => {
    const {
      navigation: { navigate },
      accessibilityLabels,
    } = this.props;

    return navigate('NavMenuLevel2', {
      navigationObj: item,
      l1Title: name,
      accessibilityLabels,
    });
  };

  /**
   * @function renderTextBlock populates the L1 menu content
   * @param {object} item Details of the L1 menu item that has been clicked
   */
  renderTextBlock = (catName, catSize) => {
    return (
      <L1TextView>
        <BodyCopy
          fontFamily="primary"
          fontSize="fs22"
          fontWeight="black"
          textAlign="center"
          text={catName}
          color="text.primary"
        />
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs12"
          fontWeight="extrabold"
          textAlign="center"
          text={catSize}
          color="text.primary"
        />
      </L1TextView>
    );
  };

  /**
   * @function renderItem populates the L1 menu item from the data passed to it
   * @param {object} item Details of the L1 menu item passed from the loop
   */
  renderItem = item => {
    const {
      item: {
        categoryContent: { name, description },
      },
    } = item;

    let {
      item: {
        categoryContent: { mainCategory },
      },
    } = item;
    if (!mainCategory) {
      mainCategory = {
        categoryImage: [],
      };
    }

    const { categoryImage } = mainCategory;

    // In case of no category image, add the caret with the text
    if (!categoryImage || categoryImage.length === 0) {
      return (
        <L1TouchableOpacityNoImage
          accessibilityRole="button"
          accessibilityLabel={name}
          onPress={() => this.showL2Navigation(item, name)}
        >
          <BodyCopy
            fontFamily="primary"
            fontSize="fs28"
            fontWeight="black"
            textAlign="center"
            text={name}
            color="text.primary"
            numberOfLines={1}
            margin="0 60px 0 0"
          />
          <Image alt={name} source={Icon} width={13} height={26} position="absolute" right={37} />
        </L1TouchableOpacityNoImage>
      );
    }

    return (
      <L1TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={name}
        onPress={() => this.showL2Navigation(item, name)}
      >
        {categoryImage[0].position &&
          categoryImage[0].position === 'right' &&
          this.renderTextBlock(name, description)}
        <Image
          alt={categoryImage && categoryImage[0].alt}
          source={{
            uri: categoryImage && cropImageUrl(categoryImage[0].url, categoryImage[0].crop_m),
          }}
          width={imageWidth}
          height={132}
        />
        {(!categoryImage[0].position || categoryImage[0].position === 'left') &&
          this.renderTextBlock(name, description)}
      </L1TouchableOpacity>
    );
  };

  render() {
    const { navigationMenuObj } = this.props;

    return (
      <ContainerList
        data={navigationMenuObj}
        keyExtractor={keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

NavMenuLevel1.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  accessibilityLabels: PropTypes.shape({}),
  navigationMenuObj: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

NavMenuLevel1.defaultProps = {
  accessibilityLabels: {},
};

export { NavMenuLevel1 as NavMenuLevel1View };
export default InitialPropsHOC(NavMenuLevel1);
