import React from 'react';
import { PropTypes } from 'prop-types';
import { SectionList, Text } from 'react-native';
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
const renderItem = navigate => sectionProps => {
  const maxWidthItem = getScreenWidth() - 60;

  const { item } = sectionProps;

  return (
    <ItemViewWithHeading accessibilityRole="button" onPress={() => navigate('ProductListingPage')}>
      <MenuItem
        navigate={navigate}
        navigationMethod={() => navigate('ProductListingPage')}
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
  const sectionArr = subCategories.map(subcatName => {
    return { data: subCategories, title: subcatName.name };
  });

  return (
    <React.Fragment>
      <HeadingView>
        <TouchableOpacityArrow accessibilityRole="button" onPress={() => goBack()}>
          <ArrowBackIcon source={BackIcon} />
        </TouchableOpacityArrow>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          textAlign="left"
          text={l2Title}
          color="text.primary"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ textTransform: 'uppercase' }}
        />
        <Text />
      </HeadingView>
      <SectionList
        renderItem={renderItem(navigate)}
        keyExtractor={keyExtractor}
        stickySectionHeadersEnabled={false}
        sections={sectionArr}
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
