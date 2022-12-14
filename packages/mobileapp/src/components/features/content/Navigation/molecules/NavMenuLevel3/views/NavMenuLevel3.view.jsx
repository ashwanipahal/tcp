import React from 'react';
import { PropTypes } from 'prop-types';
import { FlatList, Text } from 'react-native';
import { getScreenWidth } from '@tcp/core/src/utils';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import MenuItem from '../../MenuItems';
import { ArrowBackIcon, HeadingView, TouchableOpacityArrow } from '../NavMenuLevel3.style';
import { ItemViewWithHeading } from '../../NavMenuLevel2/NavMenuLevel2.style';

const keyExtractor = (_, index) => index.toString();
const BackIcon = require('../../../../../../../../../core/src/assets/carrot-large-left.png');

/**
 * @function renderItem populates the menu item conditionally
 * @param {object} item menu item object
 * @param {object} section contains the section title of the menu item
 */
const renderItem = navigate => listProps => {
  const maxWidthItem = getScreenWidth() - 60;

  const { item, index } = listProps;
  const { url, categoryContent } = item;
  const { name } = categoryContent;

  const navigateToNextScreen = () => {
    if (url.includes('-outfit')) {
      // Navigate to outfit listing for outfits
      const categoryIds = url && url.split('c?cid=');
      return navigate('OutfitListing', {
        title: name,
        url,
        outfitPath: (categoryIds && categoryIds.length > 1 && categoryIds[1]) || '',
      });
    }

    return navigate('ProductListing', {
      url,
      title: name,
      reset: true,
    });
  };

  return (
    <ItemViewWithHeading
      accessibilityRole="link"
      accessibilityLabel={item.categoryContent.name}
      testID={`L3_text_links_${index}`}
      onPress={() => navigateToNextScreen()}
    >
      <MenuItem
        navigate={navigate}
        route={() =>
          navigate('ProductListingPage', {
            url,
          })
        }
        maxWidthItem={maxWidthItem}
        item={item}
        hasBadge={false}
        promoBannerMargin={0}
        hasL3={false}
      />
    </ItemViewWithHeading>
  );
};

/**
 * The Navigation menu level3 is created by this component
 * @param {object} props Props passed from Stack navigator screen and the parent L1
 */
const NavMenuLevel3 = props => {
  const {
    navigation: { navigate, goBack, getParam },
  } = props;

  const subCategories = getParam('navigationObj');
  const l2Title = getParam('l2Title');
  const accessibilityLabels = getParam('accessibilityLabels');

  return (
    <React.Fragment>
      <HeadingView>
        <TouchableOpacityArrow
          accessibilityRole="button"
          accessibilityLabel={
            accessibilityLabels && accessibilityLabels.lbl_accessibility_backButton
          }
          testID="back_icon_btn"
          onPress={() => goBack()}
        >
          <ArrowBackIcon source={BackIcon} />
        </TouchableOpacityArrow>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          textAlign="left"
          text={l2Title}
          color="text.primary"
          testID="L3_header_text"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ textTransform: 'uppercase' }}
        />
        <Text />
      </HeadingView>
      <FlatList
        renderItem={renderItem(navigate)}
        keyExtractor={keyExtractor}
        data={subCategories}
      />
    </React.Fragment>
  );
};

NavMenuLevel3.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default NavMenuLevel3;
