import React from 'react';
import { PropTypes } from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Row, TextBox, BodyCopy, Col, Button } from '@tcp/core/src/components/common/atoms';

class CopyLink extends React.PureComponent {
  constructor(props) {
    super(props);
    this.copyLinkRef = React.createRef();
    this.handleCopyLink = this.handleCopyLink.bind(this);
  }

  submitHandler = () => {
    const { handleSubmit, onHandleSubmit } = this.props;
    handleSubmit(data => {
      if (onHandleSubmit) {
        onHandleSubmit(data);
      }
    })();
  };

  handleCopyLink() {
    const node = this.copyLinkRef.current;
    node.disabled = false;
    node.select();

    try {
      document.execCommand('copy');
    } catch (err) {
      console.log('Oops, unable to copy');
    }

    node.disabled = true;
  }

  render() {
    const { labels, className, onCloseModal } = this.props;

    return (
      <>
        <div className={className}>
          <Row fullBleed className="elem-mb-MED">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <BodyCopy component="p" fontSize="fs14" fontFamily="secondary" fontWeight="regular">
                {getLabelValue(labels, 'lbl_fav_share_list_msg')}
              </BodyCopy>
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-MED">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <BodyCopy component="p" fontSize="fs14" fontFamily="secondary" fontWeight="semibold">
                {getLabelValue(labels, 'lbl_fav_copy_link_heading')}
              </BodyCopy>
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-LRG">
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <TextBox
                input={{
                  value: 'https://www.xyz',
                  name: 'shareLink',
                }}
                id="shareLink"
                dataLocator="shareLinkforFav"
                ref={this.copyLinkRef}
              />
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-LRG">
            <Col
              colSize={{ small: 4, medium: 4, large: 8 }}
              offsetLeft={{ small: 1, medium: 2, large: 2 }}
              offsetRight={{ small: 1, medium: 2, large: 2 }}
            >
              <Button
                buttonVariation="fixed-width"
                fill="BLUE"
                dataLocator="SaveListFormBtn"
                onClick={this.handleCopyLink}
              >
                {getLabelValue(labels, 'lbl_fav_copyLink')}
              </Button>
            </Col>
          </Row>
          <Row fullBleed className="elem-mb-XL">
            <Col
              colSize={{ small: 4, medium: 4, large: 8 }}
              offsetLeft={{ small: 1, medium: 2, large: 2 }}
              offsetRight={{ small: 1, medium: 2, large: 2 }}
            >
              <Button
                buttonVariation="fixed-width"
                dataLocator="CancelListFormBtn"
                onClick={onCloseModal}
              >
                {getLabelValue(labels, 'btn_fav_cancel')}
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

CopyLink.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
  onHandleSubmit: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
CopyLink.defaultProps = {
  labels: {},
  className: '',
  handleSubmit: () => {},
};

export default CopyLink;
