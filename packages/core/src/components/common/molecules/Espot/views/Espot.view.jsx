import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import { richTextRoute } from '@tcp/core/src/utils';

class Espot extends PureComponent {
  onClickHandler = action => {
    const { togglePlccModal, openOverlay } = this.props;
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
        richTextRoute(action);
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
