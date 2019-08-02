/**   Sample Usage:

LabelsUtil.getLabel(labels, 'header.headingText')
LabelsUtil.getLabel(labels, 'header.headingText', ['2'])

*/
const LabelsUtil = {
  /**
   * Get the label by key
   * @param  {object} labelState - The label state object that contains the label
   * @param  {string} labelKey - The key to look up the value in the label state
   * @param  {[*]} [placeholderValues] - The values to replace any placeholders that may exist in the label - see replacePlaceholderValues()
   * @return {string} - The value of the label.  If value is undefined, the passed in label key is returned.
   */

  getLabel(labelState, labelKey, placeholderValues) {
    let labelValue = labelKey;
    const updatedLabel = labelValue.split('.');
    let label = labelState;
    updatedLabel.forEach(newLabelKey => {
      label = label ? label[newLabelKey] : '';
    });
    if (labelState && typeof label === 'string') {
      labelValue = label;
    }
    if (placeholderValues && placeholderValues.length) {
      labelValue = LabelsUtil.replacePlaceholderValues(labelValue, placeholderValues);
    }
    return labelValue || labelKey;
  },

  /**
   * Replace something like "You have added {0} items in cart" to "You have added 3 items in cart"
   * @param  {[type]} labelStr          [description]
   * @param  {[type]} placeholderValues [description]
   * @return {[type]}                   [description]
   */
  replacePlaceholderValues(labelStr, placeholderValues, replaceAll) {
    let labelStrNew = labelStr;
    if (!labelStrNew) return '';
    for (let x = 0; x < placeholderValues.length; x += 1) {
      const placeholder = `{${x}}`;
      /* istanbul ignore else */
      if (labelStrNew.indexOf(placeholder) !== -1) {
        labelStrNew = labelStrNew.replace(placeholder, placeholderValues[x]);
      }
      /* istanbul ignore else */
      if (replaceAll) {
        while (labelStrNew.indexOf(placeholder) !== -1) {
          labelStrNew = labelStrNew.replace(placeholder, placeholderValues[x]);
        }
      }
    }
    return labelStrNew;
  },
};

export default LabelsUtil;
