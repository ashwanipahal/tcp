const getModifiedString = (labels, store, orderItemType, bossStartDate, bossEndDate) => {
  let modifiedString = '';
  if (orderItemType === 'BOPIS') {
    modifiedString = `${labels.bopisLabel.replace('#store#', `${store}`)}`;
  } else {
    let str = labels.bossLabel;
    const mapObj = {
      '#store#': 'dog',
      '#startMonth#': bossStartDate.month,
      '#startdate#': bossStartDate.date,
      '#endMonth#': bossEndDate.month,
      '#enddate#': bossEndDate.date,
    };
    str = str.replace(
      /#store#|"#startMonth#"|"#startdate#"|"#endMonth#"|"#enddate#"/gi,
      matched => {
        return mapObj[matched];
      }
    );
    modifiedString = str;
  }
  return modifiedString;
};

export default getModifiedString;
