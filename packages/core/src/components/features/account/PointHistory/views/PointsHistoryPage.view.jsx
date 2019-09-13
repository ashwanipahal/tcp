import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
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
          {labels.lbl_common_backLink}
        </Anchor>
      </BodyCopy>
      <FormPageHeading
        className="elem-mb-XL caps-heading"
        heading={labels.lbl_common_points_history}
        data-locator="birthdaySavingsLbl"
      />
      <BodyCopy component="div" className="elem-mb-XXL elem-mt-XXL elem-pb-MED">
        <BodyCopy
          component="p"
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="extrabold"
          className="hide-on-desktop hide-on-tablet elem-mb-LRG"
        >
          {labels.lbl_common_points_history}
        </BodyCopy>
        <PointsHistoryList view="edit" labels={labels} showFullHistory />
      </BodyCopy>
      <BodyCopy component="div" className="historySectionSeparator elem-mb-XXL elem-mt-XXL" />
      <HistoryPointsRichTextComponent content={richTextContent} />
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
