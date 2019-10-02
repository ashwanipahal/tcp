import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/OverlayModal.style';
import { scrollPage } from '../../../../../../utils';

const propTypes = {
  component: PropTypes.string,
  closeOverlay: PropTypes.func,
  className: PropTypes.string,
  ModalContent: PropTypes.node.isRequired,
  color: PropTypes.shape({}),
  componentProps: PropTypes.shape({}).isRequired,
  showCondensedHeader: PropTypes.bool.isRequired,
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
      this.body.classList.add('no-scroll');
    }
    this.getCustomStyles({ styleModal: true });
  }

  componentDidUpdate(prevProps) {
    const { component: nextTargetComponent, showCondensedHeader: nextCondensedState } = this.props;
    const { component: prevTargetComponent, showCondensedHeader: prevCondensedState } = prevProps;
    if (nextTargetComponent !== prevTargetComponent) {
      scrollPage();
      return this.getCustomStyles({ styleModal: false });
    }

    if (nextCondensedState !== prevCondensedState) {
      this.getCustomStyles({ styleModal: true });
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
      this.body.classList.remove('no-scroll');
    }
  }

  /**
   * Set Left position of modal triangle
   * @param {*} comp
   */

  // eslint-disable-next-line complexity
  styleModalTriangle = ({ comp }) => {
    const { showCondensedHeader } = this.props;
    const compRectBoundingX = comp.getBoundingClientRect().x;
    const compWidth = comp.getBoundingClientRect().width / 2;
    const modal = document.getElementById('dialogContent');
    const modalRectBoundingX = modal && modal.getBoundingClientRect().x;
    const modalTriangle = document.getElementById('modalTriangle');
    const modalTrianglePos =
      modalTriangle && window && modalTriangle.getBoundingClientRect().y + window.scrollY;
    /* istanbul ignore else */
    if (window && window.innerWidth > 767) {
      if (showCondensedHeader && this.body) {
        modal.style.height = `${window.innerHeight - 70}px`;
      } else {
        modal.style.height = `${window.innerHeight - modalTrianglePos}px`;
      }
      this.body.style.overflow = 'hidden';
    }
    /* istanbul ignore else */
    if (
      !showCondensedHeader &&
      compRectBoundingX &&
      compWidth &&
      modalRectBoundingX &&
      modalTriangle
    ) {
      modalTriangle.style.left = `${compRectBoundingX + compWidth - modalRectBoundingX}px`;
    } else {
      modalTriangle.style.left = 'auto';
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
    if (this.body) {
      this.body.style.overflow = 'auto';
    }
  };

  /**
   * Set the wrapper ref
   */
  setModalRef = node => {
    this.modalRef = node;
  };

  handleWindowClick(e) {
    /* istanbul ignore else */
    if (
      this.modalRef &&
      !this.modalRef.contains(e.target) &&
      !e.target.closest('.TCPModal__InnerContent')
    ) {
      this.closeModal();
    }
  }

  render() {
    const {
      className,
      ModalContent,
      color,
      componentProps,
      component,
      showCondensedHeader,
    } = this.props;

    return (
      <div className={className} id="modalWrapper" color={color} ref={this.setModalRef}>
        <div
          id="dialogContent"
          className={`dialog__content ${showCondensedHeader && 'condensed-overlay'}`}
        >
          <button
            className={`modal__closeIcon hide-on-tablet hide-on-desktop ${
              component === 'accountDrawer' ? 'hide-on-mobile' : ''
            }`}
            onClick={this.closeModal}
          />
          <div
            className={`modal__triangle hide-on-mobile ${showCondensedHeader &&
              'condensed-modal-triangle'}`}
            id="modalTriangle"
          />
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
