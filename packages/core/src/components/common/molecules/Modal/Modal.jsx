/** @module Modal
 *  @summary Wrapper component for react-modal.
 *  Accepts modal content as children and
 *  Other properties of modal to funtion.
 */

import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import ModalStyle from './ModalStyle';
import Config from './config';

function getParent() {
  return document.querySelector('.TCPModal_Wrapper');
}

const Modal = ({ children, ...otherProps }) => {
  const { colSet } = otherProps;
  const column = colSet || Config.MODAL_DEFAULTS;

  return (
    <ModalStyle className="TCPModal_Wrapper">
      <ReactModal {...otherProps} parentSelector={getParent}>
        <Grid>
          <Row>
            <Col colSize={column} className="TCPModal__InnerContent">
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

export default Modal;
