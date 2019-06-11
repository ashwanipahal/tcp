import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';

const LegalLinks = ({ links }) => (
  <React.Fragment>
    <ul>
      {links.map(link => (
        <li>
          <Anchor to={link.url}>{link.text}</Anchor>
        </li>
      ))}
    </ul>
  </React.Fragment>
);

LegalLinks.propTypes = {
  links: PropTypes.arrayOf,
};

LegalLinks.defaultProps = {
  links: [],
};

export default LegalLinks;
