// export { default } from '../components/features/content/HomePage';
import React from 'react';

import mockE from '@tcp/core/src/services/abstractors/common/moduleE/mock';
import ModuleE from '@tcp/core/src/components/common/molecules/ModuleE';

const Main = () => <ModuleE {...mockE.moduleE.composites} />;

export default Main;
