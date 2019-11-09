import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RichText from '@tcp/core/src/components/common/atoms/RichText';

class Espot extends PureComponent {
  onClickHandler = action => {
    const { togglePlccModal } = this.props;
    switch (action) {
      case 'plccModal':
        togglePlccModal(true);
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
      </div>
    );
  }
}

Espot.propTypes = {
  togglePlccModal: PropTypes.func.isRequired,
  richTextHtml: PropTypes.string.isRequired,
};

export default Espot;
