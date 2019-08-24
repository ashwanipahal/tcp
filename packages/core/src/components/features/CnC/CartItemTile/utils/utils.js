const getModifiedString = (labels, store, orderItemType, bossStartDate, bossEndDate) => {
  let modifiedString = '';
  if (orderItemType === 'BOPIS') {
    modifiedString = `${labels.bopisLabel.replace('#store#', `${store}`)}`;
  } else {
    let str = labels.bossLabel;
    const mapObj = {
      '#store#': store,
      '#startMonth#': bossStartDate.get('month'),
      '#startdate#': bossStartDate.get('date'),
      '#endMonth#': bossEndDate.get('month'),
      '#enddate#': bossEndDate.get('date'),
    };
    str = str.replace(/#store#|#startMonth#|#startdate#|#endMonth#|#enddate#/gi, matched => {
      return mapObj[matched];
    });
    modifiedString = str;
  }
  return modifiedString;
};

export default getModifiedString;
