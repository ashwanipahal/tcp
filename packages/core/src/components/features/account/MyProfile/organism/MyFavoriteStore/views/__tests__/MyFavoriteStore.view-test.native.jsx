import React from 'react';
import { shallow } from 'enzyme';
import MyFavoriteStore from '../MyFavoriteStore.view.native';

describe('MyFavoriteStore Component', () => {
  let component;
  const props = {
    labels: {},
    defaultStore: '118012',
    favStoreName: 'Fulton Street',
    favStoreAddress: '471-485 Fulton Street',
    favStoreState: 'NY',
    favStoreCity: 'Brooklyn',
    favStoreZipcode: '11201',
    favStorePhone: '7124311408',
  };

  beforeEach(() => {
    component = shallow(<MyFavoriteStore {...props} />);
  });

  it('MyFavoriteStore should be defined', () => {
    expect(component).toBeDefined();
  });

  it('MyFavoriteStore should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly when isMyPreferences is present', () => {
    const prop = {
      defaultStore: '19012',
      isMyPreferences: true,
    };
    const tree = shallow(<MyFavoriteStore {...prop} />);
    expect(tree).toMatchSnapshot();
  });

  it('should renders correctly when isMyPreferences is false', () => {
    const prop = {
      defaultStore: '78622',
      isMyPreferences: false,
    };
    const tree = shallow(<MyFavoriteStore {...prop} />);
    expect(tree).toMatchSnapshot();
  });
});
