import React from 'react';
import { reduxForm } from 'redux-form';
import CardTile from './CardTile.view';
// @flow

type Props = {
  labels: {},
  giftcard: any,
}; // giftCards comment for time being
const CardTileWrapper = ({ giftcard }: Props) => {
  return (
    <React.fragment>
      {reduxForm({ form: `CardTile-${giftcard.creditCardId}` })(CardTile)}
    </React.fragment>
  );
};

export default CardTileWrapper;
