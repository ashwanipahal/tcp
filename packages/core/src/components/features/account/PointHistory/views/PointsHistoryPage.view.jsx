import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from '../styles/PointsHistoryPage.view.style';
import FormPageHeading from '../../common/molecule/FormPageHeading';
import PointsHistoryList from '../../common/organism/PointsHistory';
import internalEndpoints from '../../common/internalEndpoints';
import HistoryPointsRichTextComponent from './HistoryPointsRichText.view';

/**
 * This component will render PointsHistoryPage component
 * @param { object } labels
 */
export const PointsHistoryPageView = props => {
  const { labels, richTextContent, className } = props;
  return (
    <BodyCopy component="div" className={className}>
      <BodyCopy component="div" className="elem-mb-LRG">
        <Anchor
          to={internalEndpoints.placeRewardsPage.link}
          asPath={internalEndpoints.placeRewardsPage.path}
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          data-locator="backLink"
        >
          <span className="left-arrow" />
          {getLabelValue(labels, 'lbl_common_backLink')}
        </Anchor>
      </BodyCopy>
      <FormPageHeading
        className="elem-mb-XL myAccountRightView"
        heading={getLabelValue(labels, 'lbl_common_points_history_heading')}
        dataLocator="points_history_heading"
      />
      <BodyCopy component="div" className="elem-mb-XXL elem-mt-XXL elem-pb-MED point_history_grid">
        <BodyCopy
          component="p"
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="extrabold"
          className="hide-on-mobile hide-on-tablet elem-mb-LRG"
          dataLocator="points_history_subheading"
        >
          {getLabelValue(labels, 'lbl_common_points_history')}
        </BodyCopy>
        <PointsHistoryList view="edit" labels={labels} showFullHistory />
      </BodyCopy>
      <BodyCopy
        component="div"
        className="history-section-separator hide-on-mobile elem-mb-XXL elem-mt-XXL"
        data-locator="points_history_separator"
      />
      <HistoryPointsRichTextComponent content={richTextContent} />
      <BodyCopy component="div" className="elem-mb-XXL elem-mt-XXL">
        <Anchor
          to={internalEndpoints.pointsClaimPage.link}
          asPath={internalEndpoints.pointsClaimPage.path}
          fontSizeVariation="xlarge"
          anchorVariation="primary"
          data-locator="claim form link"
          underline
        >
          Points Claim Form
        </Anchor>
      </BodyCopy>
    </BodyCopy>
  );
};

PointsHistoryPageView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  richTextContent: PropTypes.string,
  className: PropTypes.string,
};

PointsHistoryPageView.defaultProps = {
  richTextContent: '',
  className: '',
};

export default withStyles(PointsHistoryPageView, styles);
