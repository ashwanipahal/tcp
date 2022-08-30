import React from 'react';
import { shallow } from 'enzyme';
import NoInternetPage from '../NoInternetPage';

describe('NoInternetPage Component', () => {
  let component;
  const mock = jest.fn();
  const props = {
    screenProps: {
      network: {
        isConnected: true,
      },
      retryNetwork: mock,
    },
  };

  beforeEach(() => {
    component = shallow(<NoInternetPage {...props} />);
  });

  it('NoInternetPage should be defined', () => {
    expect(component).toBeDefined();
  });

  it('NoInternetPage should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
