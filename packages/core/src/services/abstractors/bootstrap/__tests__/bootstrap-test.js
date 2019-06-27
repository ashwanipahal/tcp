import bootstrap from '../bootstrap';
import ModuleDMock from '../../common/moduleD/mock';
import ModuleHMock from '../../common/moduleH/mock';
import labelsMock from '../labels/mock';
import headerMock from '../header/mock';
import footerMock from '../footer/mock';
import FooterAbstractor from '../footer';
import HeaderAbstractor from '../header';
import LabelsAbstractor from '../labels';
import ModuleDAbstractor from '../../common/moduleD';
import ModuleHAbstractor from '../../common/moduleH';

jest.mock('../layout/layout');
jest.mock('../../../handler/handler');

it('abstractor - bootstrap', () => {
  return bootstrap(['homepage']).then(data => {
    expect(data.homepage.slot_1).toMatchObject(ModuleDAbstractor.processData(ModuleDMock));
    expect(data.homepage.slot_2).toMatchObject(ModuleHAbstractor.processData(ModuleHMock));
    expect(data.labels).toMatchObject(LabelsAbstractor.processData(labelsMock));
    expect(data.header).toMatchObject(HeaderAbstractor.processData(headerMock));
    expect(data.footer).toMatchObject(FooterAbstractor.processData(footerMock));
  });
});
