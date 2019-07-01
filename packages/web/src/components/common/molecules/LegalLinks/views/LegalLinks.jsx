import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLocator } from '@tcp/core/src/utils';
import style from '../LegalLinks.style';

const LegalLinks = ({ className, links }) => (
  <React.Fragment>
    <ul className={className}>
      {links.map(link => (
        <li data-locator={getLocator(link.name)}>
          <Anchor anchorVariation="primary" to={link.url} target={link.target}>
            {link.title}
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
