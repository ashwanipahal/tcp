// @flow
import React from 'react';
import { getIconPath } from '../../../../../utils';
import Anchor from '../../../../common/atoms/Anchor';
import Image from '../../../../common/atoms/Image';
import styles from '../FooterNavHeader.style';
import withStyles from '../../../../common/hoc/withStyles';

type Props = {
  className: string,
  ariaLabel: string,
  headerAsImage: boolean,
  index: number,
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
  index,
}: Props) => {
  if (!headerAsImage) {
    return (
      <h4
        className={!isSubHeader ? className : `${className} subHeader`}
        aria-label={ariaLabel}
        data-index={index}
      >
        {titleText}
      </h4>
    );
  }
  return (
    <Anchor to={titleObj.url} className={`${className} img-link`} data-locator={titleObj.url}>
      <Image alt={titleObj.image_alt} src={getIconPath(titleObj.class)} />
    </Anchor>
  );
};

export default withStyles(FooterNavHeader, styles);

export { FooterNavHeader as FooterNavHeaderVanilla };
