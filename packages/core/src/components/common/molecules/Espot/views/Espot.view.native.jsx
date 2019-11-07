import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import ApplyNowPLCCModal from '@tcp/core/src/components/common/molecules/ApplyNowPLCCModal';

class Espot extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPlccModal: false,
    };
  }

  onPressHandler = action => {
    switch (action) {
      case 'plccModal':
        this.togglePlccModal();
        break;
      default:
        break;
    }
  };

  togglePlccModal() {
    const { showPlccModal } = this.state;
    this.setState({
      showPlccModal: !showPlccModal,
    });
  }

  render() {
    const { richTextHtml } = this.props;
    const { showPlccModal } = this.state;
    return (
      <View>
        <RichText
          source={richTextHtml.replace(/(\d+)px;/g, '$1')}
          isNativeView
          actionHandler={this.onPressHandler}
        />
        <ApplyNowPLCCModal
          applyNow={showPlccModal}
          toggleModalWrapper={() => {
            this.togglePlccModal();
          }}
        />
      </View>
    );
  }
}

Espot.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  richTextHtml: PropTypes.func,
};

Espot.defaultProps = {
  richTextHtml: '',
};

export default Espot;
