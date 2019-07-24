// @flow
import React from 'react';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import { getIconPath } from '../../../../../utils';
import Anchor from '../../../../common/atoms/Anchor';
import Image from '../../../../common/atoms/Image';
import styles from '../FooterNavHeader.style';
import withStyles from '../../../../common/hoc/withStyles';

type Props = {
  className: string,
  ariaLabel: string,
  headerAsImage: boolean,
  colNum: number,
  titleText: string,
  titleObj: Object,
  isSubHeader: boolean,
};

const FooterNavHeader = ({
  className,
  titleText,
  titleObj,
  ariaLabel,
  headerAsImage,
  isSubHeader,
  colNum,
}: Props) => {
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
      dataLocator={`col_heading_${colNum}`}
    >
      <Image alt={titleObj.image_alt} src={getIconPath(titleObj.class)} />
    </Anchor>
  );
};

export default withStyles(FooterNavHeader, styles);

export { FooterNavHeader as FooterNavHeaderVanilla };
