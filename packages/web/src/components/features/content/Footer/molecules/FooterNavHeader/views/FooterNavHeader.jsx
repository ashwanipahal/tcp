import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getIconPath } from '@tcp/core/src/utils';
import styles from '../FooterNavHeader.style';

const FooterNavHeader = ({
  className,
  titleText,
  titleObj,
  ariaLabel,
  headerAsImage,
  isSubHeader,
  colNum,
}) => {
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
    <Anchor
      to={titleObj.url}
      className={`${className} img-link`}
      data-locator={`col_heading_${colNum}`}
    >
      <Image alt={titleObj.image_alt} src={getIconPath(titleObj.class)} />
    </Anchor>
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
