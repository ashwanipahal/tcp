import React from 'react';
import { PropTypes } from 'prop-types';
import { SectionList, Text } from 'react-native';
import { getScreenWidth } from '@tcp/core/src/utils';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import ShopBySize from '../../ShopBySize';
import MenuItem from '../../MenuItems';
import { shopBySizeArr, shopBySize } from '../shopBySizeMock';
import {
  TitleContainer,
  HeadingContainer,
  ArrowBackIcon,
  TouchableOpacityArrow,
  ItemViewWithHeading,
} from '../NavMenuLevel2.style';
import ROUTE_NAMES from '../../../../../../../reduxStore/routes';

const keyExtractor = (_, index) => index.toString();

const BackIcon = require('../../../../../../../../../core/src/assets/carrot-large-left.png');

/**
 * @function navigateFromL2 populates the L3 menu or PLP page for the L1 link that has been clicked
 * @param {object} subCategories Details of the L2 menu item that has been clicked
 * @param {object} hasL3 flag that defines if L3 is present for the L2
 */
const navigateFromL2 = (navigate, subCategories, name, hasL3, accessibilityLabels, url) => {
  if (hasL3) {
    return navigate(ROUTE_NAMES.NAV_MENU_LEVEL_3, {
      navigationObj: subCategories,
      l2Title: name,
      accessibilityLabels,
    });
  }
  return navigate('ProductListing', {
    title: name,
    url,
    reset: true,
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
  subCategories[shopBySize] = {
    label: shopBySize,
    order: 0,
    items: shopBySizeArr,
  };

  const subCatArr = Object.keys(subCategories).sort((prevGroup, curGroup) => {
    return parseInt(prevGroup.order, 10) - parseInt(curGroup.order, 10);
  });

  const sectionArr = subCatArr.map(subcatName => {
    return {
      data: subCategories[subcatName].items || [],
      title: subCategories[subcatName].label,
      order: parseInt(subCategories[subcatName].order, 10),
    };
  });

  return (
    <React.Fragment>
      <HeadingContainer>
        <TouchableOpacityArrow
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabels.lbl_accessibility_backButton}
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
        />
        <Text />
      </HeadingContainer>
      <SectionList
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => {
          return section.title ? (
            <TitleContainer>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs16"
                text={section.title}
                color="text.primary"
              />
            </TitleContainer>
          ) : null;
        }}
        sections={sectionArr}
      />
    </React.Fragment>
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
