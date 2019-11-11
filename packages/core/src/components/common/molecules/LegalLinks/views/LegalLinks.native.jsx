import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '../../../atoms/Anchor';
import WebViewModal from '../../WebViewModal';
import LegalLinksRoot, { AnchorStyles } from '../styles/LegalLinks.style.native';
import withStyles from '../../../hoc/withStyles';

const AnchorView = withStyles(Anchor, AnchorStyles);

class LegalLinks extends React.Component {
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
      <LegalLinksRoot>
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
                anchorVariation="primary"
                fontSizeVariation="medium"
                url={target === '_blank' ? webUri : null}
                {...(target === '_modal' ? onClickProps : {})}
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
      </LegalLinksRoot>
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
