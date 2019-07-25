import React from 'react';
import { PropTypes } from 'prop-types';
import { FlatList, ScrollView } from 'react-native';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { TitleView, HeadingView, ItemView } from '../NavMenuLevel2.style';

const keyExtractor = (_, index) => index.toString();

const NavigationMenu = props => {
  const renderItem = item => {
    return (
      <ItemView>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          text={item.item.categoryContent.name}
          color="text.primary"
        />
      </ItemView>
    );
  };
  const {
    navigation: { getParam },
  } = props;
  const item = getParam('navigationObj');

  const {
    item: { categoryContent, subCategories },
  } = item;
  return (
    <ScrollView>
      <HeadingView>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          textAlign="center"
          text={categoryContent.name}
          color="text.primary"
        />
      </HeadingView>
      <FlatList
        data={subCategories['Lorem Ipsum']}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <TitleView>
        <BodyCopy fontFamily="secondary" fontSize="fs16" text="Categories" color="text.primary" />
      </TitleView>
      <FlatList
        data={subCategories.Categories}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <TitleView>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          text="Featured Shops"
          color="text.primary"
        />
      </TitleView>
      <FlatList
        data={subCategories['Featured Shops']}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </ScrollView>
  );
};

NavigationMenu.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default NavigationMenu;
