import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getIconPath, isCanada } from '@tcp/core/src/utils';
import styles from '../FooterNavHeader.style';
import ClickTracker from '../../../../../../common/atoms/ClickTracker';

const FooterNavHeader = ({
  className,
  titleText,
  titleObj,
  ariaLabel,
  headerAsImage,
  isSubHeader,
  colNum,
}) => {
  const formattedSiteId = isCanada() ? '-CA' : '';
  const pageInfo = 'home page';
  if (!headerAsImage) {
    return (
      <BodyCopy
        className={!isSubHeader ? className : `${className} subHeader`}
        aria-label={ariaLabel}
        data-index={colNum}
        data-locator={`col_heading_${colNum}`}
        component="p"
        fontFamily="secondary"
        fontWeight="semibold"
        fontSize="fs16"
        color="text.primary"
      >
        {titleText}
      </BodyCopy>
    );
  }
  return (
    <ClickTracker
      as={Anchor}
      to={titleObj.url}
      aria-label={titleText}
      className={`${className} img-link`}
      dataLocator={`col_heading_${colNum}`}
      clickData={{
        eventName: 'loyaltyclick',
        pageType: pageInfo,
        pageSection: pageInfo,
        pageSubSection: pageInfo,
      }}
    >
      <Image
        tabIndex="-1"
        aria-hidden="true"
        alt={titleObj.image_alt}
        src={getIconPath(`${titleObj.class}${formattedSiteId}`)}
      />
    </ClickTracker>
  );
};

FooterNavHeader.propTypes = {
  className: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  headerAsImage: PropTypes.bool.isRequired,
  colNum: PropTypes.number.isRequired,
  titleText: PropTypes.string.isRequired,
  titleObj: PropTypes.shape({}).isRequired,
  isSubHeader: PropTypes.bool.isRequired,
};

export default withStyles(FooterNavHeader, styles);

export { FooterNavHeader as FooterNavHeaderVanilla };
