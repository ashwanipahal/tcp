import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/EmptyBirthdayCard.style';

export const EmptyBirthdayCard = ({
  className,
  view,
  labels
}) => {
  return (
    <BodyCopy component="div" className={className} textAlign="center">
      {view === 'edit' && <Anchor underline fontVariation="medium">+ Add a Child</Anchor>}
    </BodyCopy>
  );
};

EmptyBirthdayCard.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  view: PropTypes.oneOf(['read', 'edit'])
};

EmptyBirthdayCard.defaultProps = {
  view: 'edit'
};

export default withStyles(EmptyBirthdayCard, styles);
