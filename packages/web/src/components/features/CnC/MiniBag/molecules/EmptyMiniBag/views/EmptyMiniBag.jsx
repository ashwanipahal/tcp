import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { routerPush } from '../../../../../../../../../core/src/utils';
import styles from '../styles/EmptyMiniBag.style';

// @flow

type Props = {
  labels: any,
  className: string,
  userName: any,
  onLinkClick: Function,
  closeMiniBag: Function,
  isRememberedUser: Boolean,
  isUserLoggedIn: Boolean,
};
const MiniBagHeader = ({
  labels,
  className,
  userName,
  onLinkClick,
  closeMiniBag,
  isRememberedUser,
  isUserLoggedIn,
}: Props) => {
  const createAccount = 'createAccount';
  const login = 'login';
  return (
    <div className={className}>
      <div className="continue-shopping">
        <BodyCopy
          component="span"
          fontSize="fs18"
          fontWeight="extrabold"
          textAlign="left"
          fontFamily="secondary"
          color="gray.800"
        >
          {labels.yourShoppingBag}
        </BodyCopy>
      </div>
      <div className="continue-shopping">
        <Anchor
          className="continueShoppingText"
          underline
          anchorVariation="primary"
          onClick={e => {
            e.preventDefault();
            closeMiniBag();
            routerPush('/home', '/home');
          }}
          dataLocator="emptyMiniBag-continueShopping"
        >
          <BodyCopy component="span" fontSize="fs15" fontFamily="secondary">
            {labels.continueShopping}
          </BodyCopy>
        </Anchor>
      </div>
      {!userName || !isUserLoggedIn ? (
        <>
          <div className="continue-shopping">
            <Button className="logIn" onClick={e => onLinkClick({ e, componentId: login })}>
              <BodyCopy
                component="span"
                color="white"
                fontWeight="extrabold"
                fontFamily="secondary"
                fontSize="fs14"
              >
                {labels.logIn}
              </BodyCopy>
            </Button>
          </div>
          {!isRememberedUser && (
            <>
              <div className="createAccountWrapper">
                <BodyCopy className="accountText" component="p" fontSize="fs14" textAlign="left">
                  {labels.dontHaveAccount}
                </BodyCopy>
                <BodyCopy className="accountText" component="p" fontSize="fs14" textAlign="left">
                  {labels.createOne}
                </BodyCopy>
              </div>
              <div className="continue-shopping">
                <Button
                  className="createAccount"
                  onClick={e => onLinkClick({ e, componentId: createAccount })}
                >
                  <BodyCopy
                    component="span"
                    color="white"
                    fontWeight="extrabold"
                    fontFamily="secondary"
                    fontSize="fs14"
                  >
                    {labels.createAccount}
                  </BodyCopy>
                </Button>
              </div>
            </>
          )}
        </>
      ) : (
        ``
      )}
    </div>
  );
};
export default withStyles(MiniBagHeader, styles);
export { MiniBagHeader as MiniBagHeaderVanilla };
