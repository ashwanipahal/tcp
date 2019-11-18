/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import getActiveStatus from '../utils';
import { Wrapper, Button, ButtonWrapper } from '../ButtonTabs.style.native';

function ButtonTabs(props) {
  const { tabs, selectedTabId, onTabChange, isDivisionTabModule } = props;
  return (
    <Wrapper isDivisionTabModule={isDivisionTabModule}>
      {tabs.map(({ label, id }, index) => (
        <ButtonWrapper key={id} noRightBorder={index === tabs.length - 1}>
          <Button
            active={getActiveStatus(id, selectedTabId)}
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
  isDivisionTabModule: false,
};

ButtonTabs.propTypes = {
  selectedTabId: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ),
  onTabChange: PropTypes.func,
  isDivisionTabModule: PropTypes.bool,
};

export default ButtonTabs;
