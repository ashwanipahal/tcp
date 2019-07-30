import React from 'react';
import { PropTypes } from 'prop-types';
import { getScreenWidth, cropImageUrl } from '@tcp/core/src/utils/utils.native';
import { Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import {
  L1TouchableOpacity,
  L1TextView,
  ContainerList,
  L1TouchableOpacityNoImage,
} from '../NavMenuLevel1.style';

const imageWidth = getScreenWidth() / 2;
const keyExtractor = (_, index) => index.toString();
const Icon = require('../../../../../../../../../core/src/assets/carrot-small-rights.png');

/**
 * @function NavMenuLevel1 The Navigation menu level1 is created by this component
 * @param {object} props Props passed from Stack navigator screen
 */
const NavMenuLevel1 = props => {
  const { navigationMenuObj } = props;

  /**
   * @function ShowL2Navigation populates the L2 menu for the L1 link that has been clicked
   * @param {object} item Details of the L1 menu item that has been clicked
   */
  const ShowL2Navigation = (item, name) => {
    const {
      navigation: { navigate },
    } = props;

    return navigate('NavMenuLevel2', {
      navigationObj: item,
      l1Title: name,
    });
  };

  /**
   * @function renderTextBlock populates the L1 menu content
   * @param {object} item Details of the L1 menu item that has been clicked
   */
  const renderTextBlock = (catName, catSize) => {
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
   * @function extractL1Information extracts the L1 information from the CMS object
   * uses the unbxd object in case CMS object is not available
   */
  const extractL1Information = (name, description, mainCategory) => {
    return {
      name: (mainCategory && mainCategory.name) || name,
      description:
        (mainCategory &&
          mainCategory.sizesRange &&
          mainCategory.sizesRange[0] &&
          mainCategory.sizesRange[0].text) ||
        description,
    };
  };

  /**
   * @function renderItem populates the L1 menu item from the data passed to it
   * @param {object} item Details of the L1 menu item passed from the loop
   */
  const renderItem = item => {
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

    const L1InfoObject = extractL1Information(name, description, mainCategory);

    // In case of no category image, add the caret with the text
    if (categoryImage.length === 0) {
      return (
        <L1TouchableOpacityNoImage
          accessibilityRole="button"
          onPress={() => ShowL2Navigation(item, L1InfoObject.name)}
        >
          <BodyCopy
            fontFamily="primary"
            fontSize="fs28"
            fontWeight="black"
            textAlign="center"
            text={L1InfoObject.name}
            color="text.primary"
          />
          <Image
            alt={L1InfoObject.name}
            source={Icon}
            maxWidth={16}
            height={26}
            position="absolute"
            right={37}
          />
        </L1TouchableOpacityNoImage>
      );
    }

    return (
      <L1TouchableOpacity
        accessibilityRole="button"
        onPress={() => ShowL2Navigation(item, L1InfoObject.name)}
      >
        {categoryImage[0].position &&
          categoryImage[0].position === 'right' &&
          renderTextBlock(L1InfoObject.name, L1InfoObject.description)}
        <Image
          alt={categoryImage && categoryImage[0].alt}
          source={{
            uri: categoryImage && cropImageUrl(categoryImage[0].url, categoryImage[0].crop_m),
          }}
          width={imageWidth}
          height={132}
        />
        {(!categoryImage[0].position || categoryImage[0].position === 'left') &&
          renderTextBlock(L1InfoObject.name, L1InfoObject.description)}
      </L1TouchableOpacity>
    );
  };

  return (
    <ContainerList data={navigationMenuObj} keyExtractor={keyExtractor} renderItem={renderItem} />
  );
};

NavMenuLevel1.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  navigationMenuObj: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default NavMenuLevel1;
