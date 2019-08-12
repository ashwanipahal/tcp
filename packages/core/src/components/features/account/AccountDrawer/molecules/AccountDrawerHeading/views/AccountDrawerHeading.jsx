import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/AccountDrawerHeading.style';
import Image from '../../../../../../common/atoms/Image';
import { getIconPath } from '../../../../../../../utils';
import Anchor from '../../../../../../common/atoms/Anchor';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

const AccountDrawerHeading = props => {
  const { className, labels, userName, closedOverlay } = props;
  return (
    <div className={`${className} elem-pl-MED elem-pr-MED elem-pt-LRG elem-pb-LRG`}>
      <span>
        <Image src={getIconPath('user-icon')} />
        <span className="userName">
          <BodyCopy component="span" fontFamily="primary" fontWeight="semibold" fontSize="fs16">
            {userName}
          </BodyCopy>
        </span>
      </span>
      <span
        role="link"
        tabIndex={-1}
        className="viewAccAnchor"
        onClick={closedOverlay}
        onKeyPress={closedOverlay}
      >
        <Anchor
          fontSizeVariation="medium"
          anchorVariation="primary"
          text={labels.lbl_acc_drawer_view_my_acc}
          underline
          to="/account?id=account-overview"
          asPath="/account"
        />
      </span>
    </div>
  );
};

AccountDrawerHeading.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
  userName: PropTypes.string,
  closedOverlay: PropTypes.func.isRequired,
};

AccountDrawerHeading.defaultProps = {
  className: '',
  labels: {
    lbl_acc_drawer_user_name: 'Test Name',
    lbl_acc_drawer_view_my_acc: 'View My Account',
  },
  userName: '',
};

export default withStyles(AccountDrawerHeading, styles);
export { AccountDrawerHeading as AccountDrawerHeadingVanilla };
