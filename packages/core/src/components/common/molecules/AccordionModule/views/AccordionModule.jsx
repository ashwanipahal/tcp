import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import style from '../AccordionModule.style';
import { Row, Col, RichText } from '../../../atoms';
import AccordionList from '../../AccordionList';

/**
 * To render the Accordian Module and will be configured from CMS
 * @param {*} props
 */
const AccordionModule = props => {
  const { className, accordionWrapper } = props;
  const accordionItems = [];
  if (accordionWrapper && accordionWrapper.length > 0) {
    accordionWrapper.map(({ styled }) => {
      const isItemPresent = styled && styled.text;
      if (isItemPresent) {
        const titleKey = {
          header: {
            title: styled.text,
          },
        };
        accordionItems.push(titleKey);
      }
      return false;
    });
  }

  return accordionWrapper ? (
    <Row fullBleed className={className}>
      <Col
        colSize={{
          small: 6,
          medium: 8,
          large: 12,
        }}
      >
        <AccordionList accordionItems={accordionItems} className="module-accordion">
          {accordionWrapper.map(({ richText }) => {
            if (!(richText && richText.text)) {
              return null;
            }
            return <RichText className="congrats_msg" richTextHtml={richText.text} />;
          })}
        </AccordionList>
      </Col>
    </Row>
  ) : null;
};

AccordionModule.propTypes = {
  className: PropTypes.string.isRequired,
  accordionWrapper: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.shape({}))).isRequired,
};

export default withStyles(AccordionModule, style);
export { AccordionModule as AccordionModuleVanilla };
