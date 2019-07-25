import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import PromoBadge from '../PromoBadge';
import style from './L1NavItem.style';

const L1NavItem = props => {
  const {
    categoryContent: {
      id,
      name,
      description,
      mainCategory: { promoBadge },
    },
    className,
    ...others
  } = props;
  const classForRedContent = id === '505518' ? `highlighted` : ``;

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
        {...others}
      >
        <span className={`nav-bar-l1-item-label ${classForRedContent}`}>{name}</span>
        <span className="nav-bar-l1-item-content">
          {description || (promoBadge && <PromoBadge data={promoBadge} />) || ``}
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
