// @flow
import React, { Fragment } from 'react';
import type { Node } from 'react';
import AccordionHeader from '../../AccordionHeader';

import styles from '../AccordionItem.style';
import withStyles from '../../../hoc/withStyles';

type Props = {
  className: string,
  titleText: string,
  updateAccordionState: Function,
  index: number,
  children: Node,
  activeClass: string,
};

/**
 * @function AccordionItem The accordion component accepts the header
 * title which would go in the accordion header and a body of the accordion
 * as is passed in the children of the accordion.
 * @param {string} className The class name for the component
 * @param {string} titleText The title text for the accordion header
 * @param {array} listArray The array of list to determine the active or inactive state
 * @param {number} index The index of the accordion in the accordion list.
 * @param {node} children The children node for the accordion as passed on the accordionList.
 */
const AccordionItem = ({
  className,
  titleText,
  updateAccordionState,
  index,
  children,
  activeClass,
}: Props) => {
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

export default withStyles(AccordionItem, styles);
export { AccordionItem as AccordionVanilla };
