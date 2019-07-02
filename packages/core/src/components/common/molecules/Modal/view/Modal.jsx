/** @module Modal
 *  @summary Wrapper component for react-modal.
 *  Accepts modal content as children and
 *  Other properties of modal to function.
 */

import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Grid from '../../Grid';
import Row from '../../../atoms/Row';
import Col from '../../../atoms/Col';
import ModalHeader from './ModalHeader';
import styles from '../Modal.style';
import Config from '../Modal.config';
import withStyles from '../../../hoc/withStyles';

function getParent() {
  return document.querySelector('.TCPModal__Wrapper');
}

const Modal = ({ children, ...otherProps }) => {
  const { colSet, onRequestClose, title, heading, fixedWidth, className } = otherProps;
  const column = colSet || Config.MODAL_COL_DEFAULTS;

  return (
    <div className={className}>
      <div className="TCPModal__Wrapper">
        <ReactModal {...otherProps} parentSelector={getParent}>
          {!fixedWidth && (
            <Grid>
              <Row>
                <Col colSize={column} className="TCPModal__InnerContent">
                  <ModalHeader closeFunc={onRequestClose} title={title} heading={heading} />
                  {children}
                </Col>
              </Row>
            </Grid>
          )}
          {fixedWidth && (
            <div className="TCPModal__InnerContent">
              <ModalHeader closeFunc={onRequestClose} title={title} heading={heading} />
              {children}
            </div>
          )}
        </ReactModal>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default withStyles(Modal, styles);
export { Modal as ModalVanilla };
