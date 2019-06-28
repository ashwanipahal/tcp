/** @module Modal
 *  @summary Wrapper component for react-modal.
 *  Accepts modal content as children and
 *  Other properties of modal to funtion.
 */

import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Grid from '../../Grid';
import Row from '../../../atoms/Row';
import Col from '../../../atoms/Col';
import errorBoundary from '../../../hoc/errorBoundary';
import ModalHeader from './ModalHeader';
import ModalStyle from '../Modal.style';
import Config from '../config';

function getParent() {
  return document.querySelector('.TCPModal__Wrapper');
}

const Modal = ({ children, ...otherProps }) => {
  const { colSet, onRequestClose, title } = otherProps;
  const column = colSet || Config.MODAL_COL_DEFAULTS;

  return (
    <ModalStyle className="TCPModal__Wrapper">
      <ReactModal {...otherProps} parentSelector={getParent}>
        <Grid>
          <Row>
            <Col colSize={column} className="TCPModal__InnerContent">
              <ModalHeader closeFunc={onRequestClose} title={title} />
              {children}
            </Col>
          </Row>
        </Grid>
      </ReactModal>
    </ModalStyle>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default errorBoundary(Modal);
