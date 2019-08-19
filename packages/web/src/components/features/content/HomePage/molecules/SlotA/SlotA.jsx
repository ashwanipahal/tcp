import dynamic from 'next/dynamic';
import React from 'react';

// @flow

type Props = {
  name: string,
};

const returnModule = mod => mod.default;

const SlotA = dynamic({
  modules: () => ({
    ModuleD: () => import('@tcp/core/src/components/common/molecules/ModuleD').then(returnModule),
    ModuleH: () => import('@tcp/core/src/components/common/molecules/ModuleH').then(returnModule),
    ModuleK: () => import('@tcp/core/src/components/common/molecules/ModuleK').then(returnModule),
    ModuleL: () => import('@tcp/core/src/components/common/molecules/ModuleL').then(returnModule),
    ModuleN: () => import('@tcp/core/src/components/common/molecules/ModuleN').then(returnModule),
  }),
  render: (props: Props, { ModuleD, ModuleH, ModuleK, ModuleL, ModuleN }) => {
    switch (props.name) {
      case 'moduleD':
        return <ModuleD {...props} />;
      case 'moduleH':
        return <ModuleH {...props} />;
      case 'moduleK':
        return <ModuleK {...props} />;
      case 'moduleL':
        return <ModuleL {...props} />;
      case 'moduleN':
        return <ModuleN {...props} />;
      default:
        return <div>Module not defined</div>;
    }
  },
});

export default SlotA;
