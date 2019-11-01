import React from 'react';
import { PropTypes } from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { ShopBySizeLink, ShopBySizeContainer } from '../ShopBySize.style';
import { navigateFromL2 } from '../../../utils';

/**
 * @function shopBySize populates the circular links for shop by size
 * @param {object} links shop by size links
 */
const ShopBySize = ({ navigate, links, hasL3, accessibilityLabels }) => {
  if (!links) {
    return null;
  }
  return (
    <ShopBySizeContainer>
      {links.map(linkItem => {
        return linkItem ? (
          <ShopBySizeLink
            accessibilityRole="button"
            onPress={() =>
              navigateFromL2(
                navigate,
                null,
                linkItem.text,
                hasL3,
                accessibilityLabels,
                linkItem.url
              )
            }
          >
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs18"
              text={linkItem.text}
              color="text.primary"
            />
          </ShopBySizeLink>
        ) : null;
      })}
    </ShopBySizeContainer>
  );
};

ShopBySize.propTypes = {
  navigate: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  hasL3: PropTypes.bool,
  accessibilityLabels: PropTypes.string.isRequired,
};

ShopBySize.defaultProps = {
  hasL3: false,
};

export default ShopBySize;
