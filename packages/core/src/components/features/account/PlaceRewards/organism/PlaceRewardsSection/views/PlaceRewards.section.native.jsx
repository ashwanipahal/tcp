import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import {
  ParentContainer,
  StyledHeading,
  UnderlineStyle,
  StyledView,
  StyledViewLargeMargin,
} from '../styles/PlaceRewards.section.style.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import MyRewards from '../../../../common/organism/MyRewards';
import BonusPointsDays from '../../../molecules/BonusPointsDays';
import RewardsPoints from '../../../../common/organism/RewardsPoints';
import PointsHistory from '../../../../common/organism/PointsHistory';
import EarnExtraPointsTileContainer from '../../../../common/organism/EarnExtraPointsTile';

const PlaceRewardsSection = ({ labels, className, ...otherProps }) => {
  return (
    <View className={className}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <StyledHeading>
          <BodyCopy
            fontSize="fs16"
            fontWeight="extrabold"
            text={labels.placeRewards.ACC_LBL_PLACE_REWARDS_HEADING}
          />
        </StyledHeading>
        <UnderlineStyle />
        <StyledView>
          <BodyCopy
            fontSize="fs16"
            fontWeight="extrabold"
            text={labels.placeRewards.lbl_common_point_balance}
          />
          <RewardsPoints />
        </StyledView>
        <StyledView>
          <StyledHeading>
            <BodyCopy
              fontSize="fs16"
              fontWeight="extrabold"
              text={labels.placeRewards.lbl_my_rewards_points_history}
            />
          </StyledHeading>
          <PointsHistory {...otherProps} />
        </StyledView>
        <StyledView>
          <BonusPointsDays />
        </StyledView>
        <StyledViewLargeMargin>
          <EarnExtraPointsTileContainer />
        </StyledViewLargeMargin>
        <MyRewards labels={labels} showLink {...otherProps} />
      </ScrollView>
    </View>
  );
};

PlaceRewardsSection.propTypes = {
  labels: PropTypes.shape({ placeRewards: {} }),
  className: PropTypes.string,
};

PlaceRewardsSection.defaultProps = {
  labels: { placeRewards: { ACC_LBL_PLACE_REWARDS_HEADING: '' } },
  className: '',
};

export default withStyles(PlaceRewardsSection, ParentContainer);
export { PlaceRewardsSection as PlaceRewardsSectionVanilla };
