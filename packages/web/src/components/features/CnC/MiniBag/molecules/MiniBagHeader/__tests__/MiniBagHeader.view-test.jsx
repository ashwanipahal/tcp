import React from 'react';
import { shallow } from 'enzyme';
import MiniBagHeader from '../views/MiniBagHeader';

describe('MiniBagHeader component', () => {
  it('renders correctly', () => {
    const props = {
      labels: {
        createAccount: 'crerate Acccount',
        logIn: 'login',
        hi: 'hi',
        points: 'points',
        inRewards: 'rewards',
      },
      totalItems: 20,
    };
    const component = shallow(<MiniBagHeader {...props} />);
    expect(component).toMatchSnapshot();
  });
});
