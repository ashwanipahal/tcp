import React from 'react';
import { PropTypes } from 'prop-types';

const HomePageSlots = props => {
  const { slotMatcher, modules } = props;
  const slotKeys = Object.keys(props)
    .filter(key => slotMatcher.test(key))
    .sort();
  const componentNameMap = modules.reduce((componentMap, { name: moduleName, component }) => {
    // eslint-disable-next-line no-param-reassign
    componentMap[moduleName] = component;
    return componentMap;
  }, {});

  return slotKeys.map(key => {
    const slotData = props[key];
    const { name: slotModuleName } = slotData;
    const Component = componentNameMap[slotModuleName];

    return Component && <Component key={slotModuleName} {...slotData} />;
  });
};

HomePageSlots.defaultProps = {
  slotMatcher: /^slot_/,
};

HomePageSlots.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      component: PropTypes.elementType,
    })
  ).isRequired,
  slotMatcher: PropTypes.instanceOf(RegExp),
};

export default HomePageSlots;
