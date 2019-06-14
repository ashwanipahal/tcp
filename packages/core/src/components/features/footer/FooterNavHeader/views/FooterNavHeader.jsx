// @flow
import React from 'react';
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
};

const FooterNavHeader = ({
  className,
  titleText,
  titleObj,
  ariaLabel,
  headerAsImage,
  index,
}: Props) => {
  if (!headerAsImage) {
    return (
      <h4 className={className} aria-label={ariaLabel} data-index={index}>
        {titleText}
      </h4>
    );
  }
  return (
    <Anchor to={titleObj.url} className={`${className} img-link`}>
      <Image alt src={`/static/images/${titleObj.image_url}`} />
    </Anchor>
  );
};

export default withStyles(FooterNavHeader, styles);

export { FooterNavHeader as FooterNavHeaderVanilla };
