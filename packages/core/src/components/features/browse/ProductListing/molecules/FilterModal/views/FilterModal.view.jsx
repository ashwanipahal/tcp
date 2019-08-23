import React from 'react';
import withStyles from '../../../../../../common/hoc/withStyles';
import FilterModalStyle from '../FilterModal.style';
import { Row, Col, Button } from '../../../../../../common/atoms';

// @flow
type Props = {
  handleClose: any,
  show: boolean,
  children: any,
  className: any,
};

class FilterModal extends React.PureComponent<Props> {
  render() {
    const { handleClose, show, children, className } = this.props;
    const showHideClassName = show
      ? `${className} modal display-block`
      : `${className} modal display-none`;

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <div className="modal-spacing">
            <Row centered>
              <Col
                colSize={{
                  small: 3,
                  medium: 3,
                  large: 3,
                }}
                className="close-button"
              >
                <Button
                  buttonVariation="fixed-width"
                  type="button"
                  className="gallery-button-left"
                  data-locator="view_gallery_button"
                  onClick={handleClose}
                >
                  CLEAR ALL
                </Button>
              </Col>
              <Col
                colSize={{
                  small: 3,
                  medium: 3,
                  large: 3,
                }}
              >
                <Button
                  buttonVariation="fixed-width"
                  type="button"
                  className="gallery-button-left"
                  data-locator="view_gallery_button"
                  fill="BLACK"
                >
                  APPLY
                </Button>
              </Col>
            </Row>
          </div>
        </section>
      </div>
    );
  }
}

export default withStyles(FilterModal, FilterModalStyle);
