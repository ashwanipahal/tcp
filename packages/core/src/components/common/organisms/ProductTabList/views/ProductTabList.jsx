/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import ButtonTabs from '../../../molecules/ButtonTabs';

const ProductTabList = props => {
  const { selectedTabId, tabs, onTabChange, dataLocator } = props;

  return (
    <ButtonTabs
      selectedTabId={selectedTabId}
      onTabChange={onTabChange}
      tabs={tabs}
      dataLocator={dataLocator}
    />
  );
};

ProductTabList.defaultProps = {
  onTabChange: () => {},
  tabs: [],
  selectedTabId: '',
  dataLocator: '',
};

ProductTabList.propTypes = {
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

export default ProductTabList;
