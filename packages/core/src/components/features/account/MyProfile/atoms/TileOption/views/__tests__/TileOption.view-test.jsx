import React from 'react';
import { shallow } from 'enzyme';
import { TileOptionVanilla } from '../TileOption.view';

describe('TileOption', () => {
  it('should render correctly', () => {
    const props = {
      clasName: 'sc-cIShpX dVDvCi sc-fYxtnH fCCVQb sc-gGBfsJ RixGJ sc-bbmXgH kaiKft',
      optionText: 'Parent',
      optionValue: 'shopper1',
      isSelected: false,
      onSelection: () => {},
      questionId: 'question1',
    };
    const tree = shallow(<TileOptionVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render with selected tile', () => {
    const props = {
      clasName: 'sc-cIShpX dVDvCi sc-fYxtnH fCCVQb sc-gGBfsJ RixGJ sc-bbmXgH kaiKft',
      optionText: 'Parent',
      optionValue: 'shopper1',
      isSelected: true,
      onSelection: () => {},
      questionId: 'question1',
    };
    const tree = shallow(<TileOptionVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
