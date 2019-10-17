import React from 'react';
import { PropTypes } from 'prop-types';
import OutfitTileSectionStyle from './OutfitTileSection.style';
import withStyles from '../../../common/hoc/withStyles';
import { BodyCopy, Anchor, Image } from '../../../common/atoms';

const getOutfitTile = outfitTile => {
  return (
    outfitTile &&
    outfitTile.map(item => (
      <div className="outfit-wrapper">
        <Anchor>
          <Image className="outfit-tile-wrapper" src={item.imageUrl} />
          <BodyCopy className="shop-look-label" fontFamily="secondary" fontSize="fs12">
            Shop This Look ›
          </BodyCopy>
        </Anchor>
      </div>
    ))
  );
};

const OutfitTileSection = props => {
  const { className, asPath, outfitDetails } = props;

  const outfitTile = outfitDetails[asPath];
  return (
    <div className={className}>
      <BodyCopy className="outfit-title">OUTFITS</BodyCopy>
      {getOutfitTile(outfitTile)}
      {getOutfitTile(outfitTile)}
      {getOutfitTile(outfitTile)}
      {getOutfitTile(outfitTile)}
      {getOutfitTile(outfitTile)}
    </div>
  );
};

OutfitTileSection.propTypes = {
  className: PropTypes.string,
  asPath: PropTypes.string,
  outfitDetails: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array])),
};

OutfitTileSection.defaultProps = {
  className: '',
  asPath: '',
  outfitDetails: {},
};

export default withStyles(OutfitTileSection, OutfitTileSectionStyle);
