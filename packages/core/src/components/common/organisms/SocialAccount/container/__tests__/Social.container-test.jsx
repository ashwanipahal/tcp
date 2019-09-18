import React from 'react';
import { shallow } from 'enzyme';
import SocialContainer, { mapDispatchToProps } from '../Social.container';

describe('SocialviewVanilla container', () => {
  const props = {
    socialLoad: jest.fn(),
    labels: {},
  };
  it('should render MyFavoriteStoreComponent', () => {
    const component = shallow(<SocialContainer {...props} />);
    expect(component).toMatchSnapshot();
  });
});

describe('#mapDispatchToProps', () => {
  it('should return an action MyFavoriteStore which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.socialLoad();
    dispatchProps.saveSocialAcc();
    expect(dispatch.mock.calls).toHaveLength(2);
  });
});
