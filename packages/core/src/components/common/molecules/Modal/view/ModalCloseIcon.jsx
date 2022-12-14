import React from 'react';
import { css } from 'styled-components';
import PropTypes from 'prop-types';
import { getIconPath } from '@tcp/core/src/utils';
import withStyles from '../../../hoc/withStyles';

const CloseButtonStyle = css`
  background: transparent url(${getIconPath('modal-close')}) no-repeat 0 0;
  border: none;
  cursor: pointer;
  position: absolute;
  padding: 10px 7px 13px 6px;
  background-size: 100% 100%;
  width: 15px;
  height: 15px;
  &.alignRight {
    right: 32px;
  }
  &.alignLeft {
    left: 15px;
  }
`;

const ModalCloseIcon = ({ className, closeFunc, closeIconDataLocator, closeIconLeftAligned }) => (
  <button
    aria-label="close"
    className={`${className} ${'alignTop'} ${closeIconLeftAligned ? 'alignLeft' : 'alignRight'}`}
    onClick={e => closeFunc(e)}
    data-locator={closeIconDataLocator}
  />
);

ModalCloseIcon.propTypes = {
  className: PropTypes.string.isRequired,
  closeFunc: PropTypes.func.isRequired,
  closeIconDataLocator: PropTypes.string,
  closeIconLeftAligned: PropTypes.bool,
};

ModalCloseIcon.defaultProps = {
  closeIconDataLocator: 'close',
  closeIconLeftAligned: false,
};

export default withStyles(ModalCloseIcon, CloseButtonStyle);
export { ModalCloseIcon as ModalCloseIconVanilla };
