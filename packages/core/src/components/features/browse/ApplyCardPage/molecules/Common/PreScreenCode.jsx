import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { BodyCopy, Col, Row, TextBox } from '../../../../../common/atoms';
import PreScreenCodeWrapper from './styles/PreScreenCode.style';

export default class PrescreenCode extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.shape({}).isRequired,
  };

  state = {
    showPreScreenCode: false,
  };

  handleClick = () => {
    this.setState({ showPreScreenCode: true });
  };

  render() {
    const { labels } = this.props;
    const { showPreScreenCode } = this.state;
    return (
      <PreScreenCodeWrapper>
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
        <BodyCopy fontFamily="secondary">
          {labels.plcc_form_prescreencodetext}
          {!showPreScreenCode ? (
            <BodyCopy
              fontSize="fs16"
              fontWeight="normal"
              fontFamily="secondary"
              component="a"
              onClick={this.handleClick}
              className="click-here-link"
            >
              {labels.plcc_form_clickHere}
            </BodyCopy>
          ) : (
            <BodyCopy component="span" role="button" className="prescreen-code">
              {labels.plcc_form_enterHere}
            </BodyCopy>
          )}
        </BodyCopy>
      </PreScreenCodeWrapper>
    );
  }
}

PrescreenCode.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};
