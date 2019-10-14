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

class Modal extends React.PureComponent {
  componentDidMount() {
    // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
    const rootElemId = '__next';
    if (process.env.NODE_ENV !== 'test' && document.getElementById(rootElemId)) {
      ReactModal.setAppElement(`#${rootElemId}`);
    }
  }

  render() {
    const { children, ...otherProps } = this.props;
    const {
      colSet,
      onRequestClose,
      title,
      heading,
      fixedWidth,
      className,
      dataLocator,
      dataLocatorHeader,
      closeIconDataLocator,
      headingStyle,
      closeIconLeftAligned,
      ariaLabelledby,
      ariaDescribedby,
      innerContentClassName = '',
      overlayClassName,
      isOpen,
    } = otherProps;
    const column = colSet || Config.MODAL_COL_DEFAULTS;

    return isOpen ? (
      <ReactModal
        {...otherProps}
        overlayClassName={`${className} ${overlayClassName}`}
        aria={{
          labelledby: ariaLabelledby,
          describedby: ariaDescribedby,
        }}
      >
        {!fixedWidth && (
          <Grid>
            <Row>
              <Col
                colSize={column}
                className={`TCPModal__InnerContent ${innerContentClassName}`}
                data-locator={dataLocator}
              >
                <ModalHeader
                  closeFunc={onRequestClose}
                  title={title}
                  heading={heading}
                  closeIconDataLocator={closeIconDataLocator}
                  closeIconLeftAligned={closeIconLeftAligned}
                  dataLocatorHeader={dataLocatorHeader}
                  headingStyle={headingStyle}
                />
                {children}
              </Col>
            </Row>
          </Grid>
        )}
        {fixedWidth && (
          <div
            className={`TCPModal__InnerContent ${innerContentClassName}`}
            data-locator={dataLocator}
          >
            <ModalHeader
              closeFunc={onRequestClose}
              title={title}
              heading={heading}
              closeIconDataLocator={closeIconDataLocator}
              closeIconLeftAligned={closeIconLeftAligned}
              dataLocatorHeader={dataLocatorHeader}
              headingStyle={headingStyle}
            />
            {children}
          </div>
        )}
      </ReactModal>
    ) : null;
  }
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

// TODO removed errorBoundary from modal as its not working properly right now
export default withStyles(Modal, styles);
export { Modal as ModalVanilla };
