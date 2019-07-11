import React from 'react';
import PropTypes from 'prop-types';
import Image from '@tcp/core/src/components/common/atoms/Image';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getIconPath, getLocator } from '@tcp/core/src/utils';
import style from '../SocialMediaLinks.style';

const SocialMediaLinks = ({ className, connectWithUsLabel, links }) => (
  <React.Fragment>
    <div className={className}>
      <BodyCopy
        data-locator={getLocator('label-connect-with-us')}
        component="span"
        fontFamily={['secondary', 'primary']}
        fontSize={['fs12', 'fs10', 'fs12']}
        fontWeight={['normal', 'black']}
        lineHeight="normal"
        letterSpacing="normal"
        textAlign="center"
        color="text.secondary"
      >
        {connectWithUsLabel}
      </BodyCopy>
      <div className="social-media-pallete">
        {links.map((link, index) => {
          return (
            <Anchor to={link.url} target={link.target}>
              <Image
                className="social-media-icon"
                data-locator={`${getLocator('social_media_links')}${index}`}
                src={getIconPath(link.class)}
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

export { SocialMediaLinks as SocialMediaLinksVanilla };
export default withStyles(SocialMediaLinks, style);
