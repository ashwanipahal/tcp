import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/ExtraPoints.style';
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
                      offsetRight={{
                        small: true,
                      }}
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
