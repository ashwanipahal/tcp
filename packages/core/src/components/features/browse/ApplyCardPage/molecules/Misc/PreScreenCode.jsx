import React from 'react';
import { BodyCopy, Col, Row, TextBox } from '@tcp/core/src/components/common/atoms';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

export default class PrescreenCode extends React.Component {
  static propTypes = {
    labels: PropTypes.shape({}).isRequired,
  };

  state = {
    showPreScreenCode: false,
  };
  // eslint-disable-next-line
  handleClick = () => {
    this.setState({ showPreScreenCode: true });
  };

  render() {
    const { labels } = this.props;
    const { showPreScreenCode } = this.state;
    return (
      <React.Fragment>
        {showPreScreenCode ? (
          <Row fullBleed>
            <Col
              className="contact_information_form"
              key="Prescreen_codelink"
              colSize={{ large: 6, medium: 4, small: 6 }}
            >
              <Field
                placeholder={labels.plcc_form_prescreen_optional}
                name="preScreenCode"
                id="preScreenCode"
                maxLength={12}
                component={TextBox}
                dataLocator="Prescreen_codelink"
                className="field"
                enableSuccessCheck={false}
              />
            </Col>
          </Row>
        ) : null}
        <BodyCopy className="prescreen-code">
          {labels.plcc_form_prescreencodetext}
          {!showPreScreenCode ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <BodyCopy component="a" onClick={this.handleClick} className="click-here-link">
              {labels.plcc_form_clickHere}
            </BodyCopy>
          ) : (
            <span role="button" className="prescreen-code">
              {labels.plcc_form_enterHere}
            </span>
          )}
        </BodyCopy>
      </React.Fragment>
    );
  }
}

PrescreenCode.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};
