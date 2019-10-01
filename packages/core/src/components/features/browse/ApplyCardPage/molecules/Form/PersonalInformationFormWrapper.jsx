import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { BodyCopy, Col, Row, SelectBox, TextBox } from '../../../../../common/atoms';
import { calendarDaysMap, calendarYearsMap } from '../../utils/DateOfBirthHelper';
import { MONTH_OPTIONS_MAP_WITH_EMPTY as months } from '../../RewardsCard.constants';
import StyledPersonalFormWrapper from './styles/PersonalInformationFormWrapper.style';
import { getLocator, getLabelValue } from '../../../../../../utils';
import { getPageViewGridColumnSize } from '../../utils/utility';

export default class PersonalInformationFormWrapper extends React.PureComponent {
  render() {
    const { labels, isPLCCModalFlow } = this.props;
    return (
      <StyledPersonalFormWrapper>
        <BodyCopy component="h2" className="title">
          {getLabelValue(labels, 'lbl_PLCCForm_personalInfo')}
        </BodyCopy>
        <Row fullBleed>
          <Col
            className="contact_information_form"
            key="contact_information_form"
            colSize={{ large: getPageViewGridColumnSize(isPLCCModalFlow), medium: 4, small: 6 }}
          >
            <BodyCopy
              component="span"
              fontSize="fs10"
              fontFamily="secondary"
              fontWeight="extrabold"
              className="free_dropdown_label"
            >
              {getLabelValue(labels, 'lbl_PLCCForm_dob')}
            </BodyCopy>
            <Row fullBleed>
              <Col
                className="table_contact_month"
                key="contact_information_month"
                colSize={{ large: 4, medium: 2, small: 2 }}
              >
                <Field
                  id="month"
                  name="month"
                  component={SelectBox}
                  options={months}
                  dataLocator={getLocator('plcc_date')}
                  className="field_dob"
                  enableSuccessCheck={false}
                />
              </Col>
              <Col
                className="table_contact_day"
                key="personal_info_day"
                colSize={{ large: 4, medium: 2, small: 2 }}
              >
                <Field
                  id="date"
                  name="date"
                  component={SelectBox}
                  options={calendarDaysMap()}
                  dataLocator={getLocator('plcc_month')}
                  className="field_dob"
                  enableSuccessCheck={false}
                />
              </Col>
              <Col
                className="table_contact_year"
                key="personal_info_year"
                colSize={{ large: 4, medium: 2, small: 2 }}
              >
                <Field
                  id="year"
                  name="year"
                  component={SelectBox}
                  options={calendarYearsMap()}
                  dataLocator={getLocator('plcc_year')}
                  className="field_dob"
                  enableSuccessCheck={false}
                />
              </Col>
            </Row>
          </Col>
          <Col
            className="contact_information_form"
            key="contact_information_form_plcc_SSN"
            colSize={{ large: getPageViewGridColumnSize(isPLCCModalFlow), medium: 4, small: 6 }}
          >
            <Field
              component={TextBox}
              title={getLabelValue(labels, 'lbl_PLCCForm_ssn')}
              placeholder={getLabelValue(labels, 'lbl_PLCCForm_ssn')}
              name="ssNumber"
              maxLength="4"
              id="lastName"
              data-locator={getLocator('plcc_SSN')}
            />
          </Col>
        </Row>
      </StyledPersonalFormWrapper>
    );
  }
}

PersonalInformationFormWrapper.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isPLCCModalFlow: PropTypes.func.isRequired,
};
