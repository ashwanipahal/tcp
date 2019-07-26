import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from './PromoBadge.style';

const PromoBadge = props => {
  const { data, className } = props;

  return (
    <React.Fragment>
      {data.map(({ cls, text }, index) => (
        <BodyCopy
          className={`${cls} ${className} nav-bar-l1-promo-badge`}
          component="span"
          fontFamily="primary"
          fontSize="fs10"
          fontWeight="black"
          color="white"
          lineHeight="lh115"
        >
          {index ? ` ${text}` : text}
        </BodyCopy>
      ))}
    </React.Fragment>
  );
};

PromoBadge.propTypes = {
  data: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
};

export { PromoBadge as PromoBadgeVanilla };
export default withStyles(PromoBadge, styles);
