import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Anchor, BodyCopy, Col, Row, TextBox } from '../../../../../common/atoms';
import PreScreenCodeWrapper from './styles/PreScreenCode.style';
import { getLabelValue } from '../../../../../../utils';

export default class PrescreenCode extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.shape({}).isRequired,
  };

  state = {
    showPreScreenCode: false,
  };

  handleClick = e => {
    /* eslint-disable no-unused-expressions */
    e && e.preventDefault();
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
                placeholder={getLabelValue(labels, 'lbl_PLCCForm_preScreenCodeOpt')}
                name="preScreenCode"
                id="preScreenCode"
                maxLength={12}
                component={TextBox}
                dataLocator="Prescreen_codelink"
                className="field"
              />
            </Col>
          </Row>
        ) : null}
        <BodyCopy fontFamily="secondary">
          {getLabelValue(labels, 'lbl_PLCCForm_preScreenCodeText')}
          {!showPreScreenCode ? (
            <Anchor onClick={this.handleClick} className="click-here-link">
              {getLabelValue(labels, 'lbl_PLCCForm_clickHere')}
            </Anchor>
          ) : (
            <BodyCopy component="span" role="button" className="prescreen-code">
              {getLabelValue(labels, 'lbl_PLCCForm_enterHere')}
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
