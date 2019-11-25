import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Anchor from '../../../atoms/Anchor';
import WebViewModal from '../../WebViewModal';
import LegalLinksContainer, { AnchorStyles } from '../styles/LegalLinks.style.native';
import withStyles from '../../../hoc/withStyles';

const AnchorView = withStyles(Anchor, AnchorStyles);

class LegalLinks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggleModal: false,
      webUrl: '',
    };
  }

  toggleWebViewModal = webUri => {
    this.setState(state => ({
      toggleModal: !state.toggleModal,
      webUrl: webUri,
    }));
  };

  render() {
    const { links } = this.props;
    const { toggleModal, webUrl } = this.state;

    return (
      <LegalLinksContainer>
        {links.length > 0 &&
          links.map(link => {
            const {
              leafLink: { text, url: webUri, target },
            } = link;
            const onClickProps = {
              onPress: () => this.toggleWebViewModal(webUri),
            };
            return (
              <AnchorView
                text={text}
                anchorVariation="grayed"
                fontSizeVariation="medium"
                {...(target === '_self' ? onClickProps : { url: webUri })}
              />
            );
          })}
        {toggleModal && (
          <WebViewModal
            openState={toggleModal}
            toggleModalHandler={this.toggleWebViewModal}
            webViewProps={{
              source: {
                uri: webUrl,
              },
            }}
          />
        )}
      </LegalLinksContainer>
    );
  }
}

LegalLinks.propTypes = {
  links: PropTypes.shape([]),
};

LegalLinks.defaultProps = {
  links: [],
};

export default LegalLinks;
