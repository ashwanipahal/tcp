import React from 'react';
import { PropTypes } from 'prop-types';
import { SectionList, Text } from 'react-native';
import { getScreenWidth } from '@tcp/core/src/utils';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import ShopBySize from '../../ShopBySize';
import shopByConstant from '../../ShopBySize/ShopBySize.constant';
import MenuItem from '../../MenuItems';
import {
  TitleContainer,
  HeadingContainer,
  ArrowBackIcon,
  TouchableOpacityArrow,
  ItemViewWithHeading,
} from '../NavMenuLevel2.style';
import ROUTE_NAMES from '../../../../../../../reduxStore/routes';

const keyExtractor = (_, index) => index.toString();
const { SHOP_BY_SIZE } = shopByConstant;

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

  if (url.includes('-outfit')) {
    // Navigate to outfit listing for outfits
    const categoryIds = url.split('cid=');
    return navigate('OutfitListing', {
      title: name,
      url,
      accessibilityLabels,
      outfitPath: (categoryIds && categoryIds.length > 1 && categoryIds[1]) || '',
    });
  }

  return navigate('ProductListing', {
    title: name,
    url,
    reset: true,
    accessibilityLabels,
  });
};

const addShopBySize = item => {
  const {
    item: { categoryContent },
  } = item;
  if (!categoryContent) {
    return false;
  }
  let { mainCategory } = categoryContent;
  if (!mainCategory) {
    mainCategory = {
      categoryLayout: [],
    };
  }
  const { categoryLayout } = mainCategory;
  if (categoryLayout && categoryLayout.length) {
    const columnArr = categoryLayout[0].columns;
    const shopBySizeColumn = columnArr.find(colItem => colItem.shopBySize);
    if (shopBySizeColumn) {
      const [shopBySizeElem] = shopBySizeColumn.shopBySize;
      const {
        text: { text: shopBySizeTitle },
      } = shopBySizeElem;
      return {
        label: shopBySizeTitle,
        order: 0,
        items: shopBySizeColumn.shopBySize,
        isShopBySize: true,
      };
    }
    return false;
  }
  return false;
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
  const renderItem = ({ item, section: { isShopBySize } }) => {
    let maxWidthItem = getScreenWidth() - 60;
    let promoBannerMargin = 55;

    let hasL3 = false;
    let hasBadge = false;

    if (isShopBySize) {
      return <ShopBySize navigate={navigate} links={item.linkList} hasL3={hasL3} />;
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
  const shopBySizeElem = addShopBySize(item);
  if (shopBySizeElem) {
    subCategories[SHOP_BY_SIZE] = shopBySizeElem;
  }
  const subCatArr = Object.keys(subCategories).sort((prevGroup, curGroup) => {
    return parseInt(prevGroup.order, 10) - parseInt(curGroup.order, 10);
  });

  const sectionArr = subCatArr.map(subcatName => {
    return {
      data: subCategories[subcatName].items || [],
      title: subCategories[subcatName].label,
      order: parseInt(subCategories[subcatName].order, 10),
      isShopBySize: subCategories[subcatName].isShopBySize,
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
