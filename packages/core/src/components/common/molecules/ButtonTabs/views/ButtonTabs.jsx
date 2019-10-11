/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';
import buttonTabsStyle from '../ButtonTabs.style';

/**
 * @constant getActiveStatus
 * @params - id - id of iteratable button tabs
 *           selectedTabId - id of selected tab from buttonTabs
 *
 * @description -  gives status of activeness of button.
 */
export const getActiveStatus = (id, selectedTabId = []) => {
  const selectedTab = Array.isArray(selectedTabId)
    ? selectedTabId && selectedTabId[0]
    : selectedTabId;
  if (Array.isArray(id) && JSON.stringify(id) === JSON.stringify(selectedTabId)) {
    return true;
  }
  if (id === selectedTab) {
    return true;
  }
  return false;
};

function ButtonTabs(props) {
  const { className, tabs, selectedTabId, onTabChange, dataLocator } = props;
  return (
    <div className={className}>
      {tabs.map(({ label, id }, index) => (
        <div key={id} className="button-wrapper" data-locator={`${dataLocator}${index}`}>
          <Button
            active={getActiveStatus(id, selectedTabId)}
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

export { ButtonTabs as ButtonTabsVanilla };
