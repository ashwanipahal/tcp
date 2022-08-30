import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import Espot from '@tcp/core/src/components/common/molecules/Espot';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { getLabelValue } from '@tcp/core/src/utils';
import Anchor from '../../../../common/atoms/Anchor';
import PointsHistoryList from '../../common/organism/PointsHistory';
import {
  RichTextWrapper,
  StyledAnchorWrapper,
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
          <Espot richTextHtml={richTextContent} />
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
