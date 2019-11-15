import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { capitalize } from '@tcp/core/src/utils';

const returnModule = mod => mod.default;
const RenderDynamicModule = dynamic({
  modules: () => ({
    HelpCentreLeftNavigation: () =>
      import('@tcp/core/src/components/common/molecules/LeftNavigation').then(returnModule),
  }),
  render: (properties, modules) => {
    const { className, val } = properties;
    const placeholder = capitalize(val)
      .split(' ')
      .join('');
    const Module = modules[placeholder];
    return <Module data={properties[placeholder]} className={className} />;
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
