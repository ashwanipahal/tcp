import React from 'react';
import PropTypes from 'prop-types';
import ChangePasswordForm from '../molecules/ChangePasswordForm';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Anchor from '../../../../common/atoms/Anchor';

export const ResetPassword = ({ labels, successMessage, errorMessage, onSubmit }) => {
  return (
    <React.Fragment>
      <BodyCopy className="elem-mb-LRG">
        <Anchor
          to="/account?id=profile"
          asPath="/account/profile"
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          className="elem-mb-LRG"
        >
          <span className="left-arrow"> </span>
          {labels.lbl_changePassword_back}
        </Anchor>
      </BodyCopy>
      <FormPageHeadingComponent
        heading={labels.lbl_changePassword_heading}
        className="margin-none"
      />
      <BodyCopy component="div">
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            <BodyCopy fontSize="fs14" fontFamily="secondary">
              {labels.lbl_changePassword_password_info}
            </BodyCopy>
          </Col>
        </Row>
      </BodyCopy>
      <ChangePasswordForm
        labels={labels}
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
      />
    </React.Fragment>
  );
};

ResetPassword.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ResetPassword;
