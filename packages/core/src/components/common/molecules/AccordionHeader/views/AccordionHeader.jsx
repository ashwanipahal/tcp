// @flow
import React from 'react';
import styles from '../AccordionHeader.style';
import withStyles from '../../../hoc/withStyles';

type Props = {
  className: string,
  updateAccordionState: Function,
  index: number,
  titleText: string,
};

const AccordionHeader = ({ className, titleText, updateAccordionState, index }: Props) => {
  return (
    // eslint-disable-next-line
    <h4
      className={className}
      onClick={updateAccordionState}
      onKeyPress={updateAccordionState}
      data-index={index}
    >
      {titleText}
    </h4>
  );
};

export default withStyles(AccordionHeader, styles);

export { AccordionHeader as AccordionHeaderVanilla };
