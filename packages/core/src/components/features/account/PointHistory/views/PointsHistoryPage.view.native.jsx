import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
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
  const { labels, richTextContent } = props;
  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <BodyCopyWithSpacing
        text={getLabelValue(labels, 'lbl_common_points_history')}
        fontSize="fs16"
        fontWeight="extrabold"
        fontFamily="secondary"
        color="gray.900"
        spacingStyles="margin-bottom-XL margin-top-LRG"
        dataLocator="points_history_subheading"
      />
      <PointsHistoryList view="edit" labels={labels} showFullHistory />
      <RichTextWrapper dataLocator="points_history_rte">
        <RichText source={{ html: richTextContent }} style={contentHeight} />
      </RichTextWrapper>
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
    </ScrollView>
  );
};

PointsHistoryPageView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  richTextContent: PropTypes.string,
};

PointsHistoryPageView.defaultProps = {
  richTextContent: '',
};

export default PointsHistoryPageView;
