import React from 'react';
import { storiesOf } from '@storybook/react';
import mockM from '@tcp/core/src/components/common/molecules/ModuleM/moduleM.mock';
import ModuleM from '../views/ModuleM';

storiesOf('ModuleM', module).add('Basic', () => (
  <ModuleM {...mockM.moduleM.composites} type="flex1" />
));
