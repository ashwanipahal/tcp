import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import Button from '@tcp/core/src/components/common/atoms/Button';
import styles from '../styles/EmptyMiniBag.style';

// @flow

type Props = {
  labels: any,
  className: string,
  userName: any,
};
const MiniBagHeader = ({ labels, className, userName }: Props) => {
  return (
    <div className={className}>
      <div className="continue-shopping">
        <BodyCopy component="span" fontSize="fs18" fontWeight="semibold" textAlign="left">
          {labels.yourShoppingBag}
        </BodyCopy>
      </div>
      <div className="continue-shopping">
        <Anchor
          fontSizeVariation="medium"
          underline
          anchorVariation="primary"
          noLink
          to=""
          dataLocator="addedToBag-continueShopping"
        >
          {labels.continueShopping}
        </Anchor>
      </div>
      {!userName ? (
        <>
          <div className="continue-shopping">
            <Button className="logIn">
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
          <div className="createAccountWrapper">
            <BodyCopy className="accountText" component="p" fontSize="fs14" textAlign="left">
              {labels.dontHaveAccount}
            </BodyCopy>
            <BodyCopy className="accountText" component="p" fontSize="fs14" textAlign="left">
              {labels.createOne}
            </BodyCopy>
          </div>
          <div className="continue-shopping">
            <Button className="createAccount">
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
      ) : (
        ``
      )}
    </div>
  );
};
export default withStyles(MiniBagHeader, styles);
