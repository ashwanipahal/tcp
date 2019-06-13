// @flow
import React from 'react';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import Image from '@tcp/core/src/components/common/atoms/Image';
import styles from '../FooterNavHeader.style';
import withStyles from '../../../../common/hoc/withStyles';

type Props = {
  className: string,
  ariaLabel: string,
  headerAsImage: boolean,
  index: number,
  titleText: string,
  titleObj: object,
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
      <h1 className={className} aria-label={ariaLabel} data-index={index}>
        {titleText}
      </h1>
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
