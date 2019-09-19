import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from '../../../atoms';
import { getLocator } from '../../../../../utils';
import { Heading } from '../../../../../../styles/themes/TCP/typotheme';

/**
 * @function moduleHHeader This function renders header of Module H
 * @param {headerText} headerText Header text lines and link data
 */
const moduleHHeader = ({ headerText: [{ link, textItems }] }) =>
  textItems.map((textLine, index) => {
    return (
      <Heading
        key={index.toString()}
        className="moduleH__header"
        data-locator={`${getLocator('moduleH_header_text')}${index + 1}`}
        HeadingLarge="three"
        HeadingcolorSm="secondary"
        tag="h2"
      >
        {link ? (
          <Anchor className="moduleH__header-link" to={link.url} target={link.target}>
            {textLine.text}
          </Anchor>
        ) : (
          textLine.text
        )}
      </Heading>
    );
  });

moduleHHeader.propTypes = {
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ).isRequired,
};

export default moduleHHeader;
