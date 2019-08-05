import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/ExtraPointsTeaser.style';
import Anchor from '../../../../../../common/atoms/Anchor';

const ExtraPointsTeaser = props => {
  const { className, labels } = props;
  return (
    <div className={className}>
      <div>{labels.ACC_DRAWER_EARN_EXTRA}</div>
      <div>{labels.ACC_DRAWER_GET_CLOSER}</div>
      <div>
        <Anchor
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          text={labels.ACC_DRAWER_LEARN_MORE}
        />
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
