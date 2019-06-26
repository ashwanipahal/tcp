import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Anchor } from '../../../atoms';
import { Heading } from '../../../../../../styles/themes/TCP/typotheme';

const moduleHHeader = ({ headerText }) => {
  const { link, textLines } = headerText;

  return (
    <Fragment>
      {textLines.map((textLine, index) => {
        return (
          <Heading
            key={index.toString()}
            className="moduleH__header"
            HeadingLarge="three"
            HeadingcolorSm="primary"
            tag="h2"
          >
            {link.url !== '' ? (
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
};

moduleHHeader.propTypes = {
  headerText: PropTypes.shape({}).isRequired,
};

export default moduleHHeader;
