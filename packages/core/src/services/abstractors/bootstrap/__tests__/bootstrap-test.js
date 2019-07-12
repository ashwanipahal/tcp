import bootstrap from '../bootstrap';
import labelsMock from '../labels/mock';
import headerMock from '../header/mock';
import footerMock from '../footer/mock';
import FooterAbstractor from '../footer';
import HeaderAbstractor from '../header';
import LabelsAbstractor from '../labels';

jest.mock('../layout/layout');
jest.mock('../../../handler/handler');

it('abstractor - bootstrap', () => {
  return bootstrap(['homepage']).then(data => {
    expect(data.homepage.items[0].layout.slots[0]).toHaveProperty(
      'name',
      'moduleName',
      'contentId'
    );
    expect(data.homepage.items[0].layout.slots[1]).toHaveProperty(
      'name',
      'moduleName',
      'contentId'
    );
    expect(data.homepage.items[0].layout.slots[0].moduleName).toEqual('moduleD');
    expect(data.homepage.items[0].layout.slots[1].moduleName).toEqual('moduleH');
    expect(data.labels).toMatchObject(LabelsAbstractor.processData(labelsMock));
    expect(data.header).toMatchObject(HeaderAbstractor.processData(headerMock));
    expect(data.footer).toMatchObject(FooterAbstractor.processData(footerMock));
  });
});
