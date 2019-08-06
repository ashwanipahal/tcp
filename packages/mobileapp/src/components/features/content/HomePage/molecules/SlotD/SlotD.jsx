import React from 'react';
import { ModuleD, ModuleH, ModuleK } from '@tcp/core/src/components/common/molecules';
import ModuleL from '@tcp/core/src/components/common/molecules/ModuleL';

// @flow
type Props = {
  name: string,
};

const SlotD = (props: Props) => {
  console.log('SlotD ', props);
  switch (props.name) {
    case 'moduleD':
      return <ModuleD {...props} />;
    case 'moduleH':
      return <ModuleH {...props} />;
    case 'moduleL':
      return <ModuleL {...props} />;
    case 'moduleK':
      return <ModuleK {...props} />;
    default:
      return null;
  }
};

export default SlotD;
