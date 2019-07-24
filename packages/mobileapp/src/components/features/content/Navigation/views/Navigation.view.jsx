import React from 'react';
import { FlatList, View } from 'react-native';
import { getScreenWidth, UrlHandler } from '@tcp/core/src/utils/utils.native';
import { Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import {
  L1WithoutImageView,
  L1WithoutImageText,
  L1TouchableOpacity,
  L1NavImageWrapper,
  L1TextView,
} from '../Navigation.style';

import navObject from '../mock';

const imageWidth = parseInt(getScreenWidth() / 2, 10);
const keyExtractor = (_, index) => index.toString();
const Icon = require('@tcp/core/src/assets/carrot-small-rights.png');

const getUrlWithCrop = url => {
  return url.replace('h_650,w_650', `h_132,w_${imageWidth}`);
};

const renderItem = item => {
  if (item.item.categoryContent.mainCategory.categoryImages.length === 0) {
    return (
      <L1WithoutImageView>
        <L1WithoutImageText>{item.item.categoryContent.mainCategory.name}</L1WithoutImageText>
        <Image alt="PLP" source={Icon} maxWidth={16} height={26} position="absolute" right={37} />
      </L1WithoutImageView>
    );
  }

  return (
    <View>
      <L1TouchableOpacity accessibilityRole="button" onPress={() => UrlHandler(item.url)}>
        {!item.item.categoryContent.imageFirst && (
          <L1TextView>
            <BodyCopy
              fontFamily="primary"
              fontSize="fs18"
              fontWeight="black"
              textAlign="center"
              text={item.item.categoryContent.mainCategory.name}
            />
            <BodyCopy
              fontFamily="primary"
              fontSize="fs10"
              fontWeight="black"
              textAlign="center"
              text={item.item.categoryContent.description}
            />
          </L1TextView>
        )}
        <L1NavImageWrapper>
          <Image
            alt="abcd"
            source={{
              uri: getUrlWithCrop(
                'https://res.cloudinary.com/tcp-dam-test/image/upload/c_fill,g_face,h_650,w_650/v1558543115/ecom/assets/content/tcp/us/home/moduled/US-HP-050519-MINIME1_h9cwcd.jpg'
              ),
            }}
            width={imageWidth}
            height={132}
            // source={{uri: item.categoryContent.mainCategory.categoryImages.url}}
          />
        </L1NavImageWrapper>
        {!!item.item.categoryContent.imageFirst && (
          <L1TextView>
            <BodyCopy
              fontFamily="primary"
              fontSize="fs18"
              fontWeight="black"
              textAlign="center"
              text={item.item.categoryContent.mainCategory.name}
            />
            <BodyCopy
              fontFamily="primary"
              fontSize="fs10"
              fontWeight="black"
              textAlign="center"
              text={item.item.categoryContent.description}
            />
          </L1TextView>
        )}
      </L1TouchableOpacity>
    </View>
  );
};

const NavigationMenu = () => {
  return (
    <View>
      <FlatList
        numColumns={1}
        data={navObject.data.navigation.nav}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default NavigationMenu;
