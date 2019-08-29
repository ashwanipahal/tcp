import dynamic from 'next/dynamic';
import React from 'react';

const returnModule = mod => mod.default;

const SlotB = dynamic({
  modules: () => ({
    ModuleD: () => import('@tcp/core/src/components/common/molecules/ModuleD').then(returnModule),
    ModuleH: () => import('@tcp/core/src/components/common/molecules/ModuleH').then(returnModule),
    ModuleK: () => import('@tcp/core/src/components/common/molecules/ModuleK').then(returnModule),
    ModuleL: () => import('@tcp/core/src/components/common/molecules/ModuleL').then(returnModule),
    ModuleA: () => import('@tcp/core/src/components/common/molecules/ModuleA').then(returnModule),
    ModuleN: () => import('@tcp/core/src/components/common/molecules/ModuleN').then(returnModule),
  }),
  render: (slotProps, { ModuleD, ModuleH, ModuleK, ModuleL, ModuleA, ModuleN }) => {
    const { name } = slotProps;
    switch (name) {
      case 'moduleA':
        return <ModuleA {...slotProps} />;
      case 'moduleD':
        return <ModuleD {...slotProps} />;
      case 'moduleH':
        return <ModuleH {...slotProps} />;
      case 'moduleK':
        return <ModuleK {...slotProps} />;
      case 'moduleL':
        return <ModuleL {...slotProps} />;
      case 'moduleN':
        return <ModuleN {...slotProps} />;
      default:
        return null;
    }
  },
});

export default SlotB;
