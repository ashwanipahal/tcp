// @flow
import React, { Fragment } from 'react';
import type { Node } from 'react';
import AccordionHeader from '../AccordionHeader';

import styles from './Accordion.style';
import withStyles from '../../hoc/withStyles';

type Props = {
  className: string,
  titleText: string,
  listArray: object[],
  updateAccordionState: func,
  index: number,
  children: Node,
};

const Accordion = ({
  className,
  titleText,
  listArray,
  updateAccordionState,
  index,
  children,
}: Props) => {
  const activeClass = listArray && listArray.length ? 'inactive' : 'active';

  return (
    <Fragment>
      <AccordionHeader
        className={`${className} accordion ${activeClass}`}
        titleText={titleText}
        updateAccordionState={updateAccordionState}
        index={index}
      />
      {children}
    </Fragment>
  );
};

export default withStyles(Accordion, styles);

export { Accordion as AccordionVanilla };
