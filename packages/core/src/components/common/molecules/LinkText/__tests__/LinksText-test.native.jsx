import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import LinkText from '../LinkText.native';

let LinkTextComp;

beforeEach(() => {
  LinkTextComp = shallow(<LinkText headerText={mock.moduleK.composites.headerText} />);
});

describe('LinkText component', () => {
  it('renders correctly', () => {
    expect(LinkTextComp).toMatchSnapshot();
  });

  it('Module has header', () => {
    expect(LinkTextComp.find('TouchableOpacity')).toHaveLength(1);
  });
});
