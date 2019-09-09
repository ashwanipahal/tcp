import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, change, reduxForm } from 'redux-form';
import ColorSelector from '@tcp/web/src/components/features/CnC/MiniBag/molecules/ColorSelect/views/ColorSelect.view';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/GiftServices.style';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';
import LabeledRadioButton from '../../../../../../../../common/atoms/LabeledRadioButton';
import Row from '../../../../../../../../common/atoms/Row';
import Col from '../../../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import Image from '../../../../../../../../common/atoms/Image';
import { isGymboree, getIconPath, getLocator } from '../../../../../../../../../utils';
import GiftServicesDetailsModal from './GiftServicesDetailsModal.view';

class GiftServices extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detailStatus: false,
    };
  }

  handleChange = () => {
    const { dispatch, formName, formSection } = this.props;
    if (dispatch) {
      dispatch(change(formName, `${formSection}.phoneNumber`));
    }
  };

  toggleDetailsModal = () => {
    const { detailStatus } = this.state;
    this.setState({
      detailStatus: !detailStatus,
    });
  };

  getServicesOptions = giftWrapOptions => {
    // const getServicesOptionsMap=[
    //   {"services":{
    //     "name":"defualt",
    //     "cost":"free"
    //   }
    //   },
    //   {"services":{
    //     "name":"delux",
    //     "cost":"2"
    //   }
    //   },
    //   {"services":{
    //     "name":"premium",
    //     "cost":"6"
    //   }
    //   },
    // ]
    const getServicesOptionsMap = giftWrapOptions.giftOptions;
    return (
      getServicesOptionsMap &&
      getServicesOptionsMap.map(servicesMap => ({
        title: (
          <React.Fragment>
            <span>{servicesMap.catEntryId}</span>
          </React.Fragment>
        ),
        content: (
          <React.Fragment>
            <span>{servicesMap.catEntryId}</span>
            <span>{servicesMap.longDescription}</span>
          </React.Fragment>
        ),
        value: servicesMap.catEntryId,
      }))
    );
  };

  render() {
    const { className, labels, isGiftServicesChecked, giftWrapOptions } = this.props;
    const giftServicesList = this.getServicesOptions(giftWrapOptions);
    const { detailStatus } = this.state;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', giftWrapOptions);

    return (
      <form className={className} noValidate>
        <div className={className}>
          <Row fullBleed>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <div className="checkbox-header">
                <Field
                  name="addGiftServices"
                  component={InputCheckbox}
                  dataLocator="hide-show-checkbox"
                  enableSuccessCheck={false}
                  onChange={this.handleChange}
                  className="giftServicesField"
                >
                  <BodyCopy
                    fontFamily="secondary"
                    fontSize="fs16"
                    fontWeight="extrabold"
                    className="elem-mb-XXS"
                  >
                    {labels.giftServices}
                  </BodyCopy>
                </Field>

                <BodyCopy
                  fontSize="fs12"
                  fontFamily="secondary"
                  className="giftServicesDetailsLink"
                  component="span"
                  fontWeight="semibold"
                  onClick={this.toggleDetailsModal}
                >
                  {labels.details}
                </BodyCopy>
              </div>
            </Col>
          </Row>
          <BodyCopy fontFamily="secondary" fontSize="fs16" fontWeight="regular" textAlign="left">
            Add a gift receipt, message and/or gift boxes.
          </BodyCopy>

          {!isGiftServicesChecked && (
            <>
              <Row fullBleed className="giftServicesContainer">
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs16"
                  fontWeight="regular"
                  textAlign="left"
                >
                  Select the brand you’d like for your gift box.
                </BodyCopy>
                <Col colSize={{ small: 3, medium: 4, large: 6 }} className="phone-field-wrapper">
                  <LabeledRadioButton
                    className="normal-select-box"
                    name="gym"
                    checked={!isGymboree()}
                    disabled={false}
                  >
                    <BodyCopy color="gray.900" fontSize="fs14" fontFamily="secondary">
                      <Image
                        alt="Brand"
                        className="brand-image"
                        src={getIconPath('header__brand-tab--tcp')}
                        data-locator={getLocator('header__brand-tab--tcp')}
                      />
                    </BodyCopy>
                  </LabeledRadioButton>
                </Col>
                <Col colSize={{ small: 3, medium: 4, large: 6 }} className="phone-field-wrapper">
                  <LabeledRadioButton
                    className="normal-select-box"
                    name="gym"
                    checked={isGymboree()}
                    disabled={false}
                  >
                    <BodyCopy color="gray.900" fontSize="fs14" fontFamily="secondary">
                      <Image
                        alt="Brand"
                        className="brand-image"
                        src={getIconPath('header__brand-tab-gymboree')}
                        data-locator={getLocator('header__brand-tab--gymboree')}
                      />
                    </BodyCopy>
                  </LabeledRadioButton>
                </Col>
              </Row>
              <Row className="edit-form-css">
                <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                  <div className="select-value-wrapper">
                    <div className="color-selector">
                      <Field
                        width={87}
                        id="color"
                        name="initail val"
                        component={ColorSelector}
                        options={giftServicesList}
                        dataLocator="addnewaddress-state"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )}
          <GiftServicesDetailsModal
            labels={labels}
            openState={detailStatus}
            onRequestClose={() => {
              this.setState({
                detailStatus: false,
              });
            }}
            heading="Help Modal"
          />
        </div>
      </form>
    );
  }
}

GiftServices.propTypes = {
  className: PropTypes.string,
  isGiftServicesChecked: PropTypes.bool,
  labels: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func,
  formName: PropTypes.string,
  formSection: PropTypes.string,
  giftWrapOptions: PropTypes.shape({}).isRequired,
};

GiftServices.defaultProps = {
  className: '',
  isGiftServicesChecked: false,
  dispatch: () => {},
  formName: '',
  formSection: '',
};

export { GiftServices as GiftServicesVanilla };
export default connect()(
  reduxForm({
    form: 'GiftServices',
    enableReinitialize: true,

    // a unique identifier for this form
  })(withStyles(GiftServices, styles))
);
