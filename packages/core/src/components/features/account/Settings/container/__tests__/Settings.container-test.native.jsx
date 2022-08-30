import React from 'react';
import { shallow } from 'enzyme';
import { SettingsContainer, mapStateToProps } from '../Settings.container.native';

describe('SettingsContainer', () => {
  it('should render correctly', () => {
    const props = {
      accountLabels: {},
      navigation: jest.fn(),
      isUserLoggedIn: false,
    };
    const tree = shallow(<SettingsContainer {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('mapStateToProps should return label props', () => {
    const stateProps = mapStateToProps({
      Labels: {
        account: {
          lbl_profile_name: 'test',
        },
      },
    });
    expect(stateProps.accountLabels).toBeDefined();
  });
});
