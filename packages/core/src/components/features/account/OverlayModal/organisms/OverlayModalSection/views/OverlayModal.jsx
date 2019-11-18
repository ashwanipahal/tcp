import React from 'react';
import PropTypes from 'prop-types';
import * as scopeTab from 'react-modal/lib/helpers/scopeTab';
import { Modal } from '@tcp/core/src/components/common/molecules';
import { getViewportInfo, isMobileWeb, isCanada, getLabelValue } from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/OverlayModal.style';

const propTypes = {
  component: PropTypes.string,
  closeOverlay: PropTypes.func,
  className: PropTypes.string,
  ModalContent: PropTypes.node.isRequired,
  color: PropTypes.shape({}),
  componentProps: PropTypes.shape({}).isRequired,
  showCondensedHeader: PropTypes.bool.isRequired,
  labels: PropTypes.shape({
    lbl_login_loginCTA: PropTypes.string,
    lbl_login_createAccountCTA: PropTypes.string,
  }),
};

const defaultProps = {
  component: null,
  closeOverlay: () => {},
  className: '',
  color: '',
  labels: PropTypes.shape({
    lbl_login_loginCTA: '',
    lbl_login_createAccountCTA: '',
  }),
};

const TAB_KEY = 9;

class OverlayModal extends React.Component {
  constructor(props) {
    super(props);
    const overlayElementWrapper = document.getElementById('overlayWrapper');
    const overlayElement = document.getElementById('overlayComponent');
    const bodyContainer = document.querySelector('.non-checkout-pages');
    this.overlayElementWrapper = overlayElementWrapper;
    this.overlayElement = overlayElement;
    this.bodyContainer = bodyContainer;
    const [body] = document.getElementsByTagName('body');
    this.body = body;
    this.isMobile = getViewportInfo().isMobile && isMobileWeb();
    this.handleWindowClick = this.handleWindowClick.bind(this);
    this.keydownInOverlay = this.keydownInOverlay.bind(this);
  }

