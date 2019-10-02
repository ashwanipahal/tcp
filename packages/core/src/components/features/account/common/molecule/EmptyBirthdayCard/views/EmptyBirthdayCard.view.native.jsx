import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { EmptyContainer, Row } from '../styles/EmptyBirthdayCard.style.native';

/**
 * This component will render Empty Birthday Card
 * @param {object} props for EmptyBirthdayCard component
 * @param { string } props.view
 * @param { object } props.labels
 */
export const EmptyBirthdayCard = ({ labels, view, showAddModal }) => {
  if (view === 'edit') {
    return (
      <EmptyContainer onPress={showAddModal}>
        <Row>
          <BodyCopy
            fontSize="fs14"
            mobileFontFamily="secondary"
            fontFamily="secondary"
            color="gray.900"
            text="+ "
          />
          <BodyCopy
            data-locator="addAChildLnk"
            fontSize="fs14"
            mobileFontFamily="secondary"
            fontFamily="secondary"
            text={labels.lbl_profile_addChildBirthdayCta}
            color="gray.900"
          />
        </Row>
      </EmptyContainer>
    );
  }
  return null;
};

EmptyBirthdayCard.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  view: PropTypes.oneOf(['read', 'edit']),
  showAddModal: PropTypes.func.isRequired,
};

EmptyBirthdayCard.defaultProps = {
  view: 'edit',
};

export default EmptyBirthdayCard;
