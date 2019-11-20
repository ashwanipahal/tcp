import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const returnModule = mod => mod.default;
const RenderDynamicModule = dynamic({
  modules: () => ({
    'help-center-left-navigation': () =>
      import('@tcp/core/src/components/common/molecules/LeftNavigation').then(returnModule),
  }),
  render: (properties, modules) => {
    const { className, val } = properties;
    const Module = modules[val];
    return <Module data={properties[val]} className={className} />;
  },
});
const Placeholder = props => {
  return <RenderDynamicModule {...props} />;
};

Placeholder.propTypes = {
  props: PropTypes.shape({}),
};

Placeholder.defaultProps = {
  props: {},
};

export default Placeholder;
