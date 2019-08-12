import React from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { PromoAndArrowContainer, PromoContainer, ArrowIcon } from '../MenuItems.style';

const Icon = require('../../../../../../../../../core/src/assets/carrot-large-right.png');

/**
 * @function MenuItems populates the menu item
 * @param {object} links shop by size links
 */
const MenuItems = ({ navigate, maxWidthItem, item, hasBadge, promoBannerMargin, hasL3, route }) => {
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
      <PromoAndArrowContainer onPress={() => route(navigate, item.subCategories, item.name, hasL3)}>
        {hasBadge && (
          <PromoContainer marginRight={promoBannerMargin}>
            <BodyCopy
              fontFamily="primary"
              fontSize="fs10"
              fontWeight="black"
              text={item.categoryContent.mainCategory.promoBadge[0].text}
              color="white"
            />
          </PromoContainer>
        )}
        {hasL3 && <ArrowIcon alt="alt" source={Icon} />}
      </PromoAndArrowContainer>
    </React.Fragment>
  );
};

MenuItems.propTypes = {
  navigate: PropTypes.func.isRequired,
  item: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  maxWidthItem: PropTypes.string,
  hasL3: PropTypes.bool,
  hasBadge: PropTypes.bool,
  promoBannerMargin: PropTypes.string,
  route: PropTypes.func.isRequired,
};

MenuItems.defaultProps = {
  hasL3: false,
  maxWidthItem: '',
  hasBadge: false,
  promoBannerMargin: '',
};

export default MenuItems;
