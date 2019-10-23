import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import PageHeadingWithLinks from '@tcp/core/src/components/features/account/common/molecule/PageHeadingWithLinks';
import withStyles from '../../../../common/hoc/withStyles.native';

import MyFavoriteStore from '../../MyProfile/organism/MyFavoriteStore';
import SocialContainer from '../../../../common/organisms/SocialAccount/container/Social.container';
import MyPreferenceSubscriptionContainer from '../../MyPreferenceSubscription/container/MyPreferenceSubscription.container';

class MyPrefrenceSection extends React.PureComponent {
  render() {
    const { labels, handleComponentChange, componentProps } = this.props;
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <PageHeadingWithLinks
            heading={getLabelValue(labels, 'lbl_prefrence_heading')}
            programDetailsCta={getLabelValue(labels, 'lbl_prefrence_program_details')}
            termsConditionCta={getLabelValue(labels, 'lbl_prefrence_term_codition')}
          >
            <MyFavoriteStore isMyPreferences />
            <SocialContainer
              labels={labels}
              handleComponentChange={handleComponentChange}
              componentProps={componentProps}
            />
            <MyPreferenceSubscriptionContainer labels={labels} />
          </PageHeadingWithLinks>
        </ScrollView>
      </View>
    );
  }
}

MyPrefrenceSection.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
  componentProps: PropTypes.shape({}),
};

MyPrefrenceSection.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
  componentProps: {},
};

export default withStyles(MyPrefrenceSection);
