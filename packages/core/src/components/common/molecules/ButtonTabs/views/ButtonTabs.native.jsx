/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Button, ButtonWrapper } from '../ButtonTabs.style.native';

export const getActiveStatus = (id, selectedTabId = []) => {
  if (Array.isArray(id) && JSON.stringify(id) === JSON.stringify(selectedTabId)) {
    return true;
  }
  if (id === selectedTabId) {
    return true;
  }
  return false;
};

function ButtonTabs(props) {
  const { tabs, selectedTabId, onTabChange } = props;
  const selectedTab = Array.isArray(selectedTabId) ? selectedTabId[0] : selectedTabId;
  return (
    <Wrapper>
      {tabs.map(({ label, id }, index) => (
        <ButtonWrapper key={id} noRightBorder={index === tabs.length - 1}>
          <Button
            active={getActiveStatus(id, selectedTab)}
            text={label}
            buttonVariation="mini-nav"
            onPress={() => onTabChange(id)}
          />
        </ButtonWrapper>
      ))}
    </Wrapper>
  );
}

ButtonTabs.defaultProps = {
  tabs: [],
  selectedTabId: '',
  onTabChange: () => {},
};

ButtonTabs.propTypes = {
  selectedTabId: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ),
  onTabChange: PropTypes.func,
};

export default ButtonTabs;
