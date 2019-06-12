// @flow
import React from 'react';
import AccordionList from '../../../../common/molecules/AccordionList';
import Col from '../../../../common/atoms/Col';
import styles from '../FooterMiddle.style';
import withStyles from '../../../../common/hoc/withStyles';

type Props = {
  className: string,
  navLinkItems: object[],
};

const FooterNavHeader = ({ className, navLinkItems }: Props) => {
  return (
    <Col
      className="footer-middle__slot--1"
      colSize={{
        large: 12,
        medium: 8,
        small: 6,
      }}
    >
      <AccordionList className={className} accordionItems={navLinkItems} />
    </Col>
  );
};

export default withStyles(FooterNavHeader, styles);

export { FooterNavHeader as FooterNavHeaderVanilla };
