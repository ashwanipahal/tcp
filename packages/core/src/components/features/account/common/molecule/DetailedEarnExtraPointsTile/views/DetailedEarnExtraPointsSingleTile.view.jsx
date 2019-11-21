import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/DetailedEarnExtraPointsTile.style';

/**
 * This class component use for return the Detailed Earn Extra Points Single Tile
 * can be passed in the component.
 * @param waysToEarnRow - waysToEarnRow object used for showing extra points details
 */
export class DetailedEarnExtraPointsSingleTile extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.shape({}),
    className: PropTypes.string,
    onViewActivityDetails: PropTypes.func.isRequired,
    waysToEarnRow: PropTypes.shape({}),
  };

  static defaultProps = {
    className: '',
    labels: {},
    waysToEarnRow: {},
  };

  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { className, waysToEarnRow, onViewActivityDetails } = this.props;
    return (
      <BodyCopy component="div" className={className}>
        <BodyCopy
          component="div"
          className="tileWrapper firstColImage elem-mt-XS elem-mb-XS"
          onClick={() => onViewActivityDetails(waysToEarnRow)}
        >
          <BodyCopy component="div" className="earnExtraPointsTileImageSingle">
            <BodyCopy component="div" className={`imageSizeSingle ${waysToEarnRow.activityCode}`} />
          </BodyCopy>
          <BodyCopy component="div" className="earnExtraPointsTileTextMargin">
            <BodyCopy
              className="activityTitleMargin"
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
          </BodyCopy>
        </BodyCopy>
      </BodyCopy>
    );
  }
}

export default withStyles(DetailedEarnExtraPointsSingleTile, styles);
export { DetailedEarnExtraPointsSingleTile as DetailedEarnExtraPointsSingleVanilla };
