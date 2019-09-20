import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/ExtraPoints.style';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';
import DetailedEarnExtraPointsTile from '../../common/molecule/DetailedEarnExtraPointsTile';
import { DetailedEarnExtraPointsSingleTile } from '../../common/molecule/DetailedEarnExtraPointsTile/views/DetailedEarnExtraPointsSingleTile.view';

const onClickHandler = item => {
  console.log('li--------------------------------');
  console.log(item);
  console.log('li--------------------------------');
  const { onViewCouponDetails } = this.props;
  onViewCouponDetails(item);
};

const EarnPoints = ({ className, labels, waysToEarn }) => {
  return (
    <div className={className}>
      <FormPageHeadingComponent heading={getLabelValue(labels, 'lbl_common_extraPointsHeading')} />
      <Row fullBleed className="elem-mt-LRG">
        {waysToEarn &&
          // eslint-disable-next-line complexity
          waysToEarn.map((item, index) => {
            let ignoreGutter = '';
            if (index === 2 || (index > 2 && (index - 2) % 4 === 0)) {
              ignoreGutter = { large: true, medium: true };
            }

            return (
              <>
                {item && index === 0 && (
                  <Col colSize={{ small: 6, medium: 4, large: 6 }}>
                    <DetailedEarnExtraPointsSingleTile
                      key={index.toString()}
                      waysToEarnRow={item}
                      onClickHandler={onClickHandler}
                      labels={labels}
                      viewAll
                    />
                  </Col>
                )}
                {item && index > 0 && index < 3 && (
                  <Col colSize={{ small: 6, medium: 4, large: 6 }}>
                    <DetailedEarnExtraPointsSingleTile
                      key={index.toString()}
                      waysToEarnRow={item}
                      onClickHandler={onClickHandler}
                      labels={labels}
                      viewAll
                    />
                  </Col>
                )}
                {item && index > 2 && (
                  <Col colSize={{ small: 3, medium: 2, large: 3 }}>
                    <DetailedEarnExtraPointsTile
                      key={index.toString()}
                      waysToEarnRow={item}
                      onClickHandler={onClickHandler}
                      labels={labels}
                      viewAll
                    />
                  </Col>
                )}
              </>
            );
          })}
      </Row>
    </div>
  );
};

EarnPoints.propTypes = {
  className: PropTypes.string,
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
