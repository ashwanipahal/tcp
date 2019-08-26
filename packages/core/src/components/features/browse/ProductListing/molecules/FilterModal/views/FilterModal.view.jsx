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
  classNames: any,
};

class FilterModal extends React.PureComponent<Props> {
  render() {
    const { handleClose, show, children, className, classNames } = this.props;
    const showHideClassName = show
      ? `${className} modal display-block`
      : `${className} modal display-none`;

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <Row centered className="filter-row">
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
                className={classNames}
                data-locator="view_gallery_button"
                onClick={this.toggleFilterIcon}
              >
                FILTER
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
                className="open-filter-button"
                data-locator="view_gallery_button"
              >
                SORT
              </Button>
            </Col>
          </Row>
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
export {FilterModal as FilterModalVanilla}
