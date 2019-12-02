import { fromJS } from 'immutable';
import { getUserState, getPersonalDataState, getLabels } from '../ProductReviews.selectors';

describe('#ProductReviews Selectors', () => {
  it('#getUserState  should return user state', () => {
    const userData = {
      userId: '324324',
    };
    const state = {
      User: userData,
    };
    expect(getUserState(state)).toEqual(userData);
  });

  it('#getPersonalDataState  should return getPersonalDataState', () => {
    const data = fromJS({
      userId: '324324',
    });
    const state = {
      User: fromJS({ personalData: data }),
    };
    expect(getPersonalDataState(state)).toEqual(data);
  });

  it('#getLabels  should return getLabels', () => {
    const data = {
      pdpdata: { imgUrl: '' },
    };

    const state = {
      Labels: {
        Browse: {
          PDP: data,
        },
      },
    };
    expect(getLabels(state)).toEqual(data);
  });
});
