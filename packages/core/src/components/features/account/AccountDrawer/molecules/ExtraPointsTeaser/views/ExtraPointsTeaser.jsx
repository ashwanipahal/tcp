import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/ExtraPointsTeaser.style';
import Anchor from '../../../../../../common/atoms/Anchor';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

const ExtraPointsTeaser = props => {
  const { className, labels } = props;
  return (
    <div className={className}>
      <div className="extraPointsWrapper">
        <div className="earnExtra alignCenter">
          <BodyCopy fontFamily="secondary" fontWeight="extrabold" fontSize="fs14">
            {labels.ACC_DRAWER_EARN_EXTRA}
          </BodyCopy>
        </div>
        <div className="getCloser alignCenter">
          <BodyCopy
            fontFamily="secondary"
            fontWeight="extrabold"
            fontSize="fs12"
            color="text.secondary"
          >
            {labels.ACC_DRAWER_GET_CLOSER}
          </BodyCopy>
        </div>
        <div className="learnMore alignCenter">
          <Anchor
            fontSizeVariation="medium"
            anchorVariation="primary"
            text={labels.ACC_DRAWER_LEARN_MORE}
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
};

ExtraPointsTeaser.defaultProps = {
  className: '',
  labels: {
    ACC_DRAWER_EARN_EXTRA: 'Want to Earn Extra Points?',
    ACC_DRAWER_GET_CLOSER: 'Get even closer to your next reward!',
    ACC_DRAWER_LEARN_MORE: 'Learn More',
  },
};

export default withStyles(ExtraPointsTeaser, styles);
export { ExtraPointsTeaser as ExtraPointsTeaserVanilla };
