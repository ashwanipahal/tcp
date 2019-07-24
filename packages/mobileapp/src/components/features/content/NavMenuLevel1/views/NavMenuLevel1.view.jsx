import React from 'react';
import { PropTypes } from 'prop-types';
import { FlatList, View } from 'react-native';
import { getScreenWidth, cropUrl } from '@tcp/core/src/utils/utils.native';
import { Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import {
  L1WithoutImageView,
  L1TouchableOpacity,
  L1TextView,
  ContainerView,
} from '../NavMenuLevel1.style';

import navObject from '../mock';

const imageWidth = parseInt(getScreenWidth() / 2, 10);
const keyExtractor = (_, index) => index.toString();
const Icon = require('@tcp/core/src/assets/carrot-small-rights.png');

/**
 * The Navigation menu level1 is created by this component
 * @param {object} props Props passed from Stack navigator screen
 */
const NavigationMenu = props => {
  const {
    navigation: { navigate },
  } = props;

  /**
   * The ShowL2Navigation populates the L2 menu for the L1 link that has been clicked
   * @param {object} item Details of the L1 menu item that has been clicked
   */
  const ShowL2Navigation = item => {
    return navigate('navMenuL2', {
      navigationKey: item.name,
      navigationLinks: item.categoryContent,
    });
  };

  /**
   * The renderItem populates the L1 menu item from the data passed to it
   * @param {object} item Details of the L1 menu item passed from the loop
   */
  const renderItem = item => {
    const {
      item: { categoryContent },
    } = item;
    // In case of no category image, add the caret with the text
    if (categoryContent.mainCategory.categoryImages.length === 0) {
      return (
        <L1WithoutImageView>
          <L1TouchableOpacity
            accessibilityRole="button"
            onPress={() => ShowL2Navigation(categoryContent)}
          >
            <BodyCopy
              fontFamily="primary"
              fontSize="fs28"
              fontWeight="black"
              textAlign="center"
              text={categoryContent.name}
              color="text.primary"
            />
            <Image
              alt="PLP"
              source={Icon}
              maxWidth={16}
              height={26}
              position="absolute"
              right={37}
            />
          </L1TouchableOpacity>
        </L1WithoutImageView>
      );
    }

    return (
      <View>
        <L1TouchableOpacity
          accessibilityRole="button"
          onPress={() => ShowL2Navigation(categoryContent)}
        >
          {!categoryContent.imageFirst && (
            <L1TextView>
              <BodyCopy
                fontFamily="primary"
                fontSize="fs22"
                fontWeight="black"
                textAlign="center"
                text={categoryContent.name}
                color="text.primary"
              />
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="extrabold"
                textAlign="center"
                text={categoryContent.description}
                color="text.primary"
              />
            </L1TextView>
          )}
          <View>
            <Image
              alt="abcd"
              source={{
                uri: cropUrl(
                  categoryContent.mainCategory.categoryImages[0].url,
                  categoryContent.mainCategory.categoryImages[0].crop_m
                ),
              }}
              width={imageWidth}
              height={132}
            />
          </View>
          {!!categoryContent.imageFirst && (
            <L1TextView>
              <BodyCopy
                fontFamily="primary"
                fontSize="fs22"
                fontWeight="black"
                textAlign="center"
                text={categoryContent.name}
                color="text.primary"
              />
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs12"
                fontWeight="extrabold"
                textAlign="center"
                text={categoryContent.description}
                color="text.primary"
              />
            </L1TextView>
          )}
        </L1TouchableOpacity>
      </View>
    );
  };

  return (
    <ContainerView>
      <FlatList
        numColumns={1}
        data={navObject.data.navigation.nav}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </ContainerView>
  );
};

NavigationMenu.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default NavigationMenu;