  componentDidMount() {
    this.overlayElementWrapper.style.position = 'relative';
    this.overlayElementWrapper.style.pointerEvents = 'none';
    this.overlayElement.classList.add('overlay');
    /* istanbul ignore else */
    if (this.body) {
      this.body.addEventListener('click', this.handleWindowClick);
    }
    this.getCustomStyles({ styleModal: true });
    if (this.modalRef) {
      this.modalRef.focus({ preventScroll: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { component: nextTargetComponent, showCondensedHeader: nextCondensedState } = this.props;
    const { component: prevTargetComponent, showCondensedHeader: prevCondensedState } = prevProps;
    const modal = document.getElementById('dialogContent');
    if (nextTargetComponent !== prevTargetComponent) {
      modal.scrollTo(0, 0);
      return this.getCustomStyles({ styleModal: false });
    }

    if (nextCondensedState !== prevCondensedState) {
      this.getCustomStyles({ styleModal: true });
    }

    this.isMobile = getViewportInfo().isMobile && isMobileWeb();

    if (!this.isMobile) {
      modal.addEventListener('keydown', this.keydownInOverlay);
    }

    if (this.isMobile && nextTargetComponent === 'accountDrawer') {
      document
        .querySelectorAll('#overlayWrapper, .header-promo__container, footer')
        .forEach(element => element.setAttribute('aria-hidden', 'true'));
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
      this.body.removeEventListener('click', this.handleWindowClick);
      this.body.style['overflow-y'] = '';
    }
    const modal = document.getElementById('dialogContent');
    modal.removeEventListener('keydown', this.keydownInOverlay);
    this.resetBodyScrollStyles();
    document
      .querySelectorAll('#overlayWrapper, .header-promo__container, footer')
      .forEach(element => element.removeAttribute('aria-hidden'));
  }

  getHeading = () => {
    const { labels, component, componentProps } = this.props;
    if (component === 'login' && componentProps.currentForm !== 'forgotPassword') {
      return getLabelValue(labels, 'lbl_login_loginCTA');
    }
    if (component === 'createAccount') {
      return getLabelValue(labels, 'lbl_login_createAccountCTA');
    }
    return '';
  };

  /**
   * Set Left position of modal triangle
   * @param {*} comp
   */

  // eslint-disable-next-line complexity
  styleModalTriangle = ({ comp }) => {
    const { showCondensedHeader, component } = this.props;
    if (this.isMobile && component !== 'accountDrawer') return;
    const compRectBoundingX = comp.getBoundingClientRect().x;
    const compWidth = comp.getBoundingClientRect().width / 2;
    const modal = document.getElementById('dialogContent');
    const modalRectBoundingX = modal && modal.getBoundingClientRect().x;
    const modalTriangle = document.getElementById('modalTriangle');
    const modalTrianglePos = modalTriangle && window && modalTriangle.getBoundingClientRect().y;
    /* istanbul ignore else */
    if (window && window.innerWidth > 767) {
      if (showCondensedHeader && this.body) {
        modal.style.height = `${window.innerHeight - 70}px`;
      } else {
        modal.style.height = `${window.innerHeight - (modalTrianglePos + 20)}px`;
      }
      this.body.style.overflow = 'hidden';
    }

    /* istanbul ignore else */
    /* set scroll height in mobile view */
    if (window && window.innerWidth < 767) {
      this.bodyContainer.style.height = `${modal.offsetHeight}px`;
      this.bodyContainer.style.overflow = 'hidden';
    }
    /* istanbul ignore else */
    if (
      !showCondensedHeader &&
      compRectBoundingX &&
      compWidth &&
      modalRectBoundingX &&
      modalTriangle
    ) {
      modalTriangle.style.left = `${compRectBoundingX + compWidth - modalRectBoundingX - 10}px`;
    } else {
      modalTriangle.style.left = 'auto';
    }
  };

  getCustomStyles = ({ styleModal }) => {
    const { component, showCondensedHeader } = this.props;
    if (this.isMobile && component !== 'accountDrawer') return;
    let comp = document.getElementById(component);
    if (component === 'accountDrawer' && showCondensedHeader) {
      comp = document.getElementById('condensedLogin');
    }
    /* istanbul ignore else */
    if (comp && window) {
      const compRectBoundingY = comp.getBoundingClientRect().y + window.scrollY;
      const compHeight = comp.getBoundingClientRect().height;
      const modalWrapper = document.getElementById('modalWrapper');
      /* istanbul ignore else */
      if (styleModal && compRectBoundingY) {
        modalWrapper.style.top = `${compRectBoundingY + compHeight + 12}px`;
      }
      if (component === 'accountDrawer') {
        comp = document.getElementById('account-info-user-points');
        this.styleModalTriangle({ comp });
      } else {
        this.styleModalTriangle({ comp });
      }
    }
  };

  closeModal = () => {
    const { closeOverlay } = this.props;
    closeOverlay();
    if (this.body) {
      this.body.style['overflow-y'] = '';
    }
    this.resetBodyScrollStyles();
  };

  /**
   * Set the wrapper ref
   */
  setModalRef = node => {
    this.modalRef = node;
  };

  /**
   * Reset Body scroll styles
   */
  resetBodyScrollStyles = () => {
    this.bodyContainer.style.height = '';
    this.bodyContainer.style.overflow = '';
  };

  /**
   * Bind Tab key Down
   */
  keydownInOverlay(event) {
    if (event.keyCode === TAB_KEY) {
      scopeTab(this.modalRef, event);
    }
  }

  handleWindowClick(e) {
    /* istanbul ignore else */
    if (
      this.modalRef &&
      !this.modalRef.contains(e.target) &&
      !e.target.closest('.TCPModal__InnerContent') // TODO: find a better way to handle - prevent close overlay when click on popup modal
    ) {
      this.closeModal();
      e.stopImmediatePropagation();
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

    const modalHeading = {
      className: 'Modal_Heading_Overlay',
    };

    const headingForMobile = this.getHeading();
    const headingProps = headingForMobile
      ? {
          heading: headingForMobile,
          headingStyle: modalHeading,
        }
      : {};

    return this.isMobile && component !== 'accountDrawer' ? (
      <div>
        <Modal
          contentRef={this.setModalRef}
          isOpen
          className={className}
          overlayClassName="TCPModal__Overlay"
          onRequestClose={this.closeModal}
          noPadding
          id="modalWrapper"
          widthConfig={{ small: '100%' }}
          heightConfig={{ minHeight: '500px' }}
          {...headingProps}
        >
          <div
            id="dialogContent"
            className={`dialog__content ${showCondensedHeader && 'condensed-overlay'}`}
          >
            <ModalContent className="modal__content" {...componentProps} />
          </div>
        </Modal>
      </div>
    ) : (
      <div
        className={className}
        id="modalWrapper"
        color={color}
        ref={this.setModalRef}
        tabIndex="-1"
      >
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
            className={`${
              isCanada() ? 'triangle-ca-no-theme ' : 'triangle-theme'
            } modal__triangle hide-on-mobile ${showCondensedHeader && 'condensed-modal-triangle'}`}
            id="modalTriangle"
          />
          <div className={`${isCanada() ? 'ca-no-theme' : 'mpr-plcc-theme'} modal__bar`} />
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
