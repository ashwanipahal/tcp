// @flow
import React, { Fragment } from 'react';
import ModalCloseIcon from './ModalCloseIcon';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';

type Props = {
  heading: string,
  closeFunc: Function,
  closeIconDataLocator: string,
};
const ModalHeader = ({ closeFunc, heading, closeIconDataLocator }: Props) => (
  <Fragment>
    <ModalCloseIcon closeFunc={closeFunc} closeIconDataLocator={closeIconDataLocator} />
    {heading && (
      <BodyCopy bodySize="five" fontWeight="black" tag="h2" className="Modal_Heading">
        {heading}
      </BodyCopy>
    )}
  </Fragment>
);

export default ModalHeader;
