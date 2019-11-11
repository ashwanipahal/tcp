// export { default } from '../components/features/content/HomePage';
import React from 'react';

import mockEV1 from '@tcp/core/src/services/abstractors/common/moduleE/mock-v1';
import mockEV1Alt from '@tcp/core/src/services/abstractors/common/moduleE/mock-v1-alt';
import mockEV2 from '@tcp/core/src/services/abstractors/common/moduleE/mock-v2';
import ModuleE from '@tcp/core/src/components/common/molecules/ModuleE';

const Main = () => [
  <ModuleE {...mockEV1.moduleE.composites} />,
  <ModuleE {...mockEV1Alt.moduleE.composites} />,
  <ModuleE {...mockEV2.moduleE.composites} />,
];

export default Main;
