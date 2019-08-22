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
    ModuleK: () => import('@tcp/core/src/components/common/molecules/ModuleK').then(returnModule),
    ModuleL: () => import('@tcp/core/src/components/common/molecules/ModuleL').then(returnModule),
    ModuleA: () => import('@tcp/core/src/components/common/molecules/ModuleA').then(returnModule),
  }),
  render: (props: Props, { ModuleD, ModuleH, ModuleK, ModuleL, ModuleA }) => {
    switch (props.name) {
      case 'moduleA':
        return <ModuleA {...props} />;
      case 'moduleD':
        return <ModuleD {...props} />;
      case 'moduleH':
        return <ModuleH {...props} />;
      case 'moduleK':
        return <ModuleK {...props} />;
      case 'moduleL':
        return <ModuleL {...props} />;
      default:
        return <div>Module not found</div>;
    }
  },
});

export default SlotB;
