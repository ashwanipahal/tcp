import React from 'react';
import { PropTypes } from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { ShopBySizeLink, ShopBySizeContainer } from '../ShopBySize.style';

/**
 * @function navigateFromL2 populates the L3 menu or PLP page for the L1 link that has been clicked
 * @param {object} subCats Details of the L2 menu item that has been clicked
 * @param {object} hasL3 flag that defines if L3 is present for the L2
 */
const navigateFromL2 = (navigate, subCats, hasL3) => {
  if (hasL3) {
    return navigate('NavMenuLevel3');
  }
  return navigate('productListingPage');
};

/**
 * @function shopBySizeCircle populates the circular links for shop by size
 * @param {object} links shop by size links
 */
const ShopBySize = ({ navigate, links, hasL3 }) => {
  console.log('links', links);
  return (
    <ShopBySizeContainer>
      {links.map(linkItem => {
        return (
          <ShopBySizeLink
            accessibilityRole="button"
            onPress={() => navigateFromL2(navigate, linkItem.url, hasL3)}
          >
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs18"
              text={linkItem.text}
              color="text.primary"
            />
          </ShopBySizeLink>
        );
      })}
    </ShopBySizeContainer>
  );
};

ShopBySize.propTypes = {
  navigate: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  hasL3: PropTypes.bool,
};

ShopBySize.defaultProps = {
  hasL3: false,
};

export default ShopBySize;
