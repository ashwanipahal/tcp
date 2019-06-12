import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../LegalLinks.style';

const LegalLinks = ({ className, links }) => (
  <React.Fragment>
    <ul className={className}>
      {links.map(link => (
        <li data-locator={link.locator}>
          <Anchor anchorVariation="primary" to={link.url}>
            {link.text}
          </Anchor>
        </li>
      ))}
    </ul>
  </React.Fragment>
);

LegalLinks.propTypes = {
  links: PropTypes.arrayOf,
  className: PropTypes.string.isRequired,
};

LegalLinks.defaultProps = {
  links: [],
};

export { LegalLinks as LegalLinksVanilla };
export default withStyles(LegalLinks, style);
