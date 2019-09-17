import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import { routerPush } from '@tcp/core/src/utils';
import internalEndpoints from '@tcp/core/src/components/features/account/common/internalEndpoints';
import styles from '../styles/EarnExtraPointsTile.style';
import DetailedEarnExtraPointsTile from '../../../molecule/DetailedEarnExtraPointsTile';

const onClickHandler = () => {
  return routerPush(internalEndpoints.profilePage.link, internalEndpoints.profilePage.path);
};

/**
 * @function RewardsPointsView The RewardsPointsView component will provide slider for account drawer
 */

const EarnExtraPointsTile = ({ className, labels, waysToEarn }) => {
  return (
    <View>
      <div className={className}>
        <BodyCopy
          component="div"
          fontSize="fs16"
          fontWeight="extrabold"
          fontFamily="secondary"
          data-locator="earnExtraPointsHeading"
        >
          {labels.lbl_common_earnExtraPoints}
        </BodyCopy>
        <Anchor
          fontSizeVariation="medium"
          anchorVariation="primary"
          data-locator="earnExtraPointsViewAll"
          underline
        >
          {labels.lbl_common_viewAll}
        </Anchor>
        <BodyCopy component="div" textAlign="center" className="earnExtraPointsWrapper">
          {waysToEarn &&
            waysToEarn.map((item, index) => {
              return (
                <DetailedEarnExtraPointsTile
                  key={index.toString()}
                  waysToEarnRow={item}
                  onClickHandler={onClickHandler}
                  labels={labels}
                />
              );
            })}
        </BodyCopy>
      </div>
    </View>
  );
};

EarnExtraPointsTile.propTypes = {
  className: PropTypes.string,
  waysToEarn: PropTypes.shape([]),
  labels: PropTypes.shape({
    lbl_common_earnExtraPoints: PropTypes.string,
    lbl_common_viewAll: PropTypes.string,
  }),
};

EarnExtraPointsTile.defaultProps = {
  className: '',
  waysToEarn: [],
  labels: {
    lbl_common_earnExtraPoints: '',
    lbl_common_viewAll: '',
  },
};

export default withStyles(EarnExtraPointsTile, styles);
export { EarnExtraPointsTile as EarnExtraPointsTileVanilla };
