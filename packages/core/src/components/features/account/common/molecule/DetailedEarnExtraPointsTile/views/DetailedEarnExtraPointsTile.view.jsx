import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
// import { getAPIConfig } from '@tcp/core/src/utils';
import styles from '../styles/DetailedEarnExtraPointsTile.style';

export class DetailedEarnExtraPointsTile extends React.PureComponent {
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
    // const imageHost = getAPIConfig().assetHost;

    return (
      <BodyCopy component="div" className={className}>
        <BodyCopy component="div" className="tileWrapper" onClick={onClickHandler}>
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
