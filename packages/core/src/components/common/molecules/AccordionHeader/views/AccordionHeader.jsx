// @flow
// TODO - fix the linting issue
/* eslint-disable */
import React, { Fragment } from 'react';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import Image from '@tcp/core/src/components/common/atoms/Image';
import styles from '../AccordionHeader.style';
import withStyles from '../../../../common/hoc/withStyles';

type Props = {
  className: string,
  ariaLabel: string,
  updateAccordionState: func,
  index: number,
  titleText: string,
};

const FooterNavHeader = ({
  className,
  titleText,
  ariaLabel,
  updateAccordionState,
  headerAsImage,
  index,
}: Props) => {
  return (
    <h1
      className={className}
      aria-label={ariaLabel}
      onClick={updateAccordionState}
      onKeyPress={updateAccordionState}
      data-index={index}
    >
      {titleText}
    </h1>
  );
};

export default withStyles(FooterNavHeader, styles);

export { FooterNavHeader as FooterNavHeaderVanilla };
