import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/OverlayModal.style';

const propTypes = {
  component: PropTypes.string,
  closeOverlay: PropTypes.func,
  className: PropTypes.string,
  ModalContent: PropTypes.node.isRequired,
  color: PropTypes.shape({}),
};

const defaultProps = {
  component: null,
  closeOverlay: () => {},
  className: '',
  color: '',
};

class OverlayModal extends React.Component {
  constructor(props) {
    super(props);
    const overlayElementWrapper = document.getElementById('overlayWrapper');
    const overlayElement = document.getElementById('overlayComponent');
    const [body] = document.getElementsByTagName('body');
    this.overlayElementWrapper = overlayElementWrapper;
    this.overlayElement = overlayElement;
    this.body = body;
    this.handleWindowClick = this.handleWindowClick.bind(this);
  }

  componentDidMount() {
    this.overlayElementWrapper.style.position = 'relative';
    this.overlayElementWrapper.style.pointerEvents = 'none';
    this.overlayElement.classList.add('overlay');
    this.body.style.overflow = 'hidden';
    /* istanbul ignore else */
    if (window) {
      window.addEventListener('mousedown', this.handleWindowClick);
    }
    this.getCustomStyles();
  }

  componentWillUnmount() {
    this.overlayElementWrapper.style.position = 'static';
    this.overlayElementWrapper.style.pointerEvents = 'auto;';
    if (this.overlayElement) this.overlayElement.classList.remove('overlay');
    this.body.style.overflow = 'visible';
    /* istanbul ignore else */
    if (window) {
      window.removeEventListener('mousedown', this.handleWindowClick);
    }
  }

  getCustomStyles = () => {
    const { component } = this.props;
    const comp = document.getElementById(component);
    /* istanbul ignore else */
    if (comp) {
      const compRectBoundingY = comp.getBoundingClientRect().y;
      const compHeight = comp.getBoundingClientRect().height;
      const compRectBoundingX = comp.getBoundingClientRect().x;
      const compWidth = comp.getBoundingClientRect().width;
      const modal = document.getElementById('dialogContent');
      modal.style.maxHeight = window && `${window.innerHeight - 200}px`;
      const modalWrapper = document.getElementById('modalWrapper');
      const modalTriangle = document.getElementById('modalTriangle');
      const modalRectBoundingX = modal && modal.getBoundingClientRect().x;
      /* istanbul ignore else */
      if (compRectBoundingY) {
        modalWrapper.style.top = `${compRectBoundingY + compHeight + 12}px`;
      }
      /* istanbul ignore else */
      if (compRectBoundingX && compWidth && modalRectBoundingX && modalTriangle) {
        modalTriangle.style.left = `${compRectBoundingX -
          modalRectBoundingX +
          compWidth / 2 -
          8}px`;
      }
    }
  };

  closeModal = () => {
    const { closeOverlay } = this.props;
    closeOverlay();
  };

  /**
   * Set the wrapper ref
   */
  setModalRef = node => {
    this.modalRef = node;
  };

  handleWindowClick(e) {
    /* istanbul ignore else */
    if (this.modalRef && !this.modalRef.contains(e.target)) {
      this.closeModal();
    }
  }

  render() {
    const { className, ModalContent, color } = this.props;
    return (
      <div className={className} id="modalWrapper" color={color} ref={this.setModalRef}>
        <div id="dialogContent" className="dialog__content">
          <div className="modal__triangle" id="modalTriangle" />
          <div className="modal__bar" />
          <ModalContent className="modal__content" />
        </div>
      </div>
    );
  }
}

OverlayModal.propTypes = propTypes;
OverlayModal.defaultProps = defaultProps;

export default withStyles(OverlayModal, styles);

export { OverlayModal as OverlayModalVanilla };
