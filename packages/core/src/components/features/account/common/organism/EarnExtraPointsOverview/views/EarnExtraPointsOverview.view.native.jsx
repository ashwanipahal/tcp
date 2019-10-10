import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { BodyCopy, Button } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { UnderlineStyle } from '../../../styledWrapper';
import {
  EarnExtraPointsOverviewContainer,
  EarnExtraPointsWrapper,
} from '../styles/EarnExtraPointsOverview.style.native';
import EarnExtraPointsTileContainer from '../../EarnExtraPointsTile';
/*
MyWalletTile component is used in AccountOverview screen on app
*/
export const EarnExtraPointsOverview = ({ labels, handleComponentChange }) => {
  return (
    <EarnExtraPointsOverviewContainer>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs16"
        text={getLabelValue(labels, 'lbl_common_earnExtraPoints')}
        color="black"
      />
      <UnderlineStyle />
      <BodyCopy
        className="elem-mb-LRG"
        fontSize="fs14"
        fontWeight="semibold"
        data-locator="getCloserToReward"
        text={getLabelValue(labels, 'lbl_earnExtraPoints_getReward')}
      />
      <EarnExtraPointsWrapper>
        <EarnExtraPointsTileContainer
          handleComponentChange={handleComponentChange}
          isAccountOverview
        />
      </EarnExtraPointsWrapper>
      <ViewWithSpacing spacingStyles="margin-top-LRG margin-bottom-MED">
        <Button
          text={getLabelValue(labels, 'lbl_common_viewAll')}
          buttonVariation="variable-width"
          fill="BLUE"
          onPress={() => handleComponentChange('earnExtraPointsPageMobile')}
        />
      </ViewWithSpacing>
    </EarnExtraPointsOverviewContainer>
  );
};

EarnExtraPointsOverview.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  handleComponentChange: PropTypes.func.isRequired,
};

export default withNavigation(EarnExtraPointsOverview);
