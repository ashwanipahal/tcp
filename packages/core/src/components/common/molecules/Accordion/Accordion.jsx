// @flow
import React, { Fragment } from 'react';
import FooterNavLinksList from '../../../features/footer/FooterNavLinksList';
import AccordionHeader from '../AccordionHeader';

import styles from './Accordion.style';
import withStyles from '../../hoc/withStyles';

type Props = {
  className: string,
  titleText: string,
  listArray: object[],
  updateAccordionState: func,
  index: number,
};

const Accordion = ({ className, titleText, listArray, updateAccordionState, index }: Props) => {
  const activeClass = listArray && listArray.length ? 'inactive' : 'active';

  return (
    <Fragment>
      <AccordionHeader
        className={`${className} accordion ${activeClass}`}
        titleText={titleText}
        updateAccordionState={updateAccordionState}
        index={index}
      />
      <FooterNavLinksList listArray={listArray} insideAcccordion />
    </Fragment>
  );
};

export default withStyles(Accordion, styles);

export { Accordion as AccordionVanilla };
