import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { UrlHandler } from '../../../../../../../utils/utils.app';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import {
  StyledBodyCopy,
  StyledAnchorWrapper,
  AnchorLeftMargin,
} from '../styles/MyRewards.style.native';
import Button from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';

const buttonStyle = { fontWeight: '400', marginBottom: 48 };

const MyRewards = ({ labels }) => {
  const heading = `${labels.myPlaceRewards.lbl_my_rewards_heading} (0)`;

  return (
    <View>
      <StyledBodyCopy>
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs16"
          fontWeight="semibold"
          data-locator="my-rewards-heading"
          text={heading}
        />
      </StyledBodyCopy>
      <StyledBodyCopy>
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          data-locator="no_rewards_msg"
          text={labels.myPlaceRewards.lbl_my_rewards_no_available_rewards}
        />
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          data-locator="no_rewards_msg"
          text={labels.myPlaceRewards.lbl_my_rewards_start_shopping}
        />
      </StyledBodyCopy>
      <Button
        buttonVariation="variable-width"
        fill="BLUE"
        color="white"
        data-locator="my-rewards-shop-now-btn"
        text={labels.myPlaceRewards.ACC_LBL_MY_REWARDS_SHOP_NOW}
        style={buttonStyle}
      />
      <StyledAnchorWrapper>
        <Anchor
          fontSizeVariation="small"
          underline
          onPress={() => {
            UrlHandler('https://www.childrensplace.com/us/content/myplace-rewards-page');
          }}
          anchorVariation="primary"
          data-locator="my-rewards-program-details"
          text={labels.myPlaceRewards.ACC_LBL_MY_REWARDS_PROGRAM_DETAILS}
        />
        <AnchorLeftMargin>
          <Anchor
            fontSizeVariation="small"
            underline
            noLink
            onPress={() => {
              UrlHandler('https://www.childrensplace.com/us/help-center/#termsAndConditionsli');
            }}
            anchorVariation="primary"
            data-locator="my-rewards-tnc"
            text={labels.common.lbl_common_tnc}
          />
        </AnchorLeftMargin>
      </StyledAnchorWrapper>
    </View>
  );
};

MyRewards.propTypes = {
  labels: PropTypes.shape({ common: {}, myPlaceRewards: {} }),
};

MyRewards.defaultProps = {
  labels: {
    common: { lbl_common_tnc: '' },
    myPlaceRewards: {
      ACC_LBL_MY_REWARDS_PROGRAM_DETAILS: '',
      ACC_LBL_MY_REWARDS_SHOP_NOW: '',
      ACC_LBL_MY_REWARDS_NO_REWARDS_MSG: '',
      ACC_LBL_MY_REWARDS_HEADING: '',
    },
  },
};

export default MyRewards;
