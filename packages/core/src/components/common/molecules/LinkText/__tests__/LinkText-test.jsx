import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import LinkText from '../LinkText';

let LinkTextComp;

beforeEach(() => {
  LinkTextComp = shallow(<LinkText headerText={mock.moduleK.composites.headerText} />);
});

describe('Promo Text Banner component', () => {
  it('renders correctly', () => {
    expect(LinkTextComp).toMatchSnapshot();
  });

  it('Module has header', () => {
    expect(LinkTextComp.find('.link-text')).toHaveLength(1);
  });
});
