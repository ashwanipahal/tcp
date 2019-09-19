import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import ModalNative from '../../../Modal/view/Modal.native';

class ApplyNowModalWrapper extends React.PureComponent {
  onClose = () => {
    const { setLoginModalMountState } = this.props;
    setLoginModalMountState({ state: false });
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const fullWidth = {
      width: '100%',
    };
    // eslint-disable-next-line react/prop-types
    const { labels, applyNow, toggleModalWrapper } = this.props;

    console.info('>>>>labels---', labels);

    return (
      <ModalNative
        onRequestClose={toggleModalWrapper}
        horizontalBar={false}
        headingAlign="center"
        headingFontFamily="secondary"
        fontSize="fs22"
        headerStyle={fullWidth}
        isOpen={applyNow}
      >
        <Text>Hello</Text>
      </ModalNative>
    );
  }
}

ApplyNowModalWrapper.propTypes = {
  setLoginModalMountState: PropTypes.bool.isRequired,
  labels: PropTypes.shape({
    apply_now_link_modal: PropTypes.string,
  }).isRequired,
  toggleModalWrapper: PropTypes.func.isRequired,
};

export default ApplyNowModalWrapper;
