import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { getLabelValue } from '@tcp/core/src/utils';
import ImageComp from '@tcp/core/src/components/common/atoms/Image';
import {
  ContactPreferencesTileItemContainer,
  RightContainer,
  MiddleContainer,
  ImageWrapper,
} from '../styles/ContactPreferencesTileItem.style.native';

const PushEnabledIcon = require('../../../../../../../../../assets/push-enabled.png');
const PushDisabledIcon = require('../../../../../../../../../assets/push-disabled.png');
const SmsDisabledIcon = require('../../../../../../../../../assets/sms-disabled.png');
const SmsEnabledIcon = require('../../../../../../../../../assets/sms-enabled.png');

const ContactPreferencesTileItem = ({ labels, customerPreferences, handleComponentChange }) => {
  const { placeRewardsPush, placeRewardsSms } = customerPreferences;
  const addEditText =
    placeRewardsPush || placeRewardsSms ? 'lbl_preference_tileEdit' : 'lbl_preference_tileAdd';
  return (
    <>
      <ContactPreferencesTileItemContainer>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs14"
          text={getLabelValue(labels, 'lbl_preference_tileContactPreference', 'preferences')}
          color="black"
        />
        <MiddleContainer>
          <ImageWrapper>
            {placeRewardsSms ? (
              <ImageComp source={SmsEnabledIcon} width={30} height={30} />
            ) : (
              <ImageComp source={SmsDisabledIcon} width={30} height={30} />
            )}
            <BodyCopyWithSpacing
              fontFamily="secondary"
              fontSize="fs10"
              fontWeight="semibold"
              text={getLabelValue(labels, 'lbl_preference_tileTextText', 'preferences')}
              color="black"
              spacingStyles="margin-top-XS"
            />
          </ImageWrapper>
          <ImageWrapper spacingStyles="margin-left-LRG">
            {placeRewardsPush ? (
              <ImageComp source={PushEnabledIcon} width={24} height={30} />
            ) : (
              <ImageComp source={PushDisabledIcon} width={24} height={30} />
            )}
            <BodyCopyWithSpacing
              fontFamily="secondary"
              fontSize="fs10"
              fontWeight="semibold"
              text={getLabelValue(labels, 'lbl_preference_tileAppText', 'preferences')}
              color="black"
              spacingStyles="margin-top-XS"
            />
          </ImageWrapper>
        </MiddleContainer>
        <RightContainer>
          <Anchor
            anchorVariation="primary"
            text={getLabelValue(labels, addEditText, 'preferences')}
            onPress={() => handleComponentChange('myPreferencePageMobile')}
            underline
            fontSizeVariation="large"
            noLink
            dataLocator=""
            color="gray.900"
          />
        </RightContainer>
      </ContactPreferencesTileItemContainer>
    </>
  );
};

ContactPreferencesTileItem.propTypes = {
  labels: PropTypes.shape({}),
  customerPreferences: PropTypes.shape({}),
  handleComponentChange: PropTypes.func.isRequired,
};

ContactPreferencesTileItem.defaultProps = {
  labels: {
    lbl_preference_tileContactPreference: '',
    lbl_preference_tileAdd: '',
    lbl_preference_tileEdit: '',
    lbl_preference_tileTextText: '',
    lbl_preference_tileAppText: '',
  },
  customerPreferences: {},
};

export default ContactPreferencesTileItem;
