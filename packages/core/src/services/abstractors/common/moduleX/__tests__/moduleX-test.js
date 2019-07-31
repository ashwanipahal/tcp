import { fromJS, List } from 'immutable';
import { getModuleX, DataAbstractor } from '../moduleX';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('getModuleX functionality to return the moduleX response', () => {
  const processedData = fromJS({
    name: 'moduleX',
    richText:
      '<div class=“payment__offers”><div><div><img alt=“card Icon” src=“/static/images/card-smile.png”></div><div><div data-locator=“” class=“sc-hSdWYo ilmiua”><b>SAVE 30% TODAY WHEN YOU OPEN AND USE A <span class=“offers__msg”> MY PLACE REWARDS CREDIT CARD! </span></b></div><div data-locator=“”><a class=“offers__link” href=“#”>DETAILS</a></div></div></div></div>',
  });
  getModuleX('a4546bfa-522e-4b99-9976-1cdc5be8d418').then(data => {
    expect(data).toMatchObject(processedData);
  });
});

it('ModuleX Abstractor | DataAbstractor | getData', () => {
  DataAbstractor.getData('4546bfa-522e-4b99-9976-1cdc5be8d418').then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleX Abstractor | DataAbstractor | processData', () => {
  const rawData = fromJS({
    moduleX: {
      name: 'test',
      composites: {
        richTextList: List([
          {
            text: '<div></div>',
          },
        ]),
      },
    },
  });
  const processedData = fromJS({
    name: 'test',
    richText: '<div></div>',
  });
  DataAbstractor.processData(rawData).then(data => {
    expect(data).toMatchObject(processedData);
  });
});
