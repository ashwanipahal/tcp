import bootstrap from '../bootstrap';
import ModuleDMock from '../../common/moduleD/mock';
import ModuleHMock from '../../common/moduleH/mock';
import labelsMock from '../labels/mock';
import headerMock from '../header/mock';
import footerMock from '../footer/mock';

jest.mock('../layout/layout');

it('abstractor - bootstrap', () => {
  return bootstrap(['homepage']).then(data => {
    expect(data.homepage.slot_1).toMatchObject(ModuleDMock);
    expect(data.homepage.slot_2).toMatchObject(ModuleHMock);
    expect(data.labels).toMatchObject(labelsMock);
    expect(data.header).toMatchObject(headerMock);
    expect(data.footer).toMatchObject(footerMock);
  });
});
