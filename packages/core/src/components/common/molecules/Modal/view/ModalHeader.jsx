// @flow
import React, { Fragment } from 'react';
import ModalCloseIcon from './ModalCloseIcon';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';

type Props = {
  heading: string,
  closeFunc: Function,
  closeIconDataLocator: string,
  headingStyle?: any
};
const ModalHeader = ({ closeFunc, heading, closeIconDataLocator, headingStyle }: Props) => {
  return (
    <Fragment>
      <ModalCloseIcon closeFunc={closeFunc} closeIconDataLocator={closeIconDataLocator} />
      {heading && (
        <BodyCopy {...headingStyle}>
          {heading}
        </BodyCopy>
      )}
    </Fragment>
  );
}

ModalHeader.defaultProps = {
  headingStyle: {
    bodySize: "five",
    fontWeight: "black",
    tag:"h2",
    className:"Modal_Heading"
  }
};

export default ModalHeader;
