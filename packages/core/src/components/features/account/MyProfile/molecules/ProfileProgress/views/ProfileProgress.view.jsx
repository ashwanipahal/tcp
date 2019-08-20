import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import { getIconPath } from '../../../../../../../utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import styles from '../styles/ProfileProgress.style';

export const ProfileProgress = ({ profileCompletion, className }) => {
  return (
    <div className={`${className} level${Math.floor(profileCompletion / 20)}`}>
      <BodyCopy
        fontSize="fs18"
        fontWeight="black"
        fontFamily="secondary"
        className="completion-text"
      >
        {`${profileCompletion}%`}
      </BodyCopy>
      <div className="outer-shadow" />
      <div className="inner-shadow">
        <img
          alt="Completion"
          className="progress-image"
          src={getIconPath('smiley-icon')}
          title="profile completion"
        />
      </div>
      <div className="hold left">
        <div className="fill" />
      </div>
      <div className="hold right">
        <div className="fill" />
      </div>
    </div>
  );
};

ProfileProgress.propTypes = {
  profileCompletion: PropTypes.number,
  className: PropTypes.string,
};

ProfileProgress.defaultProps = {
  profileCompletion: 0,
  className: '',
};

export default withStyles(ProfileProgress, styles);
