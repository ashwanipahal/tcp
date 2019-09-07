import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import MyProfileTile from '@tcp/core/src/components/common/molecules/MyProfileTile';
import { getLabelValue } from '@tcp/core/src/utils/utils';

export const AboutYouInfo = ({ labels, userSurvey, handleComponentChange }) => {
  const answer1 = (userSurvey && userSurvey.size && userSurvey.getIn([0, 0])) || '';
  const answer2Array = userSurvey && userSurvey.size && userSurvey.get(1);
  const answer2 = answer2Array && answer2Array.size ? answer2Array.join(', ') : '';

  return (
    <MyProfileTile
      title={getLabelValue(labels, 'lbl_profile_about_you_title')}
      ctaTitle={getLabelValue(labels, 'lbl_profile_update_info')}
      dataLocator="moreaboutyou-updateinfo"
      handleComponentChange={handleComponentChange}
    >
      <BodyCopyWithSpacing
        data-locator="moreaboutyou-describetext"
        fontSize="fs13"
        fontFamily="secondary"
        fontWeight="regular"
        text={`${getLabelValue(labels, 'lbl_profile_about_you_describe')}: ${answer1}`}
      />
      <View marginTop={20}>
        {answer2 && (
          <BodyCopyWithSpacing
            data-locator="moreaboutyou-shoppingfortext"
            fontSize="fs13"
            fontFamily="secondary"
            fontWeight="regular"
            text={`${getLabelValue(labels, 'lbl_profile_about_you_shopping')}: ${answer2}`}
          />
        )}
      </View>
    </MyProfileTile>
  );
};

AboutYouInfo.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_update_info: PropTypes.string,
    lbl_profile_about_you_title: PropTypes.string,
    lbl_profile_about_you_shopping: PropTypes.string,
    lbl_profile_about_you_describe: PropTypes.string,
  }),
  handleComponentChange: PropTypes.func.isRequired,
  userSurvey: PropTypes.shape([]).isRequired,
};

AboutYouInfo.defaultProps = {
  labels: {
    lbl_profile_about_you_title: '',
    lbl_profile_update_info: '',
    lbl_profile_about_you_shopping: '',
    lbl_profile_about_you_describe: '',
  },
};

export default AboutYouInfo;
