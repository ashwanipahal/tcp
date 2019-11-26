// @flow
import React from 'react';
import BodyCopy from '../../../atoms/BodyCopy';

type Props = {
  className: string,
  updateAccordionState: Function,
  index: number,
  titleText: string,
  appliedFilterComponent: Object,
  filterLength: number,
};

const AccordionHeader = ({
  className,
  titleText,
  updateAccordionState,
  index,
  appliedFilterComponent,
  filterLength,
}: Props) => {
  return (
    // eslint-disable-next-line
    <>
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
        {filterLength && filterLength > 0 ? (
          <BodyCopy
            className="filter-count"
            data-index={index}
            component="span"
            fontFamily="secondary"
            fontSize="fs13"
            lineHeight="lh115"
            color="text.primary"
          >
            {`(${filterLength})`}
          </BodyCopy>
        ) : null}
      </BodyCopy>

      {appliedFilterComponent && appliedFilterComponent[titleText]}
    </>
  );
};

export default AccordionHeader;
