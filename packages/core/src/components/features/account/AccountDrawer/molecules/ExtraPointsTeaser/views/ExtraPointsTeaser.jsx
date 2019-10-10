import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/ExtraPointsTeaser.style';
import Anchor from '../../../../../../common/atoms/Anchor';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

const ExtraPointsTeaser = props => {
  const { className, plccUser, globalLabels } = props;

  return (
    <div className={`${className} elem-pt-MED elem-pr-XXL elem-pb-LRG elem-pl-XXL`}>
      <div className={`extraPointsWrapper${plccUser ? '_plcc' : ''} elem-pt-LRG elem-pb-SM`}>
        <div className="earnExtra alignCenter">
          <BodyCopy fontFamily="secondary" fontWeight="extrabold" fontSize="fs14">
            {getLabelValue(globalLabels, 'lbl_drawer_earn_extra', 'accountDrawer')}
          </BodyCopy>
        </div>
        <div className="getCloser alignCenter elem-pt-XS">
          <BodyCopy
            fontFamily="secondary"
            fontWeight="extrabold"
            fontSize="fs12"
            color="text.secondary"
          >
            {getLabelValue(globalLabels, 'lbl_drawer_get_closer', 'accountDrawer')}
          </BodyCopy>
        </div>
        <div className="learnMore alignCenter elem-pt-XS">
          <Anchor
            fontSizeVariation="medium"
            anchorVariation="primary"
            text={getLabelValue(globalLabels, 'lbl_drawer_learn_more', 'accountDrawer')}
            underline
          />
        </div>
      </div>
    </div>
  );
};

ExtraPointsTeaser.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
  plccUser: PropTypes.bool,
  globalLabels: PropTypes.shape({}),
};

ExtraPointsTeaser.defaultProps = {
  className: '',
  labels: {
    ACC_DRAWER_EARN_EXTRA: 'Want to Earn Extra Points?',
    ACC_DRAWER_GET_CLOSER: 'Get even closer to your next reward!',
    ACC_DRAWER_LEARN_MORE: 'Learn More',
  },
  plccUser: false,
  globalLabels: {},
};

export default withStyles(ExtraPointsTeaser, styles);
export { ExtraPointsTeaser as ExtraPointsTeaserVanilla };
