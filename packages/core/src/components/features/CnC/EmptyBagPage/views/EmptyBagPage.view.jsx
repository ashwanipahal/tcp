import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'; //eslint-disable-line
import withStyle from '../../../../common/hoc/withStyles';
import style from '../styles/EmptyBagPage.style';
import { BodyCopy, Button } from '../../../../common/atoms';
import { getLocator } from '../../../../../utils';
import ApplyNowModal from '../../../../common/molecules/ApplyNowPLCCModal';

const renderEmptySFL = bagLabels => {
  return (
    <div className="empty-sfl-msg">
      <BodyCopy
        color="gray.900"
        fontSize="fs14"
        fontFamily="secondary"
        dataLocator={getLocator('empty_sfl_Msg_1')}
      >
        {bagLabels.emptySflMsg1}
      </BodyCopy>
      <BodyCopy
        color="gray.900"
        fontSize="fs14"
        fontFamily="secondary"
        dataLocator={getLocator('empty_sfl_Msg_2')}
      >
        {bagLabels.emptySflMsg2}
      </BodyCopy>
    </div>
  );
};

const EmptyBagPage = ({ className, isUserLoggedIn, bagLabels, isBagPageSflSection }) => {
  return (
    <div className={className}>
      {isBagPageSflSection ? (
        renderEmptySFL(bagLabels)
      ) : (
        <>
          <BodyCopy
            className="large-size-message"
            color="gray.900"
            fontWeight="extrabold"
            fontFamily="secondary"
            dataLocator={getLocator('empty_bag_Msg')}
          >
            {!isUserLoggedIn ? bagLabels.guestUserMsg : bagLabels.loggedInMsg}
          </BodyCopy>
          <ApplyNowModal />
          <div className="element-spacing">
            <Button
              data-locator={getLocator(
                isUserLoggedIn ? 'empty_bag_loginUserCTA' : 'empty_bag_guestUserCTA'
              )}
              className="CTA-button"
              onClick={() => {
                const page = !isUserLoggedIn ? '/us/login' : '/us/home';
                Router.push(page);
              }}
            >
              <BodyCopy
                component="span"
                color="white"
                fontWeight="extrabold"
                fontFamily="secondary"
                fontSize="fs14"
              >
                {!isUserLoggedIn ? bagLabels.login : bagLabels.shopNow}
              </BodyCopy>
            </Button>
          </div>
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
        </>
      )}
    </div>
  );
};

EmptyBagPage.propTypes = {
  className: PropTypes.string.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  bagLabels: PropTypes.bool.isRequired,
  isBagPageSflSection: PropTypes.bool,
};

EmptyBagPage.defaultProps = {
  isBagPageSflSection: false,
};

export default withStyle(EmptyBagPage, style);
export { EmptyBagPage as EmptyBagPageVanilla };
