import React from 'react';
import { shallow } from 'enzyme';
import { GetCandidVanilla } from '../GetCandid.native';

describe('GetCandidVanilla component', () => {
  const props = {
    disclaimersData: {},
    getAPIConfig: {},
    candidData: {
      Settings: {},
      Views: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      Tags: [],
    },
    labels: {
      lbl_getCandid_title: 'title',
    },
    fetchCandidData: jest.fn(),
  };

  it('should invoke the constructor', () => {
    const instance = new GetCandidVanilla();
    expect(instance).toBeDefined();
  });
  it('should renders correctly considering selective arguments are passed', () => {
    props.applicationStatus = '';
    const component = shallow(<GetCandidVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
