import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, RichText } from '../../../atoms';
import AccordionList from '../../AccordionList';

/**
 * To render the Accordian Module and will be configured from CMS
 * @param {*} props
 */
const AccordianModule = props => {
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
        <AccordionList accordionItems={accordionItems}>
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

AccordianModule.propTypes = {
  className: PropTypes.string.isRequired,
  accordionWrapper: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.shape({}))).isRequired,
};

export default AccordianModule;
export { AccordianModule as AccordianModuleVanilla };
