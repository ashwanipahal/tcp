import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Button from '@tcp/core/src/components/common/atoms/Button';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Container from '../styles/CopyLink.style.native';

const CopyLink = ({ labels, onCopyLink, margins, onCloseModal }) => {
  return (
    <Container margins={margins}>
      <BodyCopy
        margin="0 30px 0 30px"
        dataLocator="fav_brand_title"
        mobileFontFamily="secondary"
        fontSize="fs14"
        fontWeight="regular"
        color="gray.900"
        textAlign="center"
        text={getLabelValue(labels, 'lbl_fav_share_list_msg')}
      />
      <Button
        margin="60px 0 0 0"
        fill="BLUE"
        type="submit"
        color="white"
        onPress={onCopyLink}
        text={getLabelValue(labels, 'lbl_fav_copyLink')}
      />
      <Button
        margin="24px 0 0 0"
        fill="WHITE"
        type="submit"
        onPress={onCloseModal}
        text={getLabelValue(labels, 'btn_fav_cancel')}
      />
    </Container>
  );
};

CopyLink.propTypes = {
  labels: PropTypes.shape({}),
  onCopyLink: PropTypes.func.isRequired,
  margins: PropTypes.string,
  onCloseModal: PropTypes.func,
};

CopyLink.defaultProps = {
  labels: {},
  margins: null,
  onCloseModal: () => {},
};

export default CopyLink;
export { CopyLink as CopyLinkVanilla };
