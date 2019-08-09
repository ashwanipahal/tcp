import React from 'react';
import { shallow } from 'enzyme';
import { CollapsibleContainerVanilla } from '../views/CollapsibleContainer.view';

describe('CollapsibleContainer', () => {
  const header = <div>hello</div>;
  const body = <div>body</div>;

  it('should render correctly', () => {
    const tree = shallow(<CollapsibleContainerVanilla header={header} body={body} />);
    tree.setState({ isExpanded: false });
    expect(tree).toMatchSnapshot();
    tree.find('button').simulate('click');
    expect(tree.state('isExpanded')).toBe(true);
  });
});
