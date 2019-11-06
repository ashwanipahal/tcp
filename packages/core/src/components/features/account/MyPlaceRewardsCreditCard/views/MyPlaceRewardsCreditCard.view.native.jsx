import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getLabelValue, getLocator } from '@tcp/core/src/utils/utils';
import { StyledHeading } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { BodyCopy, Button, Anchor, Row, Col } from '../../../../common/atoms';
import {
  ImageContainer,
  StyledBodyCopy,
  ScrollViewContainer,
  ButtonWrapper,
  StyledAnchor,
  BottomContainer,
  RichTextContainer,
  Container,
  StyledImage,
  HeaderContainer,
  UnderlineStyle
} from '../styles/MyPlaceRewardsCreditCard.style.native';
const headerImage = require('../../../../../../../core/src/assets/tcp-cc.png');

export class MyPlaceRewardsCreditCard extends PureComponent {

  render() {
    const { labels, className, isPLCCModalOpen, openPLCCModal } = this.props;
    return (
      <>
        <StyledHeading>
          <BodyCopy
            fontSize="fs16"
            fontWeight="extrabold"
            text={getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
          />
        </StyledHeading>

        <UnderlineStyle />

        <HeaderContainer>
          <StyledBodyCopy
            color="gray.900"
            mobilefontFamily="primary"
            fontSize="fs38"
            textAlign="center"
            fontWeight="black"
            text={getLabelValue(labels, 'lbl_PLCCModal_applyNowHeaderText')}
            paddingTop="30px"
          />
          <StyledBodyCopy
            color="gray.900"
            mobilefontFamily="primary"
            fontSize="fs15"
            fontWeight="black"
            text={getLabelValue(labels, 'lbl_PLCCModal_applyNowHeaderTextSuffix')}
            paddingTop="5px"
          />
        </HeaderContainer>

        <ImageContainer>
          <StyledImage source={headerImage} width="45%" height="112px" />
        </ImageContainer>
        <StyledBodyCopy
          color="gray.900"
          fontFamily="secondary"
          fontSize="fs14"
          textAlign="center"
          text={getLabelValue(labels, 'lbl_PLCCModal_applyNowSubText')}
          paddingTop="9px"
          paddingLeft="12px"
          paddingRight="12px"
        />
        <ButtonWrapper>
          <Button
            fill="BLUE"
            type="submit"
            color="white"
            text={getLabelValue(labels, 'lbl_PLCCModal_applyNowCTA')}
            width="90%"
            onPress={this.closeModal}
          />
        </ButtonWrapper>
      </>
    )
  }
}

MyPlaceRewardsCreditCard.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string.isRequired,
  isPLCCModalOpen: PropTypes.bool,
  openPLCCModal: PropTypes.func.isRequired,
};

MyPlaceRewardsCreditCard.defaultProps = {
  labels: {},
  isPLCCModalOpen: false,
};

export default MyPlaceRewardsCreditCard;
