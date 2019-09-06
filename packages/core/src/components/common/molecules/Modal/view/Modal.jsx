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
// import errorBoundary from '../../../hoc/errorBoundary';
function getParent() {
  // eslint-disable-next-line no-extra-boolean-cast
  return !!document.querySelector('.checkout-pages')
    ? document.querySelector('#overlayWrapper .TCPModal__Wrapper')
    : document.querySelector('.TCPModal__Wrapper');
}

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
    } = otherProps;
    const column = colSet || Config.MODAL_COL_DEFAULTS;
    return (
      <div className={className}>
        <div className="TCPModal__Wrapper">
          <ReactModal
            {...otherProps}
            parentSelector={getParent}
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
                    className="TCPModal__InnerContent"
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
              <div className="TCPModal__InnerContent" data-locator={dataLocator}>
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
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

// TODO removed errorBoundary from modal as its not working properly right now
export default withStyles(Modal, styles);
export { Modal as ModalVanilla };
