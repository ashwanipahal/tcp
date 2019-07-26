import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Heading } from '@tcp/core/src/components/common/atoms';
import style from './L2Panel.style';

const L2Panel = props => {
  const { openPanel, className, panelData, order } = props;
  return (
    <div className={`${className} nav-bar-l2-panel`}>
      {openPanel &&
        order.map(category => {
          return (
            <div className="l2-nav-category">
              <Heading variant="h6">{category}</Heading>
              <ul className="l2-nav-category-links">
                {panelData[category].map(l2Links => {
                  const {
                    categoryContent: { name },
                  } = l2Links;
                  return <li className="l2-nav-link">{name}</li>;
                })}
              </ul>
            </div>
          );
        })}
    </div>
  );
};

L2Panel.propTypes = {
  className: PropTypes.string.isRequired,
  openPanel: PropTypes.bool.isRequired,
  panelData: PropTypes.shape([]).isRequired,
  order: PropTypes.shape([]).isRequired,
};

export default withStyles(L2Panel, style);
