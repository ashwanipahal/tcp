import { labels } from '../labels/labels';

/**
 * @param {object} history - the current component route history
 * @param {object} match - component's proper navigation details
 * @param {string} toRoute - the route to which the rediction is to be done
 * @description - this method gets all parameter as stated above to route the page as
 * the mentioned toRoute param
 */
export function redirectToRoute(history, match, toRoute) {
  return history.push(`/${match.params.siteId}${toRoute}`);
}

export function getSiteId() {
  const paths = window.location.pathname.split('/', 2);
  return paths[1];
}

export function getHostName() {
  return window.location.hostname;
}

export function getLocationOrigin() {
  return window.location.origin;
}

/**
 * @method getPromotionalMessage - this function checks whether the user is PLCC or not and
 *         returns the message respectively
 * @param isPlcc  boolean value for plcc user
 * @param {handlers}  the messages containing both plcc user message and non-plcc user message
 */
/* eslint-disable */
const getPromotionalMessage = (isPlcc, handlers) => {
  if (!!handlers.promotionalPLCCMessage || !!handlers.promotionalMessage) {
    return isPlcc ? handlers.promotionalPLCCMessage : handlers.promotionalMessage;
  }
};

/**
 * @method getAddToBagFormName - this method returns the form name with productId appending the
 * text 'AddToBagForm-'
 * @param {string} productId - id needs to be append to the add to bag text
 */
const getAddToBagFormName = productId => labels.ADD_TO_BAG_FORM_NAME + productId;

/**
 * @method validateBossEligibility
 * @description checks the bopis product flags for returning the boolean
 * value
 * @param {bool} isBossClearanceProductEnabled this flag is derived through the kill
 * Switch API. If a product is of Clearance then we need to check this kill switch
 * @param {bool} isBossEnabled this flag is a global bopss Enability flag, which is
 * derived from the UserRegisteredInfo API. Backend sends this flag along with
 * validating country and state bopis availability
 * @param {object} miscInfo object data with pickup eligibility of product
 */

function validateBossEligibility({ isBossClearanceProductEnabled, isBossEnabled, miscInfo }) {
  const bossEligibility = isBossEnabled && miscInfo.isBossEligible;
  // adding this check as productDynamicAbstractor and cartDynamicAbstractor return
  // different keys for clearance item identification
  return miscInfo.isClearance || miscInfo.clearanceItem
    ? isBossClearanceProductEnabled && bossEligibility
    : bossEligibility;
}

/**
 * @method validateBopisEligibility
 * @description checks the bopis product flags for returning the boolean
 * value
 * @param {bool} isBopisClearanceProductEnabled this flag is derived through the kill
 * Switch API. If a product is of Clearance then we need to check this kill switch
 * @param {bool} isBopisEnabled this flag is a global bopis Enability flag, which is
 * derived from the UserRegisteredInfo API. Backend sends this flag along with
 * validating country and state bopis availability
 * @param {object} miscInfo object data with pickup eligibility of product
 */
function validateBopisEligibility({ isBopisClearanceProductEnabled, isBopisEnabled, miscInfo }) {
  const bopisEligibility = isBopisEnabled && miscInfo.isBopisEligible;
  // productDynamicAbstractor and cartDynamicAbstractor return different keys for clearance item
  return miscInfo.isClearance || miscInfo.clearanceItem
    ? isBopisClearanceProductEnabled && bopisEligibility
    : bopisEligibility;
}

/*
 * Truncates the given element's text to the number of lines specified.
 * emt: Element to be truncated
 * lines: Number of lines
 */
const lineClamp = (emt, lines) => {
  if (typeof window !== 'undefined') {
    window.clamp(emt, lines);
  }
};

const initLineClamp = () => {
  if (typeof window !== 'undefined' && window.document && window.document.createElement) {
    // the actual meat is here
    let w = window;
    let d = document;
    if (typeof window !== 'undefined' && window.document && window.document.createElement) {
      let clamp;
      let measure;
      let text;
      let lineWidth;
      let lineStart;
      let lineCount;
      let wordStart;
      let line;
      let lineText;
      let wasNewLine;
      let ce = d.createElement.bind(d);
      let ctn = d.createTextNode.bind(d);

      // measurement element is made a child of the clamped element to get it's style
      measure = ce('span');

      measure.style.position = 'absolute'; // prevent page reflow
      measure.style.whiteSpace = 'pre'; // cross-browser width results
      measure.style.visibility = 'hidden'; // prevent drawing

      clamp = function(el, lineClamp) {
        // make sure the element belongs to the document
        if (!el || !el.ownerDocument || !el.ownerDocument === d) return;
        // reset to safe starting values
        lineStart = 0;
        wordStart = 0;
        lineCount = 1;
        wasNewLine = false;
        lineWidth = el.clientWidth;
        // get all the text, remove any line changes
        text = (el.textContent || el.innerText).replace(/\n/g, ' ');
        // remove all content
        while (el.firstChild !== null) {
          el.removeChild(el.firstChild);
        }
        // Revert to original state if lines set to 0
        if (lineClamp === 0 || text.length < 30) {
          line = ce('span');
          // add all text to the line element
          line.appendChild(ctn(text));
          // add the line element to the container
          el.appendChild(line);
          return;
        }
        // add measurement element within so it inherits styles
        el.appendChild(measure);
        // http://ejohn.org/blog/search-and-dont-replace/
        text.replace(/ /g, function(m, pos) {
          // ignore any further processing if we have total lines
          if (lineCount === lineClamp) return;
          // create a text node and place it in the measurement element
          measure.appendChild(ctn(text.substr(lineStart, pos - lineStart)));
          // have we exceeded allowed line width?
          if (lineWidth < measure.clientWidth + 50) {
            if (wasNewLine) {
              // we have a long word so it gets a line of it's own
              lineText = text.substr(lineStart, pos + 1 - lineStart);
              // next line start position
              lineStart = pos + 1;
            } else {
              // grab the text until this word
              lineText = text.substr(lineStart, wordStart - lineStart);
              // next line start position
              lineStart = wordStart;
            }
            // create a line element
            line = ce('span');
            // add text to the line element
            line.appendChild(ctn(lineText));
            // add the line element to the container
            el.appendChild(line);
            // yes, we created a new line
            wasNewLine = true;
            lineCount++;
          } else {
            // did not create a new line
            wasNewLine = false;
          }
          // remember last word start position
          wordStart = pos + 1;
          // clear measurement element
          measure.removeChild(measure.firstChild);
        });
        // remove the measurement element from the container
        el.removeChild(measure);
        // create the last line element
        line = ce('span');
        // give styles required for text-overflow to kick in
        line.className += 'text-ellipsis';

        // add all remaining text to the line element
        line.appendChild(ctn(text.substr(lineStart)));
        // add the line element to the container
        el.appendChild(line);
      };
      w.clamp = clamp;
    }
  }
};

export {
  getPromotionalMessage,
  getAddToBagFormName,
  validateBossEligibility,
  validateBopisEligibility,
  lineClamp,
  initLineClamp,
};
