import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../../molecules/LoginForm';
import LoginTopSection from '../../../molecules/LoginTopSection';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';

export const LoginSection = ({
  onSubmit,
  labels,
  loginErrorMessage,
  initialValues,
  showRecaptcha,
}) => {
  return (
    <Row>
      <Col
        colSize={{
          small: 6,
          medium: 8,
          large: 12
        }}
        className="elem-pt-XXL"
      >
        <LoginTopSection labels={labels} className="elem-mb-LRG" />
        <LoginForm
          onSubmit={onSubmit}
          labels={labels}
          loginErrorMessage={loginErrorMessage}
          initialValues={initialValues}
          showRecaptcha={showRecaptcha}
          className="elem-mb-LRG"
        />
      </Col>
    </Row>
  );
};

LoginSection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  loginErrorMessage: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  showRecaptcha: PropTypes.bool,
};

LoginSection.defaultProps = {
  loginErrorMessage: '',
  showRecaptcha: false,
};

export default LoginSection;
