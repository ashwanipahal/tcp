import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Row, Col, BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/ExtraPoints.style';
import externalEndpoints from '../../common/externalEndpoints';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';
import DetailedEarnExtraPointsTile from '../../common/molecule/DetailedEarnExtraPointsTile';
import DetailedEarnExtraPointsSingleTileComponent from '../../common/molecule/DetailedEarnExtraPointsTile/views/DetailedEarnExtraPointsSingleTile.view';

/**
 * This function component use for return the EarnPoints
 * can be passed in the component.
 * @param waysToEarn - waysToEarn object used for showing extra points details
 */

const EarnPoints = ({ className, labels, waysToEarn, onViewActivityDetails }) => {
  let fistRowItem = [];
  let secondRowItem = [];
  if (waysToEarn && waysToEarn.length) {
    fistRowItem = waysToEarn.slice(0, 3);
    secondRowItem = waysToEarn.slice(3);
  }

  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  return (
    <div className={className}>
      <FormPageHeadingComponent heading={getLabelValue(labels, 'lbl_common_extraPointsHeading')} />
      {waysToEarn && waysToEarn.length && (
        <>
          <BodyCopy
            fontSize="fs18"
            fontWeight="semibold"
            textAlign="center"
            fontFamily="secondary"
            className="morePointsWrapper"
          >
            {getLabelValue(labels, 'lbl_extraExtraPoints_more_points')}
          </BodyCopy>
          <Row fullBleed className="elem-mt-LRG">
            {fistRowItem &&
              fistRowItem.map((item, index) => {
                return (
                  <>
                    {item && index === 0 && (
                      <Col colSize={{ small: 6, medium: 4, large: 6 }}>
                        <DetailedEarnExtraPointsSingleTileComponent
                          key={index.toString()}
                          waysToEarnRow={item}
                          onViewActivityDetails={onViewActivityDetails}
                          labels={labels}
                          viewAll
                        />
                      </Col>
                    )}
                    {item && index > 0 && (
                      <Col
                        colSize={{ small: 3, medium: 2, large: 3 }}
                        className={`${index === 1 ? 'extraPointsTileCol' : ''}`}
                      >
                        <DetailedEarnExtraPointsTile
                          key={index.toString()}
                          waysToEarnRow={item}
                          onViewActivityDetails={onViewActivityDetails}
                          labels={labels}
                          viewAll
                        />
                      </Col>
                    )}
                  </>
                );
              })}
          </Row>
          <Row fullBleed>
            {secondRowItem &&
              secondRowItem.map((item, index) => {
                let ignoreGutter = '';
                if ((index + 1) % 4 === 0) {
                  ignoreGutter = { large: true, medium: true, small: true };
                }
                return (
                  <Col colSize={{ small: 3, medium: 2, large: 3 }} ignoreGutter={ignoreGutter}>
                    <DetailedEarnExtraPointsTile
                      key={index.toString()}
                      waysToEarnRow={item}
                      onViewActivityDetails={onViewActivityDetails}
                      labels={labels}
                      viewAll
                    />
                  </Col>
                );
              })}
          </Row>
        </>
      )}
      <BodyCopy fontSize="fs14" fontWeight="regular" fontFamily="secondary" className="elem-mt-XL">
        <Anchor
          noUnderline
          anchorVariation="primary"
          fontSizeVariation="large"
          underline
          noLink
          href={externalEndpoints.mprTermsPage}
          target="_blank"
          dataLocator="shipping-email-signUp-contact-anchor"
        >
          {getLabelValue(labels, 'lbl_common_check_here')}
        </Anchor>
        {getLabelValue(labels, 'lbl_common_extra_points_terms_conditions')}
      </BodyCopy>
    </div>
  );
};
EarnPoints.propTypes = {
  className: PropTypes.string,
  onViewActivityDetails: PropTypes.func.isRequired,
  waysToEarn: PropTypes.shape([]),
  labels: PropTypes.shape({
    lbl_common_earnExtraPoints: PropTypes.string,
    lbl_common_viewAll: PropTypes.string,
  }),
};

EarnPoints.defaultProps = {
  className: '',
  waysToEarn: [],
  labels: {
    lbl_common_earnExtraPoints: '',
    lbl_common_viewAll: '',
  },
};

export default withStyles(EarnPoints, styles);
export { EarnPoints as EarnPointsVanilla };
