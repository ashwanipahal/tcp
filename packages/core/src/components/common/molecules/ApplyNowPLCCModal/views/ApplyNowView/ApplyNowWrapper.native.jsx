import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button } from '../../../../atoms';
import ModalNative from '../../../Modal/view/Modal.native';
import {
  ImageContainer,
  StyledBodyCopy,
  ScrollViewContainer,
  ButtonWrapper,
} from '../../styles/ApplyNowView.style.native';
import { getLabelValue } from '../../../../../../utils/utils';

const headerImage = require('../../../../../../assets/tcp-cc.png');

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
        <ScrollViewContainer>
          <StyledBodyCopy
            color="gray.900"
            mobilefontFamily="primary"
            fontSize="fs36"
            textAlign="center"
            fontWeight="black"
            text={getLabelValue(labels, 'apply_now_header')}
            paddingTop="30px"
          />

          <ImageContainer>
            <Image source={headerImage} width="45%" height="112px" />
          </ImageContainer>

          <StyledBodyCopy
            color="gray.900"
            fontFamily="secondary"
            fontSize="fs14"
            textAlign="center"
            text={getLabelValue(labels, 'apply_now_subheader')}
            paddingTop="9px"
          />
          <ButtonWrapper>
            <Button
              fill="BLUE"
              type="submit"
              color="white"
              buttonVariation="variable-width"
              text="SUBMIT TO OPEN AN ACCOUNT"
              width="90%"
            />
          </ButtonWrapper>
        </ScrollViewContainer>
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
