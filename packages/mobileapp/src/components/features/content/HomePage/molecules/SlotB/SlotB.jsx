import React from 'react';
import { ModuleD, ModuleH, ModuleK } from '@tcp/core/src/components/common/molecules';

// @flow
type Props = {
  name: string,
};

const SlotB = (props: Props) => {
  switch (props.name) {
    case 'moduleD':
      return <ModuleD {...props} />;
    case 'moduleH':
      return <ModuleH {...props} />;
    case 'moduleK':
      return <ModuleK {...props} />;
    default:
      return null;
  }
};

export default SlotB;
