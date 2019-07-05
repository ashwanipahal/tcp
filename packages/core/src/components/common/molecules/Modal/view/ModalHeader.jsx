// @flow
import React, { Fragment } from 'react';
import ModalCloseIcon from './ModalCloseIcon';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';

type Props = {
  heading: string,
  closeFunc: Function,
};
const ModalHeader = ({ closeFunc, heading }: Props) => (
  <Fragment>
    <ModalCloseIcon closeFunc={closeFunc} />
    <BodyCopy bodySize="five" fontWeight="black" tag="h2" className="Modal_Heading">
      {heading}
    </BodyCopy>
  </Fragment>
);

export default ModalHeader;
