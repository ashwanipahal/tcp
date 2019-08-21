import React from 'react';
import { PropTypes } from 'prop-types';
import { SectionList, Text } from 'react-native';
import { getScreenWidth } from '@tcp/core/src/utils';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import ShopBySize from '../../ShopBySize';
import MenuItem from '../../MenuItems';
import { shopBySizeArr, placeHolderText, shopBySize } from '../shopBySizeMock';
import {
  TitleContainer,
  HeadingContainer,
  ItemView,
  ArrowBackIcon,
  TouchableOpacityArrow,
  ItemViewWithHeading,
} from '../NavMenuLevel2.style';

const keyExtractor = (_, index) => index.toString();

const BackIcon = require('../../../../../../../../../core/src/assets/carrot-large-left.png');

/**
 * @function navigateFromL2 populates the L3 menu or PLP page for the L1 link that has been clicked
 * @param {object} subCategories Details of the L2 menu item that has been clicked
 * @param {object} hasL3 flag that defines if L3 is present for the L2
 */
const navigateFromL2 = (navigate, subCategories, name, hasL3, accessibilityLabels, url) => {
  if (hasL3) {
    return navigate('NavMenuLevel3', {
      navigationObj: subCategories,
      l2Title: name,
      accessibilityLabels,
    });
  }
  return navigate('ProductListing', {
    l2Title: name,
    url,
    accessibilityLabels,
  });
};

/**
 * The Navigation menu level2 is created by this component
 * @param {object} props Props passed from Stack navigator screen and the parent L1
 */
const NavMenuLevel2 = props => {
  const {
    navigation: { navigate, goBack, getParam },
  } = props;
  const accessibilityLabels = getParam('accessibilityLabels');

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
      return <ShopBySize navigate={navigate} links={item.links} hasL3={hasL3} />;
      // return shopBySizeCircle(navigate, item.links);
    }

    if (item.subCategories && item.subCategories.length) {
      hasL3 = true;
      promoBannerMargin = 40;
    }

    if (
      item.categoryContent.mainCategory &&
      item.categoryContent.mainCategory.promoBadge &&
      item.categoryContent.mainCategory.promoBadge[0].text
    ) {
      hasBadge = true;
      maxWidthItem -= 180;
    }

    const routeHandler = () =>
      navigateFromL2(
        navigate,
        item.subCategories,
        item.categoryContent.name,
        hasL3,
        accessibilityLabels,
        item.url
      );

    // In case of empty group category, using Lorem Ipsum to
    // group these items and rendering it on top of the menu items
    if (title === placeHolderText) {
      return (
        <ItemView
          accessibilityRole="button"
          accessibilityLabel={item.categoryContent.name}
          onPress={routeHandler}
        >
          <MenuItem
            navigate={navigate}
            route={routeHandler}
            maxWidthItem={maxWidthItem}
            item={item}
            hasBadge={hasBadge}
            promoBannerMargin={promoBannerMargin}
            hasL3={hasL3}
          />
        </ItemView>
      );
    }
    return (
      <ItemViewWithHeading
        accessibilityRole="button"
        accessibilityLabel={item.categoryContent.name}
        onPress={routeHandler}
      >
        <MenuItem
          navigate={navigate}
          route={routeHandler}
          maxWidthItem={maxWidthItem}
          item={item}
          hasBadge={hasBadge}
          promoBannerMargin={promoBannerMargin}
          hasL3={hasL3}
        />
      </ItemViewWithHeading>
    );
  };

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
    return { data: subCategories[subcatName] || [], title: subcatName };
  });

  console.log(sectionArr);

  return (
    <SectionList
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => {
        if (section.title === placeHolderText) {
          return (
            <HeadingContainer>
              <TouchableOpacityArrow
                accessibilityRole="button"
                accessibilityLabel={accessibilityLabels.back_button}
                onPress={() => goBack()}
              >
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
            </HeadingContainer>
          );
        }
        return (
          <TitleContainer>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs16"
              text={section.title}
              color="text.primary"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ textTransform: 'uppercase' }}
            />
          </TitleContainer>
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
  item: PropTypes.shape({}),
  section: PropTypes.shape({
    title: PropTypes.string,
  }),
};

NavMenuLevel2.defaultProps = {
  item: {},
  section: {
    title: '',
  },
};

export default NavMenuLevel2;
