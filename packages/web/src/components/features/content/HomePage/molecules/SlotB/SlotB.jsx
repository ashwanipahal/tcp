import dynamic from 'next/dynamic';
import React from 'react';

// @flow

type Props = {
  name: string,
};

const returnModule = mod => mod.default;

const SlotB = dynamic({
  modules: () => ({
    ModuleD: () => import('@tcp/core/src/components/common/molecules/ModuleD').then(returnModule),
    ModuleH: () => import('@tcp/core/src/components/common/molecules/ModuleH').then(returnModule),
  }),
  render: (props: Props, { ModuleD, ModuleH }) => {
    switch (props.name) {
      case 'moduleD':
        return <ModuleD {...props} />;
      case 'moduleH':
        return <ModuleH {...props} />;
      default:
        return null;
    }
  },
});

export default SlotB;
