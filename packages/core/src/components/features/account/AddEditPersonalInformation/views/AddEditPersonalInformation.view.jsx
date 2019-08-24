import React from 'react';
import PropTypes from 'prop-types';
import ChangePasswordForm from '../molecules/AddEditPersonalInformationForm';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Anchor from '../../../../common/atoms/Anchor';

export const ChangePassword = ({ labels, successMessage, errorMessage, onSubmit }) => {
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
        dataLocator="pi-profileinformationheading"
      />
      <BodyCopy component="div" className="elem-pt-LRG">
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 12,
            }}
          >
            <BodyCopy data-locator="passwordInstructionTxt" fontSize="fs14" fontFamily="secondary">
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

ChangePassword.propTypes = {
  labels: PropTypes.shape({
    lbl_changePassword_back: PropTypes.string,
    lbl_changePassword_heading: PropTypes.string,
    lbl_changePassword_password_info: PropTypes.string,
  }),
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ChangePassword.defaultProps = {
  labels: {
    lbl_changePassword_back: '',
    lbl_changePassword_heading: '',
    lbl_changePassword_password_info: '',
  },
};
export default ChangePassword;
