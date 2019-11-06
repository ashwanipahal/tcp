/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import ButtonTabs from '../../../molecules/ButtonTabs';

const StyliticsProductTabList = props => {
  const { selectedTabId, tabs, onTabChange, dataLocator, className } = props;

  return (
    <ButtonTabs
      className={className}
      selectedTabId={selectedTabId}
      onTabChange={onTabChange}
      tabs={tabs}
      dataLocator={dataLocator}
    />
  );
};

StyliticsProductTabList.defaultProps = {
  onTabChange: () => {},
  tabs: [],
  selectedTabId: '',
  dataLocator: '',
  className: '',
};

StyliticsProductTabList.propTypes = {
  className: PropTypes.string,
  onTabChange: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  selectedTabId: PropTypes.string,
  dataLocator: PropTypes.string,
};

export default StyliticsProductTabList;
