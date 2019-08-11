import React from 'react';
import PropTypes from 'prop-types';
import withStyle from '../../../../common/hoc/withStyles';
import style from '../styles/EmptyBagPage.style';
import { BodyCopy, Button } from '../../../../common/atoms';

const EmptyBagPage = ({ className, isUserLoggedIn }) => {
  return (
    <div className={className}>
      <BodyCopy
        className="large-size-message"
        color="gray.900"
        fontWeight="extrabold"
        fontFamily="secondary"
      >
        {!isUserLoggedIn
          ? 'Do you have items in your cart?'
          : 'Uh oh! Looks like you don’t have anything in your cart yet!'}
      </BodyCopy>

      <div className="element-spacing">
        <Button className="CTA-button">
          <BodyCopy
            component="span"
            color="white"
            fontWeight="extrabold"
            fontFamily="secondary"
            fontSize="fs14"
          >
            {!isUserLoggedIn ? 'LOGIN' : 'SHOP NOW'}
          </BodyCopy>
        </Button>
      </div>
      <BodyCopy
        className="large-size-message"
        color="gray.900"
        fontWeight="extrabold"
        fontFamily="secondary"
      >
        Need some inspiration?
      </BodyCopy>
      <BodyCopy className="small-spacing" fontFamily="secondary">
        Here are some great items to get your cart started!
      </BodyCopy>
    </div>
  );
};

EmptyBagPage.propTypes = {
  className: PropTypes.string.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default withStyle(EmptyBagPage, style);
export { EmptyBagPage as EmptyBagPageVanilla };
