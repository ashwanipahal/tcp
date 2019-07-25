import React from 'react';
import { PropTypes } from 'prop-types';
import { getScreenWidth, cropUrl } from '@tcp/core/src/utils/utils.native';
import { Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import {
  L1TouchableOpacity,
  L1TextView,
  ContainerList,
  L1TouchableOpacityNoImage,
} from '../NavMenuLevel1.style';

const imageWidth = parseInt(getScreenWidth() / 2, 10);
const keyExtractor = (_, index) => index.toString();
const Icon = require('@tcp/core/src/assets/carrot-small-rights.png');

/**
 * The Navigation menu level1 is created by this component
 * @param {object} props Props passed from Stack navigator screen
 */
const NavigationMenu = props => {
  const {
    navigationMenuObj: {
      data: {
        navigation: { nav },
      },
    },
  } = props;

  /**
   * The ShowL2Navigation populates the L2 menu for the L1 link that has been clicked
   * @param {object} item Details of the L1 menu item that has been clicked
   */
  const ShowL2Navigation = item => {
    const {
      navigation: { navigate },
    } = props;

    return navigate('NavMenuLevel2', {
      navigationKey: item.name,
      navigationLinks: item.categoryContent,
    });
  };

  /**
   * The renderTextBlock populates the L1 menu content
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
   * The renderItem populates the L1 menu item from the data passed to it
   * @param {object} item Details of the L1 menu item passed from the loop
   */
  const renderItem = item => {
    const {
      item: {
        categoryContent,
        categoryContent: {
          name,
          description,
          imageFirst,
          mainCategory: { categoryImages },
        },
      },
    } = item;
    // In case of no category image, add the caret with the text
    if (categoryImages.length === 0) {
      return (
        <L1TouchableOpacityNoImage
          accessibilityRole="button"
          onPress={() => ShowL2Navigation(categoryContent)}
        >
          <BodyCopy
            fontFamily="primary"
            fontSize="fs28"
            fontWeight="black"
            textAlign="center"
            text={name}
            color="text.primary"
          />
          <Image
            alt={name}
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
        onPress={() => ShowL2Navigation(categoryContent)}
      >
        {!categoryContent.imageFirst && renderTextBlock(name, description)}
        <Image
          alt={categoryImages[0].alt}
          source={{
            uri: cropUrl(categoryImages[0].url, categoryImages[0].crop_m),
          }}
          width={imageWidth}
          height={132}
        />
        {!!imageFirst && renderTextBlock(name, description)}
      </L1TouchableOpacity>
    );
  };

  return <ContainerList data={nav} keyExtractor={keyExtractor} renderItem={renderItem} />;
};

NavigationMenu.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  navigationMenuObj: PropTypes.shape({}).isRequired,
};

export default NavigationMenu;
