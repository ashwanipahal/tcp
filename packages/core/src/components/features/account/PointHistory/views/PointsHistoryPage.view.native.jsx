import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { getLabelValue } from '@tcp/core/src/utils';
import { UrlHandler } from '../../../../../utils/utils.app';
import endpoints from '../../common/externalEndpoints';
import Anchor from '../../../../common/atoms/Anchor';
import PointsHistoryList from '../../common/organism/PointsHistory';
import {
  RichTextWrapper,
  contentHeight,
  StyledAnchorWrapper,
  AnchorLeftMargin,
} from '../styles/PointsHistoryPage.view.style.native';

/**
 * This component will render PointsHistoryPage component
 * @param { object } labels
 */
export const PointsHistoryPageView = props => {
  const { labels, richTextContent, accountLabels, navigation } = props;
  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <ViewWithSpacing spacingStyles="margin-LRG">
        <PointsHistoryList view="edit" labels={labels} showFullHistory />
        <RichTextWrapper dataLocator="points_history_rte">
          <RichText source={{ html: richTextContent }} style={contentHeight} />
        </RichTextWrapper>
        <StyledAnchorWrapper>
          <Anchor
            text="Points claim form"
            fontSizeVariation="medium"
            noLink
            underline
            anchorVariation="primary"
            onPress={() => {
              navigation.navigate('PointsClaimPage', {
                title: getLabelValue(accountLabels, 'lbl_points_claim_heading', 'myPlaceRewards'),
              });
            }}
          />
        </StyledAnchorWrapper>
        <StyledAnchorWrapper>
          <Anchor
            fontSizeVariation="medium"
            underline
            onPress={() => {
              UrlHandler(endpoints.myPlaceRewardsPage);
            }}
            anchorVariation="primary"
            dataLocator="my-rewards-program-details"
            text={getLabelValue(labels, 'lbl_points_history_program_details')}
          />
          <AnchorLeftMargin>
            <Anchor
              fontSizeVariation="medium"
              underline
              noLink
              onPress={() => {
                UrlHandler(endpoints.termsAndConditionsPage);
              }}
              anchorVariation="primary"
              dataLocator="my-rewards-tnc"
              text={getLabelValue(labels, 'lbl_common_tnc')}
            />
          </AnchorLeftMargin>
        </StyledAnchorWrapper>
      </ViewWithSpacing>
    </ScrollView>
  );
};

PointsHistoryPageView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  richTextContent: PropTypes.string,
  accountLabels: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

PointsHistoryPageView.defaultProps = {
  richTextContent: '',
};

export default PointsHistoryPageView;
