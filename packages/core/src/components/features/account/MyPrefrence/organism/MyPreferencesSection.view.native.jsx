import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { StyledHeading } from '@tcp/core/src/components/common/atoms/styledWrapper';
import withStyles from '../../../../common/hoc/withStyles.native';

import { UnderlineStyle } from '../styles/MyPreference.style.native';
import MyFavoriteStore from '../../MyProfile/organism/MyFavoriteStore';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import SocialContainer from '../../../../common/organisms/SocialAccount/container/Social.container';

class MyPrefrenceSection extends React.PureComponent {
  render() {
    const { labels, handleComponentChange } = this.props;
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <StyledHeading>
            {getLabelValue(labels, 'lbl_prefrence_heading') && (
              <BodyCopy
                fontSize="fs16"
                fontWeight="extrabold"
                text={getLabelValue(labels, 'lbl_prefrence_heading')}
              />
            )}
          </StyledHeading>
          <UnderlineStyle />
          <MyFavoriteStore isMyPreferences />
          <SocialContainer labels={labels} handleComponentChange={handleComponentChange} />
        </ScrollView>
      </View>
    );
  }
}

MyPrefrenceSection.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
};

MyPrefrenceSection.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
};

export default withStyles(MyPrefrenceSection);
