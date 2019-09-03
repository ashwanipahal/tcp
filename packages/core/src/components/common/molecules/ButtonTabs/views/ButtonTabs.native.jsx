import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Button, ButtonWrapper } from '../ButtonTabs.style.native';

function ButtonTabs(props) {
  const { tabs, selectedTabId, onTabChange } = props;

  return (
    <Wrapper>
      {tabs.map(({ label, id }, i) => (
        <ButtonWrapper key={id} noRightBorder={i === tabs.length - 1}>
          <Button
            active={id === selectedTabId}
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
