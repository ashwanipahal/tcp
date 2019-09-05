/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import buttonTabsStyle from '../ButtonTabs.style';

function ButtonTabs(props) {
  const { className, tabs, selectedTabId, onTabChange } = props;

  return (
    <div className={className}>
      {tabs.map(({ label, id }) => (
        <div key={id} className="button-wrapper">
          <Button
            active={id === selectedTabId}
            buttonVariation="mini-nav"
            onClick={() => onTabChange(id)}
          >
            {label}
          </Button>
        </div>
      ))}
    </div>
  );
}

ButtonTabs.defaultProps = {
  className: '',
  tabs: [],
  selectedTabId: '',
  onTabChange: () => {},
};

ButtonTabs.propTypes = {
  className: PropTypes.string,
  selectedTabId: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ),
  onTabChange: PropTypes.func,
};

export default withStyles(ButtonTabs, buttonTabsStyle);
