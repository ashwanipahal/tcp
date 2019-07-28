import React from 'react';
import { PropTypes } from 'prop-types';
import { SectionList, Text, View } from 'react-native';
import { getScreenWidth } from '@tcp/core/src/utils/utils.native';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import {
  TitleView,
  HeadingView,
  ItemView,
  SizeSelector,
  ShopBySizeViewWrapper,
  PromoWrapper,
  ArrowIcon,
  ArrowBackIcon,
  TouchableOpacityArrow,
  PromoAndArrowView,
  ItemViewWithHeading,
} from '../NavMenuLevel2.style';

const placeHolderText = 'Lorem Ipsum';
const shopBySize = 'Shop By Size';
const shopBySizeArr = [
  {
    links: [
      {
        url: '1',
        text: '1',
      },
      {
        url: '2',
        text: '2',
      },
      {
        url: '3',
        text: '3',
      },
      {
        url: '4',
        text: '4',
      },
      {
        url: '5',
        text: '5',
      },
      {
        url: '6',
        text: '6',
      },
      {
        url: '7',
        text: '7',
      },
      {
        url: '8',
        text: '8',
      },
    ],
  },
];
const Icon = require('../../../../../../../../../core/src/assets/carrot-large-right.png');
const BackIcon = require('../../../../../../../../../core/src/assets/carrot-large-left.png');

/**
 * The Navigation menu level2 is created by this component
 * @param {object} props Props passed from Stack navigator screen and the parent L1
 */
const NavMenuLevel2 = props => {
  const {
    navigation: { navigate, goBack },
  } = props;

  /**
   * @function navigateFromL2 populates the L3 menu or PLP page for the L1 link that has been clicked
   * @param {object} subCats Details of the L2 menu item that has been clicked
   * @param {object} hasL3 flag that defines if L3 is present for the L2
   */
  const navigateFromL2 = (subCats, hasL3) => {
    if (hasL3) {
      return navigate('NavMenuLevel3');
    }
    return navigate('productListingPage');
  };

  /**
   * @function shopBySizeCircle populates the circular links for shop by size
   * @param {object} links shop by size links
   */
  const shopBySizeCircle = links => {
    return (
      <ShopBySizeViewWrapper>
        {links.map(linkItem => {
          return (
            <SizeSelector accessibilityRole="button" onPress={() => navigateFromL2(linkItem.url)}>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs18"
                text={linkItem.text}
                color="text.primary"
              />
            </SizeSelector>
          );
        })}
      </ShopBySizeViewWrapper>
    );
  };

  /**
   * @function menuItem populates the text, promobadge and arrow of the menu item
   * @param {object} links shop by size links
   */
  const menuItem = (maxWidthItem, item, hasBadge, promoBannerMargin, hasL3) => {
    return (
      <React.Fragment>
        <View maxWidth={maxWidthItem}>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="regular"
            text={item.categoryContent.name}
            color="text.primary"
            numberOfLines={1}
          />
        </View>
        <PromoAndArrowView>
          {hasBadge && (
            <PromoWrapper marginRight={promoBannerMargin}>
              <BodyCopy
                fontFamily="primary"
                fontSize="fs10"
                fontWeight="black"
                text="60% OFF"
                color="white"
              />
            </PromoWrapper>
          )}
          {hasL3 && <ArrowIcon alt="alt" source={Icon} />}
        </PromoAndArrowView>
      </React.Fragment>
    );
  };

  /**
   * @function renderItem populates the menu item conditionally
   * @param {object} item menu item object
   * @param {object} section contains the section title of the menu item
   */
  const renderItem = ({ item, section: { title } }) => {
    let maxWidthItem = getScreenWidth() - 60;
    let promoBannerMargin = 55;

    let hasL3 = false;
    let hasBadge = false;

    // TODO - there would be a differentiating factor for generating circular links
    // Use that check instead, as of now hardcoding the mock Title
    if (title === shopBySize) {
      return shopBySizeCircle(item.links);
    }

    if (item.subCategories.length) {
      hasL3 = true;
      promoBannerMargin = 40;
    }

    // TODO - Random check for getting the badge on page, remove it
    if (item.categoryContent.productCount % 2 === 0) {
      hasBadge = true;
      maxWidthItem -= 180;
    }
    if (title === placeHolderText) {
      return (
        <ItemView
          accessibilityRole="button"
          onPress={() => navigateFromL2(item.subCategories, hasL3)}
        >
          {menuItem(maxWidthItem, item, hasBadge, promoBannerMargin, hasL3)}
        </ItemView>
      );
    }
    return (
      <ItemViewWithHeading
        accessibilityRole="button"
        onPress={() => navigateFromL2(item.subCategories, hasL3)}
      >
        {menuItem(maxWidthItem, item, hasBadge, promoBannerMargin, hasL3)}
      </ItemViewWithHeading>
    );
  };

  const {
    navigation: { getParam },
  } = props;
  const item = getParam('navigationObj');
  const l1Title = getParam('l1Title');

  const {
    item: { subCategories },
  } = item;

  // TODO - Appending the dummy shop by size object for development. Remove it later
  subCategories[shopBySize] = shopBySizeArr;

  // Extract the object keys and place the placeHolderText key
  // as the first element of the array since that appears first
  const subCatArr = Object.keys(subCategories);
  const indexOfSubFirstSection = subCatArr.indexOf(placeHolderText);
  if (indexOfSubFirstSection !== 0) {
    subCatArr.splice(indexOfSubFirstSection, 1);
    subCatArr.unshift(placeHolderText);
  }

  const sectionArr = subCatArr.map(subcatName => {
    return { data: subCategories[subcatName], title: subcatName };
  });

  return (
    <SectionList
      renderItem={renderItem}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => {
        if (section.title === placeHolderText) {
          return (
            <HeadingView>
              <TouchableOpacityArrow accessibilityRole="button" onPress={() => goBack()}>
                <ArrowBackIcon source={BackIcon} />
              </TouchableOpacityArrow>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs16"
                textAlign="center"
                text={l1Title}
                color="text.primary"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ textTransform: 'uppercase' }}
              />
              <Text />
            </HeadingView>
          );
        }
        return (
          <TitleView>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs16"
              text={section.title}
              color="text.primary"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ textTransform: 'uppercase' }}
            />
          </TitleView>
        );
      }}
      sections={sectionArr}
    />
  );
};

NavMenuLevel2.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  item: PropTypes.shape({}).isRequired,
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default NavMenuLevel2;
