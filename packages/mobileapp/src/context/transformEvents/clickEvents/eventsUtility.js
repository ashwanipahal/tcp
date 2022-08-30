/* eslint-disable */
const getProducts = (prodData, s = {}) => {
  if (!prodData) {
    prodData = [];
  }

  const prods = [];
  for (let i = 0; i < prodData.length; i++) {
    var p = prodData[i],
      thisProd;
    if (p.id) {
      var extPrice = p.extPrice ? p.extPrice.toFixed(2) : '';
      thisProd = ['', p.id, p.quantity || '', extPrice, '', ''];

      var merch = [],
        evts = [];
      if (p.shippingMethod) {
        merch.push('eVar5=' + p.shippingMethod);
      }
      if (p.storeId) {
        merch.push('eVar53=' + p.storeId);
      }
      if (p.outfitId) {
        merch.push('eVar60=' + p.outfitId);
        if (p.stylitics && p.stylitics == 'true') {
          evts.push('event74=1');
          if (p.uniqueOutfitId) {
            evts.push('event95=1');
          }
        } else if (s.prop2 == 'outfit') {
          evts.push('event75=1');
        }
      }
      if (p.offerPrice) {
        evts.push('event137=' + p.offerPrice.toFixed(2));
      }
      if (p.sflExtPrice) {
        evts.push('event136=' + p.sflExtPrice.toFixed(2));
      }
      if (p.price && p.listPrice) {
        merch.push(
          'eVar63=' +
            p.price.toFixed(2) +
            ' ' +
            _dataLayer.currencyCode +
            ':' +
            p.listPrice.toFixed(2) +
            ' ' +
            _dataLayer.currencyCode
        );
      }
      if (p.pricingState) {
        merch.push('eVar67=' + p.pricingState);
      }
      if (p.rating && p.reviews) {
        merch.push('eVar71=' + p.rating + ':' + p.reviews);
      }
      if (p.color) {
        merch.push('eVar77=' + p.color);
      }
      if (p.type) {
        merch.push('eVar80=' + p.type);
      }
      if (p.upc) {
        merch.push('eVar82=' + p.upc);
      }
      if (p.gender) {
        merch.push('eVar83=' + p.gender);
      }
      if (p.size) {
        merch.push('eVar88=' + p.size);
      }
      if (p.colorId) {
        merch.push('eVar89=' + p.colorId);
      }
      if (p.sku) {
        merch.push('eVar95=' + p.sku);
      }
      if (p.position) {
        merch.push('eVar100=' + p.position);
        evts.push('event92=1');
      }
      if (s.prop2 == 'checkout' && s.events && s.events.indexOf('event86') > -1 && !s.eVar3) {
        evts.push('event86=' + extPrice);
      }

      if (s.eVar3) {
        if (p.giftCardAmount) {
          evts.push('event6=' + p.giftCardAmount.toFixed(2));
        }
        if (p.couponAmount) {
          evts.push('event7=' + p.couponAmount.toFixed(2));
        }
        if (p.savingsAmount) {
          evts.push('event22=' + p.savingsAmount.toFixed(2));
        }
        if (p.shippingAmount) {
          evts.push('event78=' + p.shippingAmount.toFixed(2));
        }
        if (p.taxAmount) {
          evts.push('event79=' + p.taxAmount.toFixed(2));
        }
        if (p.netRevenue) {
          evts.push('event99=' + p.netRevenue.toFixed(2));
        }
        if (_dataLayer && _dataLayer.giftType) {
          merch.push('eVar57=' + _dataLayer.giftType);
        }
        if (p.multipleSkus) {
          merch.push('eVar87=' + p.multipleSkus);
        }
      } else {
        if (p.cartPrice) {
          evts.push('event61=' + p.cartPrice.toFixed(2));
        }
      }
      if (p.recsPageType || p.plpClick || p.searchClick || p.recsType) {
        if (p.searchClick && p.searchClick == 'true') {
          evts.push('event83=1');
        }
        if (p.plpClick && p.plpClick == 'true') {
          evts.push('event93=1');
        }
        var cs = false;
        if (p.recsProductId) {
          merch.push('eVar20=' + p.recsProductId);
          cs = true;
        }
        if (p.recsPageType) {
          merch.push('eVar21=' + p.recsPageType);
          cs = true;
        }
        if (p.recsType) {
          merch.push('eVar92=' + p.recsType);
          cs = true;
        }
        if (cs) {
          evts.push('event50=1');
        }
        if (p.features) {
          merch.push('eVar72=' + p.features.toLowerCase());
        }
      }

      if (s.linkName) {
        if (s.linkName.indexOf('wishlist add item') > -1) {
          evts.push('event94=' + extPrice);
        } else if (s.linkName == 'cart add') {
          merch.push('eVar2=' + (p.addType ? p.addType : s.prop2));
          evts.push('event85=' + extPrice);
        }
      }

      thisProd[4] = evts.join('|');
      thisProd[5] = merch.join('|');
      prods.push(thisProd.join(';'));
    }
  }

  if (!s.pageLoaded) {
    if (
      global._dataLayer &&
      _dataLayer.internalCampaignIdList &&
      _dataLayer.internalCampaignIdList.length > 0
    ) {
      var icids = _dataLayer.internalCampaignIdList;
      for (var i = 0; i < icids.length; i++) {
        prods.push(';icidlink;;;event80=1;eVar90=' + icids[i]);
      }
    }
    if (s.eVar19) {
      prods.push(';icidlink;;;event81=1;eVar90=' + s.eVar19);
    }
  }

  return prods.join(',');
};

export default getProducts;
