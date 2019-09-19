import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { EmptyContainer, Row } from '../styles/EmptyBirthdayCard.style.native';

/**
 * This component will render Empty Birthday Card
 * @param {object} props for EmptyBirthdayCard component
 * @param { string } props.view
 */
export const EmptyBirthdayCard = ({ view }) => {
  return (
    <EmptyContainer>
      {view === 'edit' && (
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
            text="Add a child"
            color="gray.900"
          />
        </Row>
      )}
    </EmptyContainer>
  );
};

EmptyBirthdayCard.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  view: PropTypes.oneOf(['read', 'edit']),
};

EmptyBirthdayCard.defaultProps = {
  view: 'edit',
};

export default EmptyBirthdayCard;
