import React from 'react';
import { ModuleD, ModuleH } from '@tcp/core/src/components/common/molecules';
import ModuleL from '@tcp/core/src/components/common/molecules/ModuleL';

// @flow
type Props = {
  name: string,
};

const SlotC = (props: Props) => {
  switch (props.name) {
    case 'moduleD':
      return <ModuleD {...props} />;
    case 'moduleH':
      return <ModuleH {...props} />;
    case 'moduleL':
      return <ModuleL {...props} />;
    default:
      return null;
  }
};

export default SlotC;
