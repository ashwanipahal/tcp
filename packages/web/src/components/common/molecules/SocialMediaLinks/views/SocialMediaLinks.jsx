import React from 'react';
import PropTypes from 'prop-types';
import Image from '@tcp/core/src/components/common/atoms/Image';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getIconPath, getLocator } from '../../../../../utils';
import style from '../SocialMediaLinks.style';

const SocialMediaLinks = ({ className, connectWithUsLabel, links }) => (
  <React.Fragment>
    <div className={className}>
      <span className="social-media-label" data-locator={getLocator('label-connect-with-us')}>
        {connectWithUsLabel}
      </span>
      <div className="social-media-pallete">
        {links.map(link => {
          return (
            <Anchor to={link.url}>
              <Image
                className="social-media-icon"
                data-locator={getLocator(link.iconClass)}
                src={getIconPath(link.iconClass)}
                alt={link.title}
              />
            </Anchor>
          );
        })}
      </div>
    </div>
  </React.Fragment>
);

SocialMediaLinks.propTypes = {
  className: PropTypes.string.isRequired,
  connectWithUsLabel: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      icon_class: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};

SocialMediaLinks.defaultProps = {
  connectWithUsLabel: '',
  links: [],
};

export default withStyles(SocialMediaLinks, style);
