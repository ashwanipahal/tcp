import MODULE_D_CONSTANTS from '../ModuleD.constants';

import { loadModuleDData } from '../container/ModuleD.actions';

describe('ModuleD Actions', () => {
  test('should load ModuleD action', () => {
    const { type } = loadModuleDData();
    expect(type).toEqual(MODULE_D_CONSTANTS.LOAD_MODULE_D_DATA);
  });
});
