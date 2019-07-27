import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Heading, Row } from '@tcp/core/src/components/common/atoms';
import style from './L2Panel.style';

const L2Panel = props => {
  const { openPanel, className, panelData, order } = props;
  return (
    <Row
      className={`${className} nav-bar-l2-panel`}
      fullBleed={{
        small: false,
        medium: false,
        large: true,
      }}
    >
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
    </Row>
  );
};

L2Panel.propTypes = {
  className: PropTypes.string.isRequired,
  openPanel: PropTypes.bool.isRequired,
  panelData: PropTypes.shape([]).isRequired,
  order: PropTypes.shape([]).isRequired,
};

export default withStyles(L2Panel, style);
