import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/EmptyBirthdayCard.style';

/**
 * This component will render Empty Birthday Card
 * @param {object} props for EmptyBirthdayCard component
 * @param { string } props.className
 * @param { string } props.view
 * @param { object } props.labels
 */
export const EmptyBirthdayCard = ({ className, view, labels }) => {
  return (
    <BodyCopy component="div" className={className} textAlign="center">
      {view === 'edit' && (
        <div>
          <BodyCopy component="span" fontSize="fs14" className="elem-mr-XXS">
            +
          </BodyCopy>
          <Anchor underline fontSizeVariation="large">
            {labels.lbl_profile_addChildBirthdayCta}
          </Anchor>
        </div>
      )}
    </BodyCopy>
  );
};

EmptyBirthdayCard.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  view: PropTypes.oneOf(['read', 'edit']),
};

EmptyBirthdayCard.defaultProps = {
  view: 'edit',
};

export default withStyles(EmptyBirthdayCard, styles);
