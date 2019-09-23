/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import ButtonTabs from '../../../molecules/ButtonTabs';
import { Wrapper } from '../ProductTabList.style.native';

const ProductTabList = props => {
  const { selectedTabId, tabs, onTabChange } = props;

  return (
    <Wrapper>
      <ButtonTabs selectedTabId={selectedTabId} onTabChange={onTabChange} tabs={tabs} />
    </Wrapper>
  );
};

ProductTabList.defaultProps = {
  onTabChange: () => {},
  tabs: [],
  selectedTabId: '',
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
};

export default ProductTabList;
