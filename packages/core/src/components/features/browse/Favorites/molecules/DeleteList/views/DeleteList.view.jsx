import React from 'react';
import { PropTypes } from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Row, Col, Button, BodyCopy } from '@tcp/core/src/components/common/atoms';

class DeleteList extends React.PureComponent {
  render() {
    const { labels, className, hideDeleteModal, onDeleteList } = this.props;

    return (
      <>
        <Row fullBleed className={`${className} elem-mb-XXXL`}>
          <Col
            colSize={{ small: 4, medium: 6, large: 10 }}
            offsetLeft={{ small: 1, medium: 1, large: 1 }}
            offsetRight={{ small: 1, medium: 1, large: 1 }}
          >
            <BodyCopy
              component="h3"
              fontSize="fs22"
              fontFamily="secondary"
              fontWeight="bold"
              textAlign="center"
            >
              {getLabelValue(labels, 'lbl_fav_remove_list_msg')}
            </BodyCopy>
          </Col>
        </Row>
        <Row fullBleed className="elem-mb-LRG">
          <Col
            colSize={{ small: 4, medium: 6, large: 10 }}
            offsetLeft={{ small: 1, medium: 1, large: 1 }}
            offsetRight={{ small: 1, medium: 1, large: 1 }}
          >
            <Button
              buttonVariation="fixed-width"
              type="submit"
              fill="BLUE"
              dataLocator="DeleteListFormBtn"
              onClick={onDeleteList}
            >
              {getLabelValue(labels, 'btn_fav_yes_remove')}
            </Button>
          </Col>
        </Row>
        <Row fullBleed className="add-list-cancel">
          <Col
            colSize={{ small: 4, medium: 6, large: 10 }}
            offsetLeft={{ small: 1, medium: 1, large: 1 }}
            offsetRight={{ small: 1, medium: 1, large: 1 }}
          >
            <Button
              buttonVariation="fixed-width"
              dataLocator="NoDeleteListFormBtn"
              onClick={hideDeleteModal}
            >
              {getLabelValue(labels, 'btn_fav_no')}
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}

DeleteList.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
  onHandleSubmit: PropTypes.func.isRequired,
  hideDeleteModal: PropTypes.func.isRequired,
};
DeleteList.defaultProps = {
  labels: {},
  className: '',
  handleSubmit: () => {},
};

export default DeleteList;
