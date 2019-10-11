/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';
import buttonTabsStyle from '../ButtonTabs.style';

function ButtonTabs(props) {
  const { className, tabs, selectedTabId, onTabChange, dataLocator } = props;
  const selectedTab = Array.isArray(selectedTabId) ? selectedTabId[0] : selectedTabId;
  return (
    <div className={className}>
      {tabs.map(({ label, id }, index) => (
        <div key={id} className="button-wrapper" data-locator={`${dataLocator}${index}`}>
          <Button
            active={id === selectedTab}
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
  dataLocator: '',
  tabs: [],
  selectedTabId: '',
  onTabChange: () => {},
};

ButtonTabs.propTypes = {
  className: PropTypes.string,
  dataLocator: PropTypes.string,
  selectedTabId: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ),
  onTabChange: PropTypes.func,
};

export default withStyles(errorBoundary(ButtonTabs), buttonTabsStyle);
