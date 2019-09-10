import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, change, reduxForm } from 'redux-form';
import CustomSelect from '@tcp/core/src/components/common/molecules/CustomSelect';
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
import TextBox from '../../../../../../../../common/atoms/TextBox';

class GiftServices extends React.PureComponent {
  constructor(props) {
    super(props);
    const { isGiftServicesChecked, initialValues } = this.props;

    this.state = {
      detailStatus: false,
      isGymboreeBrand: isGymboree(),
      isChecked: isGiftServicesChecked,
      message: initialValues.message,
    };
  }

  handleChange = () => {
    const { isChecked } = this.state;
    const { dispatch } = this.props;
    this.setState({
      isChecked: !isChecked,
      message: '',
    });
    if (!isChecked && dispatch) {
      dispatch(change('GiftServices', `message`, ''));
      dispatch(change('GiftServices', `optionId`, 'standard'));
    }
  };

  toggleDetailsModal = () => {
    const { detailStatus } = this.state;
    this.setState({
      detailStatus: !detailStatus,
    });
  };

  getServicesOptions = giftWrapOptions => {
    const parsedGiftWrapOptions = JSON.parse(giftWrapOptions);
    const getServicesOptionsMap = parsedGiftWrapOptions.giftOptions;
    const { isGymboreeBrand } = this.state;
    const brand = isGymboreeBrand ? 'GYM' : 'TCP';
    return (
      getServicesOptionsMap &&
      getServicesOptionsMap
        .filter(servicesMap => servicesMap.itemBrand === brand || servicesMap.itemBrand === 'ALL')
        .map(servicesMap => {
          return {
            title: (
              <React.Fragment>
                <div>
                  <span>{servicesMap.name}</span>
                  <span className="price">
                    {servicesMap.price === '0.00' ? 'FREE' : `$${servicesMap.price}`}
                  </span>
                </div>
              </React.Fragment>
            ),
            content: (
              <React.Fragment>
                <div className="shortDesc">
                  <span>{servicesMap.name}</span>
                  <span className="price">
                    {servicesMap.price === '0.00' ? 'FREE' : `$${servicesMap.price}`}
                  </span>
                </div>
                <div>
                  <span className="longDesc">{servicesMap.longDescription}</span>
                </div>
              </React.Fragment>
            ),
            value: servicesMap.catEntryId,
          };
        })
    );
  };

  handleToggle = (e, isGymboreeBrand) => {
    this.setState({ isGymboreeBrand });
  };

  giftServiceChanged = (e, value) => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch(change('GiftServices', `optionId`, value));
    }
  };

  render() {
    const { className, labels, giftWrapOptions } = this.props;
    const giftServicesList = this.getServicesOptions(giftWrapOptions);
    const { detailStatus, isGymboreeBrand, isChecked, message } = this.state;

    return (
      <form className={className} noValidate>
        <div className={className}>
          <Row fullBleed>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <div className="checkbox-header">
                <Field
                  name="hasGiftWrapping"
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
          <BodyCopy
            className="addReceipt"
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="regular"
            textAlign="left"
          >
            {labels.addAGift}
          </BodyCopy>

          {!!isChecked && (
            <>
              <Row fullBleed className="giftServicesContainer">
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs16"
                  fontWeight="regular"
                  textAlign="left"
                >
                  {labels.selectBrand}
                </BodyCopy>
                <Col colSize={{ small: 3, medium: 4, large: 6 }} className="phone-field-wrapper">
                  <LabeledRadioButton
                    className="normal-select-box"
                    name="brand"
                    checked={isGymboreeBrand === isGymboree()}
                    onChange={e => this.handleToggle(e, isGymboree())}
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
                    name="brand"
                    checked={isGymboreeBrand === !isGymboree()}
                    onChange={e => this.handleToggle(e, !isGymboree())}
                    disabled={false}
                  >
                    <BodyCopy color="gray.900" fontSize="fs14" fontFamily="secondary">
                      <Image
                        alt="Brand"
                        className="brand-image gymImage"
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
                        name="optionId"
                        component={CustomSelect}
                        options={giftServicesList}
                        dataLocator="addnewaddress-state"
                        clickHandler={this.giftServiceChanged}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row fullBleed className="messageTextWrapper">
                <Col colSize={{ small: 3, medium: 4, large: 6 }}>
                  <BodyCopy
                    color="gray.900"
                    fontSize="fs12"
                    fontFamily="secondary"
                    textAlign="left"
                  >
                    {labels.addMessage}
                  </BodyCopy>
                </Col>
                <Col colSize={{ small: 3, medium: 4, large: 6 }}>
                  <BodyCopy
                    color="gray.900"
                    fontSize="fs10"
                    fontFamily="secondary"
                    textAlign="right"
                  >
                    {labels.charLimit}
                  </BodyCopy>
                </Col>
              </Row>

              <Row className="edit-form-css">
                <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                  <Field
                    name="message"
                    value={message}
                    id="message"
                    type="text"
                    component={TextBox}
                    maxLength={100}
                    dataLocator="gift-message"
                    enableSuccessCheck={false}
                  />
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
  giftWrapOptions: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}),
};

GiftServices.defaultProps = {
  className: '',
  isGiftServicesChecked: false,
  dispatch: () => {},
  initialValues: {},
};

export { GiftServices as GiftServicesVanilla };
export default connect()(
  reduxForm({
    form: 'GiftServices',
    enableReinitialize: true,

    // a unique identifier for this form
  })(withStyles(GiftServices, styles))
);
