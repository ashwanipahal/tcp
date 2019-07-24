import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import style from './L1NavItem.style';

const L1NavItem = props => {
  const {
    categoryContent: {
      name,
      description,
      mainCategory: { promoBadge },
    },
    className,
  } = props;
  return (
    <React.Fragment>
      <BodyCopy
        component="li"
        className={`${className} nav-bar-l1-item`}
        fontFamily="secondary"
        fontSize={['fs13', 'fs13', 'fs15']}
        fontWeight="semibold"
        color="text.hint"
        lineHeight="lh115"
      >
        <span className="nav-bar-l1-item-label">{name}</span>
        <span className="nav-bar-l1-item-content">
          {description ||
            (promoBadge &&
              promoBadge.map(({ cls, text }, index) => (
                <span className={`${cls} nav-bar-l1-promo-badge`}>{index ? ` ${text}` : text}</span>
              ))) ||
            ``}
        </span>
        <span className="icon-arrow" />
      </BodyCopy>
    </React.Fragment>
  );
};

L1NavItem.propTypes = {
  categoryContent: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
};

export { L1NavItem as L1NavItemVanilla };
export default withStyles(L1NavItem, style);
