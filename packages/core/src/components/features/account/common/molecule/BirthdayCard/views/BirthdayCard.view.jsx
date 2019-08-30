import React from 'react';
import PropTypes from 'prop-types';
import { getIconPath, calculateAge } from '@tcp/core/src/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Image from '@tcp/core/src/components/common/atoms/Image';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/BirthdaySavings.style';

export const BirthdayCard = ({
  className,
  name,
  birthYear,
  birthMonth,
  gender,
  childId,
  removeBirthday,
}) => {
  const age = calculateAge(birthYear, birthMonth);
  return (
    <div className={className}>
      <Image
        alt="closeIcon"
        src={getIconPath('close-icon')}
        onClick={() => removeBirthday(childId)}
      />
      <BodyCopy>{name}</BodyCopy>
      <div>
        <BodyCopy>{age}</BodyCopy>
        <Image alt="userIcon" src={getIconPath(gender === '' ? 'girl-icon' : 'boy-icon')} />
        <BodyCopy>{birthYear}</BodyCopy>
      </div>
    </div>
  );
};

BirthdayCard.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  birthYear: PropTypes.string.isRequired,
  birthMonth: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  childId: PropTypes.string.isRequired,
  removeBirthday: PropTypes.func.isRequired,
};

export default withStyles(BirthdayCard, styles);
