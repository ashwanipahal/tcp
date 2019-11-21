import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import { getAPIConfig, richTextRoute } from '@tcp/core/src/utils';

class Espot extends PureComponent {
  onClickHandler = (link, target, action) => {
    const { togglePlccModal, openOverlay } = this.props;
    const externalUrl = new RegExp('^(?:[a-z]+:)?//', 'i');
    const { assetHost } = getAPIConfig();

    switch (target) {
      case '_modal':
        switch (action) {
          case 'plccModal':
            togglePlccModal(true);
            break;
          case 'login':
            openOverlay({
              component: 'login',
              variation: 'primary',
            });
            break;
          case 'create-account':
            openOverlay({
              component: 'createAccount',
              variation: 'primary',
            });
            break;

          default:
            break;
        }
        break;
      default:
        if (externalUrl.test(link)) {
          window.open(link, '_blank');
        } else {
          switch (target) {
            case '_self':
              richTextRoute(link);
              break;
            case '_blank':
              window.open(`${assetHost}${link}`, '_blank');
              break;
            default:
              break;
          }
        }
        break;
    }
  };

  render() {
    const { richTextHtml } = this.props;
    return (
      <div>
        <RichText richTextHtml={richTextHtml} isNativeView actionHandler={this.onClickHandler} />
      </div>
    );
  }
}

Espot.propTypes = {
  togglePlccModal: PropTypes.func.isRequired,
  richTextHtml: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
};

export default Espot;
