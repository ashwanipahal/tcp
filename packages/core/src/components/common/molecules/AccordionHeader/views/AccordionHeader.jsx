// @flow
import React from 'react';
import BodyCopy from '../../../atoms/BodyCopy';

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
      lineHeight="lh115"
      color="text.primary"
    >
      {titleText}
    </BodyCopy>
  );
};

export default AccordionHeader;
