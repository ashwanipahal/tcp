import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from './OverlayModal.style';

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
    const [body] = document.getElementsByTagName('body');
    this.body = body;
    this.handleWindowClick = this.handleWindowClick.bind(this);
  }

  componentDidMount() {
    this.body.classList.add('overlay');
    /* istanbul ignore else */
    if (window) {
      window.addEventListener('mousedown', this.handleWindowClick);
    }
    this.getCustomStyles();
  }

  componentWillUnmount() {
    /* istanbul ignore else */
    if (this.body) this.body.classList.remove('overlay');
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
      const modal = document.getElementById('dialog__content');
      const modalTriangle = document.getElementById('modal__triangle');
      const modalRectBoundingX = modal && modal.getBoundingClientRect().x;
      /* istanbul ignore else */
      if (compRectBoundingY) {
        modal.style.top = `${compRectBoundingY + compHeight + 12}px`;
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
      <div className={className} id="modal__wrapper" color={color} ref={this.setModalRef}>
        <div id="dialog__content" className="dialog__content">
          <div className="modal__triangle" id="modal__triangle" />
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
