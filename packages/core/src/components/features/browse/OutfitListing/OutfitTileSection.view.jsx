import React from 'react';
import { PropTypes } from 'prop-types';
import OutfitTileSectionStyle, { outFitSkeletonCss } from './OutfitTileSection.style';
import withStyles from '../../../common/hoc/withStyles';
import BodyCopy from '../../../common/atoms/BodyCopy';
import OutfitTile from './OutfitTile';
import { Skeleton } from '../../../common/atoms';

const getOutfitTile = (outfitTile, asPath, labels, className) => {
  return (
    outfitTile &&
    outfitTile.map(item => (
      <OutfitTile className={className} item={item} labels={labels} asPath={asPath} />
    ))
  );
};

const OutfitTileSection = props => {
  const {
    className,
    asPath,
    outfitDetails,
    outfitDetails: { isFetchingDataForOutfit },
    labels,
  } = props;
  const outfitTile = outfitDetails[asPath];

  return (
    <div className={className}>
      <BodyCopy
        className="outfit-title"
        fontSize="fs16"
        fontFamily="secondary"
        fontWeight="semibold"
      >
        {labels.lbl_outfit_label}
      </BodyCopy>
      <div className={`${className} outfit-section-wrapper`}>
        {getOutfitTile(outfitTile, asPath, labels)}
        {isFetchingDataForOutfit ? (
          <Skeleton
            col={6}
            inheritedStyles={outFitSkeletonCss}
            rowProps={{ justifyContent: 'space-around', marginTop: '10px' }}
          />
        ) : null}
      </div>
    </div>
  );
};

OutfitTileSection.propTypes = {
  className: PropTypes.string,
  asPath: PropTypes.string,
  outfitDetails: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array])),
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

OutfitTileSection.defaultProps = {
  className: '',
  asPath: '',
  outfitDetails: {},
  labels: {},
};

export default withStyles(OutfitTileSection, OutfitTileSectionStyle);
