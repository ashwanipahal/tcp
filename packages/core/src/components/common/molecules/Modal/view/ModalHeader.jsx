// @flow
import React, { Fragment } from 'react';
import ModalCloseIcon from './ModalCloseIcon';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';

type Props = {
  heading: String,
  closeFunc: Function,
  title: String,
};
const ModalHeader = ({ closeFunc, title, heading }: Props) => (
  <Fragment>
    <ModalCloseIcon closeFunc={closeFunc} />
    <BodyCopy bodySize="five" fontWeight="black" tag="h2" className="Modal_Heading">
      {heading}
    </BodyCopy>
    <BodyCopy
      bodySize="seven"
      fontWeight="bold"
      fontFamily="secondaryFontFamily"
      className="Modal_Title"
    >
      {title}
    </BodyCopy>
  </Fragment>
);

export default ModalHeader;
