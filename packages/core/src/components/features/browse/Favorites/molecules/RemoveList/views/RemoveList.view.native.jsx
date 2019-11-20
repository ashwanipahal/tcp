import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Button from '@tcp/core/src/components/common/atoms/Button';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Container from '../styles/RemoveList.style.native';

const RemoveList = ({ labels, onRemoveList, margins, onCloseModal }) => {
  return (
    <Container margins={margins}>
      <BodyCopy
        margin="0 30px 0 30px"
        dataLocator="fav_brand_title"
        mobileFontFamily="secondary"
        fontSize="fs22"
        fontWeight="regular"
        color="gray.900"
        textAlign="center"
        text={getLabelValue(labels, 'lbl_fav_remove_list_msg')}
      />
      <Button
        margin="60px 0 0 0"
        fill="BLUE"
        type="submit"
        color="white"
        onPress={onRemoveList}
        text={getLabelValue(labels, 'btn_fav_yes_remove')}
      />
      <Button
        margin="24px 0 0 0"
        fill="WHITE"
        type="submit"
        onPress={onCloseModal}
        text={getLabelValue(labels, 'btn_fav_no')}
      />
    </Container>
  );
};

RemoveList.propTypes = {
  labels: PropTypes.shape({}),
  onRemoveList: PropTypes.func.isRequired,
  margins: PropTypes.string,
  onCloseModal: PropTypes.func,
};

RemoveList.defaultProps = {
  labels: {},
  margins: null,
  onCloseModal: () => {},
};

export default RemoveList;
export { RemoveList as RemoveListVanilla };
