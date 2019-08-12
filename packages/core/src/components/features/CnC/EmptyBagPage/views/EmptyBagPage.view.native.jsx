import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import withStyle from '../../../../common/hoc/withStyles';
import style from '../styles/EmptyBagPage.style';
import { BodyCopy, Button } from '../../../../common/atoms';
import { getLocator } from '../../../../../utils';
import { StyledEmptyBag } from '../styles/EmptyBagPage.style.native';

const EmptyBagPage = ({ isUserLoggedIn, bagLabels }) => {
  console.log('');
  return (
    <StyledEmptyBag>
      <BodyCopy
        className="large-size-message"
        color="gray.900"
        fontWeight="extrabold"
        fontFamily="secondary"
        dataLocator={getLocator('empty_bag_Msg')}
      >
        {!isUserLoggedIn ? bagLabels.guestUserMsg : bagLabels.loggedInMsg}
      </BodyCopy>

      <BodyCopy
        className="large-size-message"
        color="gray.900"
        fontWeight="extrabold"
        fontFamily="secondary"
        dataLocator={getLocator('empty_bag_recommendation_msg')}
      >
        {bagLabels.tagLine}
      </BodyCopy>
      <BodyCopy
        dataLocator={getLocator('empty_bag_recommendation_msg')}
        className="small-spacing"
        fontFamily="secondary"
      >
        {bagLabels.helperMsg}
      </BodyCopy>
    </StyledEmptyBag>
  );
};

EmptyBagPage.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired,
  bagLabels: PropTypes.bool.isRequired,
};

export default withStyle(EmptyBagPage, style);
export { EmptyBagPage as EmptyBagPageVanilla };
