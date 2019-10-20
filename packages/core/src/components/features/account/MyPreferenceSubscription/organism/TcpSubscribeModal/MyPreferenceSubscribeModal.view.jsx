import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import createValidateMethod from '@tcp/core/src/utils/formValidation/createValidateMethod';
import getStandardConfig from '@tcp/core/src/utils/formValidation/validatorStandardConfig';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import { BodyCopy, Row, Col, Button, RichText } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { formatPhoneNumber } from '../../../../../../utils/formValidation/phoneNumber';
import styles from './styles/MyPreferenceSubscribeModal.style';
import myPreferenceConst from '../../MyPreferenceSubscription.constants';

/**
 * This Class component use for return the Extra Points Detail Modal
 * can be passed in the component.
 * @param waysToEarnRow - used for pass data to the modal popup
 * * @param onRequestClose - received onRequestClose function as param for closed popup
 * * @param openState - received openState function as param for open popup
 */
class MyPreferenceSubscribeModal extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onRequestClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleSubmitModalPopup: PropTypes.func.isRequired,
    activeModal: PropTypes.string.isRequired,
    labels: PropTypes.shape({}),
  };

  static defaultProps = {
    className: '',
    labels: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      disclaimerText: '',
    };
  }

  componentDidMount() {
    let disclaimerLabels = '';
    const { labels } = this.props;
    const disclaimerLabelsArray = Object.keys(labels).filter(disclaimerLabelsValue =>
      /lbl_prefrence_modal_disclaimer_line-/.test(disclaimerLabelsValue)
    );
    disclaimerLabelsArray.forEach(elem => {
      disclaimerLabels += getLabelValue(labels, elem);
    });

    this.setState({
      disclaimerText: disclaimerLabels,
    });
  }

  handleSubmitData = data => {
    const { handleSubmitModalPopup, activeModal } = this.props;
    const formData = { activeBrand: activeModal, ...data };
    handleSubmitModalPopup(formData);
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { className, handleSubmit, onRequestClose, labels } = this.props;
    const { disclaimerText } = this.state;

    return (
      <div className={className}>
        <BodyCopy component="div" className="myPreferenceModalWrapper">
          <form
            name={myPreferenceConst.MY_PREFERENCE_FORM_MODAL}
            className={className}
            onSubmit={handleSubmit(this.handleSubmitData)}
            noValidate
          >
            <BodyCopy
              fontSize="fs22"
              fontWeight="extrabold"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-MED elem-mt-LRG"
              data-locator="my-preference-modal_title"
            >
              {getLabelValue(labels, 'lbl_prefrence_subscribe_text_alerts')}
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-LRG"
              data-locator="my-preference-modal_info_text"
            >
              {getLabelValue(labels, 'lbl_prefrence_modal_info_text')}
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-MED"
              data-locator="my-preference-modal_sub_info_text"
            >
              {getLabelValue(labels, 'lbl_prefrence_modal_sub_info_text')}
            </BodyCopy>

            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-MED"
              data-locator="my-preference-modal_phnumber"
            >
              <Field
                placeholder="Mobile Phone Number"
                name="phoneNumber"
                id="phoneNumber"
                component={TextBox}
                dataLocator="my-preference-modal-phoneNumber"
                type="tel"
                normalize={formatPhoneNumber}
              />
            </BodyCopy>
            <BodyCopy
              component="div"
              textAlign="center"
              fontSize="fs14"
              fontFamily="secondary"
              className="disclaimer-sub-text"
            >
              <RichText
                richTextHtml={disclaimerText}
                dataLocator="my-preference-modal_disclaimer_sub_text"
              />
            </BodyCopy>
            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <Button
                  fullWidth
                  buttonVariation="fixed-width"
                  fill="BLUE"
                  type="submit"
                  className="submit-button"
                  dataLocator="subscribe_modal_submit"
                >
                  {getLabelValue(labels, 'lbl_prefrence_modal_submit')}
                </Button>
              </Col>
            </Row>
            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <Button
                  fullWidth
                  buttonVariation="fixed-width"
                  fill="WHITE"
                  className="cancel-button"
                  dataLocator="subscribe_modal_cancel"
                  onClick={onRequestClose}
                >
                  {getLabelValue(labels, 'lbl_prefrence_modal_cancel')}
                </Button>
              </Col>
            </Row>
          </form>
        </BodyCopy>
      </div>
    );
  }
}

const validateMethod = createValidateMethod(getStandardConfig(['phoneNumber']));

export default reduxForm({
  form: myPreferenceConst.MY_PREFERENCE_FORM_MODAL, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(MyPreferenceSubscribeModal, styles));
export { MyPreferenceSubscribeModal as MyPreferenceSubscribeModalVanilla };
