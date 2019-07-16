// @flow
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Anchor } from '../../../atoms';
import { getLocator } from '../../../../../utils';
import { Heading } from '../../../../../../styles/themes/TCP/typotheme';

type Props = {
  headerText: Object,
};

/**
 * @function moduleHHeader This function renders header of Module H
 * @param {headerText} headerText Header text lines and link data
 */
const moduleHHeader = ({ headerText: { link, textLines } }: Props) => (
  <Fragment>
    {textLines.map((textLine, index) => {
      return (
        <Heading
          key={index.toString()}
          className="moduleH__header"
          data-locator={getLocator('moduleH_header_text')}
          HeadingLarge="three"
          HeadingcolorSm="primary"
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
    })}
  </Fragment>
);

moduleHHeader.propTypes = {
  headerText: PropTypes.shape({}).isRequired,
};

export default moduleHHeader;
