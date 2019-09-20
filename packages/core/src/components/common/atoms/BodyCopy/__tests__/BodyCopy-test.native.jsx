import React from 'react';
import { shallow } from 'enzyme';
import { BodyCopyVanilla } from '../views/BodyCopy.native';

describe('HeadingVanilla', () => {
  let component;
  const props = {
    dataLocator: '',
    accessibilityText: '',
    margin: null,
    textDecoration: null,
    numberOfLines: null,
  };

  beforeEach(() => {
    component = shallow(<BodyCopyVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return abc component value one', () => {
    expect(component.find('Styled(Text)')).toHaveLength(1);
  });
});
