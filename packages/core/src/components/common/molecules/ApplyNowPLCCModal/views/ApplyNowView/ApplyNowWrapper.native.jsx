import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button } from '../../../../atoms';
import ModalNative from '../../../Modal/view/Modal.native';
import {
  ImageContainer,
  StyledBodyCopy,
  ScrollViewContainer,
  ButtonWrapper,
  StyledAnchor,
} from '../../styles/ApplyNowView.style.native';
import { getLabelValue } from '../../../../../../utils/utils';
import ApplyCardLayout from '../../../../../features/browse/ApplyCardPage/views/ApplyCardLayout.View.native';

const headerImage = require('../../../../../../assets/tcp-cc.png');
const PLCC_LOOKUP_2_POINTS = require('../../../../../../assets/PLCC_lockup_2_points.png');
const PLCC_LOOKUP_1_POINTS = require('../../../../../../assets/PLCC_lockup_1_points.png');

class ApplyNowModalWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      applyCard: false,
    };
  }

  toggleApplyCard = () => {
    const { applyCard } = this.state;
    this.setState({
      applyCard: !applyCard,
    });
  };

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
    const { applyCard } = this.state;

    console.info('>>>>labels---', getLabelValue(labels, 'oneequalstwopointsoffer'));
    console.info(
      '>>>>apply_now_benefits_header---',
      getLabelValue(labels, 'apply_now_benefits_header')
    );
    console.info('>>>>labels---', getLabelValue(labels, 'oneequalstwopointsoffer'));

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
              text={getLabelValue(labels, 'applynow_cta')}
              width="90%"
              onPress={this.toggleApplyCard}
            />
          </ButtonWrapper>
          <ApplyCardLayout toggleModal={this.toggleApplyCard} applyCard={applyCard} />
          <StyledAnchor
            url={getLabelValue(labels, 'learn_more_link')}
            fontSizeVariation="large"
            anchorVariation="secondary"
            underline
            text={getLabelValue(labels, 'apply_now_learn_more')}
            paddingTop="23px"
          />
          <ImageContainer>
            <Image source={PLCC_LOOKUP_1_POINTS} width="90%" height="60px" />

            <Image source={PLCC_LOOKUP_2_POINTS} width="90%" height="60px" />
          </ImageContainer>
          <StyledBodyCopy
            mobilefontFamily="primary"
            fontSize="fs28"
            fontWeight="black"
            textAlign="center"
            color="text.secondary"
            text={getLabelValue(labels, 'apply_now_benefits_header')}
            paddingTop="9px"
          />
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
