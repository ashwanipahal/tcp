import { fromJS, List } from 'immutable';
import { getPromoList, DataAbstractor } from '../PromoList';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('getPromoList functionality to return the promoList response', () => {
  const processedData = fromJS({
    name: 'test',
    composites: {
      promoListWrapper: List([
        {
          class: '<css_class2>',
        },
      ]),
    },
  });
  getPromoList('a4546bfa-522e-4b99-9976-1cdc5be8d418').then(data => {
    expect(data).toMatchObject(processedData);
  });
});

it('PromoList Abstractor | DataAbstractor | getData', () => {
  DataAbstractor.getData('4546bfa-522e-4b99-9976-1cdc5be8d418').then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('PromoList Abstractor | DataAbstractor | processData', () => {
  const rawData = fromJS({
    promoList: {
      name: 'test',
      composites: {
        promoListWrapper: List([
          {
            class: '<css_class>',
          },
        ]),
      },
    },
  });
  const processedData = fromJS({
    name: 'test',
    composites: {
      promoListWrapper: List([
        {
          class: '<css_class>',
        },
      ]),
    },
  });
  DataAbstractor.processData(rawData).then(data => {
    expect(data).toMatchObject(processedData);
  });
});
