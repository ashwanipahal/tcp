/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import ButtonTabs from '../../../molecules/ButtonTabs';
import { Wrapper } from '../StyliticsProductTabList.style.native';

const StyliticsProductTabList = props => {
  const { selectedTabId, tabs, onTabChange, style } = props;

  return (
    <Wrapper style={style}>
      <ButtonTabs selectedTabId={selectedTabId} onTabChange={onTabChange} tabs={tabs} />
    </Wrapper>
  );
};

StyliticsProductTabList.defaultProps = {
  onTabChange: () => {},
  tabs: [],
  selectedTabId: '',
  style: [],
};

StyliticsProductTabList.propTypes = {
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

export default StyliticsProductTabList;
