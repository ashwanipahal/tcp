import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/DetailedEarnExtraPointsTile.style';

/**
 * This class component use for return the Detailed Earn Extra Points Tiles
 * can be passed in the component.
 * @param waysToEarnRow - waysToEarnRow object used for showing extra points details
 */
export class DetailedEarnExtraPointsTile extends React.PureComponent {
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
          className="tileWrapper"
          onClick={() => onViewActivityDetails(waysToEarnRow)}
        >
          <BodyCopy component="div" className="earnExtraPointsTileImage">
            <BodyCopy component="div" className={`imageSize ${waysToEarnRow.activityCode}`} />
          </BodyCopy>
          <BodyCopy
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
    );
  }
}

export default withStyles(DetailedEarnExtraPointsTile, styles);
export { DetailedEarnExtraPointsTile as DetailedEarnExtraPointsTileVanilla };
