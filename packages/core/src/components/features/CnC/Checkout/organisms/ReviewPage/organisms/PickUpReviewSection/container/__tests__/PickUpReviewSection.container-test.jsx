import React from 'react';
import { shallow } from 'enzyme';
import { PickUpReviewContainer } from '../PickUpReviewSection.container';
import PickUpReviewSection from '../../../../molecules/PickUpReviewSection';

describe('Pickup Review', () => {
  it('should render Container section', () => {
    const tree = shallow(
      <PickUpReviewContainer
        cartStores={{}}
        pickUpContactPerson={{}}
        pickUpAlternatePerson={{}}
        isHasPickUpAlternatePerson={false}
        labels={{}}
        onEdit={jest.fn()}
      />
    );
    expect(tree.is(PickUpReviewSection)).toBeTruthy();
  });
});
