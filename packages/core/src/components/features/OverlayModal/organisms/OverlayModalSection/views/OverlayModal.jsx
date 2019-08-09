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
  componentProps: PropTypes.shape({}).isRequired,
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
    this.overlayElementWrapper = overlayElementWrapper;
    this.overlayElement = overlayElement;
    const [body] = document.getElementsByTagName('body');
    this.body = body;
    this.handleWindowClick = this.handleWindowClick.bind(this);
  }

  componentDidMount() {
    this.overlayElementWrapper.style.position = 'relative';
    this.overlayElementWrapper.style.pointerEvents = 'none';
    this.overlayElement.classList.add('overlay');
    /* istanbul ignore else */
    if (this.body) {
      this.body.addEventListener('mousedown', this.handleWindowClick);
    }
    this.getCustomStyles({ styleModal: true });
  }

  componentDidUpdate(prevProps) {
    const { component: nextTargetComponent } = this.props;
    const { component: prevTargetComponent } = prevProps;
    if (nextTargetComponent !== prevTargetComponent) {
      return this.getCustomStyles({ styleModal: false });
    }
    return null;
  }

  componentWillUnmount() {
    this.overlayElementWrapper.style.position = 'static';
    this.overlayElementWrapper.style.pointerEvents = 'auto';
    /* istanbul ignore else */
    if (this.overlayElement) this.overlayElement.classList.remove('overlay');
    /* istanbul ignore else */
    if (this.body) {
      this.body.removeEventListener('mousedown', this.handleWindowClick);
    }
  }

  styleModalTriangle = ({ comp }) => {
    const compRectBoundingX = comp.getBoundingClientRect().x;
    const compWidth = comp.getBoundingClientRect().width;
    const modal = document.getElementById('dialogContent');
    const modalRectBoundingX = modal && modal.getBoundingClientRect().x;
    const modalTriangle = document.getElementById('modalTriangle');
    const modalTrianglePos =
      modalTriangle && window && modalTriangle.getBoundingClientRect().y + window.scrollY;
    modal.style.maxHeight = this.body && `${this.body.clientHeight - modalTrianglePos - 20}px`;
    /* istanbul ignore else */
    if (compRectBoundingX && compWidth && modalRectBoundingX && modalTriangle) {
      modalTriangle.style.left = `${compRectBoundingX - modalRectBoundingX + compWidth / 2 - 8}px`;
    }
  };

  getCustomStyles = ({ styleModal }) => {
    const { component } = this.props;
    const comp = document.getElementById(component);
    /* istanbul ignore else */
    if (comp && window) {
      const compRectBoundingY = comp.getBoundingClientRect().y + window.scrollY;
      const compHeight = comp.getBoundingClientRect().height;
      const modalWrapper = document.getElementById('modalWrapper');
      /* istanbul ignore else */
      if (styleModal && compRectBoundingY) {
        modalWrapper.style.top = `${compRectBoundingY + compHeight + 12}px`;
      }
      this.styleModalTriangle({ comp });
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
    const { className, ModalContent, color, componentProps } = this.props;
    return (
      <div className={className} id="modalWrapper" color={color} ref={this.setModalRef}>
        <div id="dialogContent" className="dialog__content">
          <button
            className="modal__closeIcon hide-on-tablet hide-on-desktop"
            onClick={this.closeModal}
          />
          <div className="modal__triangle hide-on-mobile " id="modalTriangle" />
          <div className="modal__bar hide-on-mobile" />
          <ModalContent className="modal__content" {...componentProps} />
        </div>
      </div>
    );
  }
}

OverlayModal.propTypes = propTypes;
OverlayModal.defaultProps = defaultProps;

export default withStyles(OverlayModal, styles);

export { OverlayModal as OverlayModalVanilla };
