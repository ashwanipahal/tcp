import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Anchor from '../../../atoms/Anchor';
import LegalLinksContainer, { AnchorStyles } from '../styles/LegalLinks.style.native';
import withStyles from '../../../hoc/withStyles';

const AnchorView = withStyles(Anchor, AnchorStyles);

class LegalLinks extends PureComponent {
  render() {
    const { links, navigation } = this.props;
    return (
      <LegalLinksContainer>
        {links.length > 0 &&
          links.map(link => {
            const {
              leafLink: { text, url: webUri, target },
            } = link;
            return (
              <AnchorView
                text={text}
                anchorVariation="grayed"
                fontSizeVariation="medium"
                url={webUri}
                {...(target === '_self' ? { openWebView: true, navigation } : '')}
              />
            );
          })}
      </LegalLinksContainer>
    );
  }
}

LegalLinks.propTypes = {
  links: PropTypes.shape([]),
  navigation: PropTypes.shape({}).isRequired,
};

LegalLinks.defaultProps = {
  links: [],
};

export default LegalLinks;
