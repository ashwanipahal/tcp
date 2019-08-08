import React from 'react';
import { shallow } from 'enzyme';
import { Anchor } from '../../../atoms';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import LinkText from '../index';

let LinkTextComp;

beforeEach(() => {
  LinkTextComp = shallow(<LinkText headerText={mock.moduleK.composites.headerText} />);
});

describe('LinkText component', () => {
  it('renders correctly', () => {
    expect(LinkTextComp).toMatchSnapshot();
  });

  it('Module has header', () => {
    expect(LinkTextComp.find(Anchor)).toHaveLength(1);
  });
});
