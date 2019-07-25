import React from 'react';
import { ModuleD, ModuleH } from '@tcp/core/src/components/common/molecules';
import ModuleL from '@tcp/core/src/components/common/molecules/ModuleL/views/ModuleL.native';

// @flow
type Props = {
  name: string,
};

const SlotD = (props: Props) => {
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

export default SlotD;
