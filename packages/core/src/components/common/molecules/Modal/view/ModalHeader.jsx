// @flow
import React from 'react';
import ModalCloseIcon from './ModalCloseIcon';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';

type Props = {
  heading: string,
  closeFunc: Function,
  closeIconDataLocator: string,
  headingStyle?: any,
  closeIconLeftAligned: boolean,
  dataLocatorHeader: string,
};
const ModalHeader = ({
  closeFunc,
  heading,
  closeIconDataLocator,
  headingStyle,
  closeIconLeftAligned,
  dataLocatorHeader,
}: Props) => {
  return (
    <div className="Modal-Header">
      <ModalCloseIcon
        className="close-modal"
        closeFunc={closeFunc}
        closeIconDataLocator={closeIconDataLocator}
        closeIconLeftAligned={closeIconLeftAligned}
      />
      {heading && (
        <BodyCopy data-locator={dataLocatorHeader} {...headingStyle}>
          {heading}
        </BodyCopy>
      )}
    </div>
  );
};

ModalHeader.defaultProps = {
  headingStyle: {
    bodySize: 'five',
    fontWeight: 'black',
    tag: 'h2',
    className: 'Modal_Heading',
  },
};

export default ModalHeader;
