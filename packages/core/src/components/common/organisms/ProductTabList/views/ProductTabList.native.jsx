/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import ButtonTabs from '../../../molecules/ButtonTabs';
import { Wrapper } from '../ProductTabList.style.native';

const ProductTabList = props => {
  const { selectedTabId, tabs, onTabChange, style } = props;

  return (
    <Wrapper style={style}>
      <ButtonTabs selectedTabId={selectedTabId} onTabChange={onTabChange} tabs={tabs} />
    </Wrapper>
  );
};

ProductTabList.defaultProps = {
  onTabChange: () => {},
  tabs: [],
  selectedTabId: '',
  style: [],
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
  style: PropTypes.arrayOf(PropTypes.object),
};

export default ProductTabList;
