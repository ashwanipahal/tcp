// @flow
import React from 'react';
import styles from '../AccordionHeader.style';
import withStyles from '../../../hoc/withStyles';

type Props = {
  className: string,
  updateAccordionState: func,
  index: number,
  titleText: string,
};

const FooterNavHeader = ({ className, titleText, updateAccordionState, index }: Props) => {
  return (
    // eslint-disable-next-line
    <h1
      className={className}
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
