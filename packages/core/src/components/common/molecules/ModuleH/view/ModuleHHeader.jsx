import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Heading } from '../../../../../../styles/themes/TCP/typotheme';

const moduleHHeader = ({ headerText }) => (
  <Fragment>
    {headerText.map((textLine, index) => {
      return (
        <Heading
          key={index.toString()}
          className="moduleH__header"
          HeadingLarge="three"
          HeadingcolorSm="primary"
          tag="h2"
        >
          {textLine.text}
        </Heading>
      );
    })}
  </Fragment>
);

moduleHHeader.propTypes = {
  headerText: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired,
};

export default moduleHHeader;
