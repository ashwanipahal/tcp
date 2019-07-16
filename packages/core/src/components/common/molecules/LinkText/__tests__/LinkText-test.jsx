import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import LinkText from '../LinkText';

let LinkTextComp;

beforeEach(() => {
  const wrapper = shallow(<LinkText {...mock.moduleK.composites.headerText} />).get(0);
  LinkTextComp = shallow(wrapper);
});

describe('Promo Text Banner component', () => {
  it('renders correctly', () => {
    expect(LinkTextComp).toMatchSnapshot();
  });

  it('Module has header', () => {
    expect(LinkTextComp.find('.link-text')).toHaveLength(1);
  });
});
