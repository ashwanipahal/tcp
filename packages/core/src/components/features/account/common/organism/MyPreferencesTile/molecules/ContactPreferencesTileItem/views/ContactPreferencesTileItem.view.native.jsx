import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils';
import ImageComp from '@tcp/core/src/components/common/atoms/Image';
import {
  ContactPreferencesTileItemContainer,
  RightContainer,
  MiddleContainer,
  BodyCopyLeftMargin,
  BodyCopyLabelWrapper,
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
        <View>
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            text={getLabelValue(labels, 'lbl_preference_tileContactPreference', 'preferences')}
            color="black"
          />
        </View>
        <View style={MiddleContainer}>
          <BodyCopyLeftMargin>
            {placeRewardsSms ? (
              <ImageComp source={SmsEnabledIcon} width={30} height={30} />
            ) : (
              <ImageComp source={SmsDisabledIcon} width={30} height={30} />
            )}
            <BodyCopyLabelWrapper
              mobileFontFamily="secondary"
              fontSize="fs10"
              fontWeight="semibold"
              text={getLabelValue(labels, 'lbl_preference_tileTextText', 'preferences')}
              color="black"
            />
          </BodyCopyLeftMargin>
          <View>
            {placeRewardsPush ? (
              <ImageComp source={PushEnabledIcon} width={24} height={30} />
            ) : (
              <ImageComp source={PushDisabledIcon} width={24} height={30} />
            )}
            <BodyCopyLabelWrapper
              mobileFontFamily="secondary"
              fontSize="fs10"
              fontWeight="semibold"
              text={getLabelValue(labels, 'lbl_preference_tileAppText', 'preferences')}
              color="black"
            />
          </View>
        </View>
        <View style={RightContainer}>
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
        </View>
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
