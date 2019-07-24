import React from 'react';
import { shallow } from 'enzyme';
import { AnchorVanilla } from '../views/Anchor.native';

describe('HeadingVanilla', () => {
  let component;

  beforeEach(() => {
    component = shallow(<AnchorVanilla />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return abc component value one', () => {
    expect(component.find('Text')).toHaveLength(1);
  });
});

describe('Anchor Native', () => {
  let component;
  const navigate = jest.fn();
  let navigation;
  beforeEach(() => {
    navigation = {
      navigate,
    };
    component = shallow(
      <AnchorVanilla
        url="https://www.google.com/p/Rainbow--The-Birthday-Girl--Graphic-Tee"
        navigation={navigation}
        text="click Me"
      />
    );
  });

  it('should call parseUrl', () => {
    component.simulate('click');
    expect(navigate.mock.calls.length).toEqual(0);
  });
});
