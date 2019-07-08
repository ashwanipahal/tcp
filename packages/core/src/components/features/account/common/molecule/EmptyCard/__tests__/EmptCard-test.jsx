import React from 'react';
import { shallow } from 'enzyme';
import { EmptyCardVanilla } from '../views/EmptyCard.view';
import labels from '../../../../Payment/container/Payment.labels';

describe('EmptyCard Component', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <EmptyCardVanilla labels={labels} icon="credit-card" alt="credit card icon" prefix="GC" />
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with credit card', () => {
    const tree = shallow(
      <EmptyCardVanilla labels={labels} icon="credit-card" alt="credit card icon" prefix="CC" />
    );
    expect(tree).toMatchSnapshot();
  });
});
