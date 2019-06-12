// @flow
// TODO - fix the linting issue
/* eslint-disable */
import React, { Fragment } from 'react';
import styles from '../FooterNavHeader.style';
import withStyles from '../../../../common/hoc/withStyles';

type Props = {
  className: string,
  ariaLabel: string,
  updateAccordionState: func,
  index: number,
  titleText: string,
  titleObj: object,
};

const FooterNavHeader = ({
  className,
  titleText,
  titleObj,
  ariaLabel,
  updateAccordionState,
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
