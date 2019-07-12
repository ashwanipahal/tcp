// @flow
import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
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
    <BodyCopy
      data-locator={`accordion-${index}`}
      // eslint-disable-next-line
      tabIndex="0"
      className={className}
      onClick={updateAccordionState}
      onKeyPress={updateAccordionState}
      data-index={index}
      component="p"
      fontFamily="secondary"
      fontSize="fs13"
      fontWeight="regular"
      lineHeight="lh115"
      letterSpacing="normal"
      color="text.primary"
    >
      {titleText}
    </BodyCopy>
  );
};

export default withStyles(AccordionHeader, styles);

export { AccordionHeader as AccordionHeaderVanilla };
