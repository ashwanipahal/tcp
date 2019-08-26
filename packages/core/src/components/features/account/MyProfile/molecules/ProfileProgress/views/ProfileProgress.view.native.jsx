import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Image from '../../../../../../common/atoms/Image';
import { ProgressWrapper , ProgressBarWrapper } from '../styles/ProfileProgress.style.native';


const smileyIcon = require('../../../../../../../assets/smiley-icon.png');

export const ProfileProgress = ({ profileCompletion }) => {
  return (
    <ProgressWrapper>
      <ProgressBarWrapper />
      <Image
        alt="Completion"
        source={smileyIcon}
        title="profile completion"
      />
      <BodyCopy
        fontSize="fs18"
        fontWeight="black"
        fontFamily="secondary"
        className="completion-text"
        text={`${profileCompletion}%`}
      />
    </ProgressWrapper>
  );
};

ProfileProgress.propTypes = {
  profileCompletion: PropTypes.string,
};

ProfileProgress.defaultProps = {
  profileCompletion: '',
};

export default ProfileProgress;
