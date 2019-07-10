import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, RichText, Col, Row, Image } from '@tcp/core/src/components/common/atoms';
import { Grid, Modal } from '@tcp/core/src/components/common/molecules';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import signupWrapperStyle from '../SignupModal.style';

class SignupWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      showConfirmView: false,
      disableSubmitButton: true,
    };
  }

  onButtonClick = () => {
    console.log('onButtonClick');
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  onFormSubmit = () => {
    console.log('onFormSubmit');
  };

  render() {
    const { isOpen, showConfirmView, disableSubmitButton } = this.state;
    const { buttonConfig, className } = this.props;
    return (
      <Fragment>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            colSet={{ small: 6, medium: 8, large: 8 }}
            className={className}
            overlayClassName="TCPModal__Overlay"
            noHeader
          >
            {showConfirmView ? (
              <div>ABCD</div>
            ) : (
              // <SignUpModalConfirmView
              //   content={confirmViewContent}
              //   imgSrc={confirmViewImgSrc}
              //   {...others}
              // />
              <form onSubmit={this.onFormSubmit}>
                <div>ABCDEFGH</div>
                <Grid>
                  <Row fullBleed>
                    <Col colSize={{ small: 4, medium: 4, large: 4 }}>
                      <Image alt="" src="" />
                    </Col>
                    <Col colSize={{ small: 4, medium: 4, large: 4 }}>
                      <Button
                        disabled={disableSubmitButton}
                        fullWidth
                        buttonVariation="variable-width"
                        fill="BLUE"
                        type="submit"
                      >
                        Join now
                      </Button>
                    </Col>
                  </Row>
                </Grid>
              </form>
            )}
          </Modal>
        )}
        <Button customStyle="shadow-button" title={buttonConfig.title} onClick={this.onButtonClick}>
          <RichText richTextHtml={buttonConfig.title} />
        </Button>
        {/* <EmailSignUpModal
          confirmViewImgSrc="https://res.cloudinary.com/tcp-dam-test/image/upload/v1562398149/Test/sign-up-thank-you_1_nhhhwh.png"
          formViewImgSrc="https://res.cloudinary.com/tcp-dam-test/image/upload/w_378/v1562359106/Test/signup-offer-image_1_qib7ug.png"
          isOpen={isOpen}
          showConfirmView={showConfirmView}
          isSignUpInputError={isSignUpInputError}
          onFormSubmitSuccess={this.onFormSubmitSuccess}
          onFormSubmitError={this.onFormSubmitError}
          onModalCloseRequest={this.onModalCloseRequest}
          onTextFieldBlur={this.onTextFieldBlur}
          onJoinClick={this.onJoinClick}
        />
        <Button customStyle="shadow-button" title={title} onClick={this.onButtonClick}>
          <RichText richTextHtml={richTextHtml} />
        </Button> */}
      </Fragment>
    );
  }
}

SignupWrapper.propTypes = {
  buttonConfig: PropTypes.shape({}),
  verifyEmailAddress: PropTypes.func,
  submitEmailSubscription: PropTypes.func,
  className: PropTypes.string,
};

SignupWrapper.defaultProps = {
  buttonConfig: {},
  verifyEmailAddress: () => {},
  submitEmailSubscription: () => {},
  className: '',
};

export default withStyles(SignupWrapper, signupWrapperStyle);
export { SignupWrapper as EmailSignUpModalVanilla };
