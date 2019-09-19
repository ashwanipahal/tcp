import React from 'react';
import { shallow } from 'enzyme';
import MyFavoriteStore from '../MyFavoriteStore.view';
import MyProfileTile from '../../../../../../../common/molecules/MyProfileTile';

describe('MyFavoriteStore Component', () => {
  let component;
  const props = {
    labels: {
      myFavoriteStore: 'My Fav store',
      updateFavoriteStore: 'Update store',
    },
    defaultStore: '123',
    favStoreName: 'TCP',
    favStoreAddress: '123 Street',
    favStoreState: 'CA',
    favStoreCity: 'NY',
    favStoreZipcode: '23424',
    favStorePhone: '2343434343',
  };

  beforeEach(() => {
    component = shallow(<MyFavoriteStore {...props} />);
  });

  it('MyFavoriteStore should be defined', () => {
    component.find(MyProfileTile);
    expect(component).toBeDefined();
  });

  it('MyFavoriteStore should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when isMyPreferences is present', () => {
    const prop = {
      defaultStore: '12313',
      isMyPreferences: true,
    };
    const tree = shallow(<MyFavoriteStore {...prop} />);
    expect(tree).toMatchSnapshot();
  });

  it('should renders correctly when isMyPreferences is false', () => {
    const prop = {
      defaultStore: '34334',
      isMyPreferences: false,
    };
    const tree = shallow(<MyFavoriteStore {...prop} />);
    expect(tree).toMatchSnapshot();
  });
});
