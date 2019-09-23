import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../common/hoc/withStyles.native';
import { StyledHeading, UnderlineStyle } from '../../AddressBook/styles/AddressBook.style.native';
import MyFavoriteStore from '../../MyProfile/organism/MyFavoriteStore';
import BodyCopy from '../../../../common/atoms/BodyCopy';

class MyPrefrenceSection extends React.PureComponent {
  render() {
    const { labels } = this.props;
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
        </ScrollView>
      </View>
    );
  }
}

MyPrefrenceSection.propTypes = {
  labels: PropTypes.shape({}),
};

MyPrefrenceSection.defaultProps = {
  labels: {},
};

export default withStyles(MyPrefrenceSection);
