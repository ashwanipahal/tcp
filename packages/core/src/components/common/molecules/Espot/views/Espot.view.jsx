import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import ApplyNowPLCCModal from '@tcp/core/src/components/common/molecules/ApplyNowPLCCModal';

class Espot extends PureComponent {
  onClickHandler = action => {
    const { openApplyNowModal } = this.props;
    switch (action) {
      case 'applyNow':
        openApplyNowModal();
        break;
      default:
        break;
    }
  };

  render() {
    const { richTextHtml } = this.props;
    return (
      <div>
        <RichText richTextHtml={richTextHtml} isNativeView actionHandler={this.onClickHandler} />
        <ApplyNowPLCCModal noLink />
      </div>
    );
  }
}

Espot.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  openApplyNowModal: PropTypes.func.isRequired,
  richTextHtml: PropTypes.func,
};

Espot.defaultProps = {
  richTextHtml: '',
};

export default Espot;
