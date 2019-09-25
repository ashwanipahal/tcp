import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLocator } from '@tcp/core/src/utils';
import style from '../LegalLinks.style';

const LegalLinks = ({ className, links }) => (
  <React.Fragment>
    <ul className={className}>
      {links.map((link, index) => (
        <li key={index.toString()} data-locator={`${getLocator('legal_links')}${index}`}>
          <Anchor anchorVariation="primary" to={link.url} target={link.target} title={link.title}>
            {link.text}
          </Anchor>
        </li>
      ))}
    </ul>
  </React.Fragment>
);

LegalLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.text,
    })
  ),
  className: PropTypes.string.isRequired,
};

LegalLinks.defaultProps = {
  links: [],
};

export { LegalLinks as LegalLinksVanilla };
export default withStyles(LegalLinks, style);
