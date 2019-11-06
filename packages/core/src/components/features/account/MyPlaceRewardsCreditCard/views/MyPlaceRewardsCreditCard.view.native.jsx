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
