import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text } from 'react-native';
import {
  ParentContainer,
  StyledHeading,
  UnderlineStyle,
  StyledView,
  StyledViewLargeMargin,
} from '../styles/PlaceRewards.section.style.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import MyRewards from '../../../molecules/MyRewards';
import RewardsPoints from '../../../../common/organism/RewardsPoints';
import PointsHistory from '../../../../common/organism/PointsHistory';

const PlaceRewardsSection = ({ labels, className }) => {
  return (
    <View className={className}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StyledHeading>
          <BodyCopy
            fontSize="fs16"
            fontWeight="extrabold"
            text={labels.myPlaceRewards.ACC_LBL_PLACE_REWARDS_HEADING}
          />
        </StyledHeading>
        <UnderlineStyle />
        <StyledView>
          <RewardsPoints />
        </StyledView>
        <StyledView>
          <StyledHeading>
            <BodyCopy
              fontSize="fs16"
              fontWeight="extrabold"
              text={labels.myPlaceRewards.lbl_my_rewards_points_history}
            />
          </StyledHeading>
          <PointsHistory />
        </StyledView>
        <StyledView>
          <Text>Third</Text>
        </StyledView>
        <StyledViewLargeMargin>
          <Text>Fourth</Text>
        </StyledViewLargeMargin>
        <MyRewards labels={labels} />
      </ScrollView>
    </View>
  );
};

PlaceRewardsSection.propTypes = {
  labels: PropTypes.shape({ myPlaceRewards: {} }),
  className: PropTypes.string,
};

PlaceRewardsSection.defaultProps = {
  labels: { myPlaceRewards: { ACC_LBL_PLACE_REWARDS_HEADING: '' } },
  className: '',
};

export default withStyles(PlaceRewardsSection, ParentContainer);
export { PlaceRewardsSection as PlaceRewardsSectionVanilla };
