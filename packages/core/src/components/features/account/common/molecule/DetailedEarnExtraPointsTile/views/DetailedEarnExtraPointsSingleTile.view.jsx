import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/DetailedEarnExtraPointsTile.style';

export class DetailedEarnExtraPointsSingleTile extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.shape({}),
    className: PropTypes.string,
    onClickHandler: PropTypes.func.isRequired,
    waysToEarnRow: PropTypes.shape({}),
  };

  static defaultProps = {
    className: '',
    labels: {},
    waysToEarnRow: {},
  };

  render() {
    const { className, waysToEarnRow, onClickHandler } = this.props;
    return (
      <BodyCopy component="div" className={className}>
        <BodyCopy
          component="div"
          className="tileWrapper"
          onClick={() => onClickHandler(waysToEarnRow)}
        >
          <Row fullBleed>
            <Col
              colSize={{ small: 3, medium: 4, large: 6 }}
              ignoreGutter={{
                large: true,
              }}
              className="FirstColImage"
            >
              <BodyCopy component="div" className="earnExtraPointsTileImageSingle">
                <BodyCopy
                  component="div"
                  className={`imageSizeSingle ${waysToEarnRow.activityCode}`}
                />
              </BodyCopy>
            </Col>
            <Col colSize={{ small: 3, medium: 4, large: 6 }}>
              <BodyCopy
                className="ActivityTitleMargin"
                component="p"
                fontSize="fs16"
                fontWeight="black"
                fontFamily="secondary"
                textAlign="center"
                data-locator={`earnExtraPointsActivityTitle_${waysToEarnRow.activityCode}`}
              >
                {waysToEarnRow.activityTitle}
              </BodyCopy>
              <BodyCopy
                component="p"
                fontSize="fs16"
                fontWeight="regular"
                fontFamily="secondary"
                textAlign="center"
                data-locator={`earnExtraPointsDescription_${waysToEarnRow.activityCode}`}
                className="earnPointDesc"
              >
                {waysToEarnRow.description}
              </BodyCopy>
            </Col>
          </Row>
        </BodyCopy>
      </BodyCopy>
    );
  }
}

export default withStyles(DetailedEarnExtraPointsSingleTile, styles);
export { DetailedEarnExtraPointsSingleTile as DetailedEarnExtraPointsTileVanilla };
