/* ============================================
   Cherry Creek — Opposition Letter App Logic
   ============================================ */

var TO_PLANNING = 'mlmartin@valdostacity.com';
var COUNCIL_EMAILS = [
  'sjmatheson@valdostacity.com',
  'vmiller-cody@valdostacity.com',
  'stooley@valdostacity.com',
  'tmcintyre@valdostacity.com',
  'ehoward@valdostacity.com',
  'tcarroll@valdostacity.com',
  'agibbs@valdostacity.com',
  'nharden@valdostacity.com'
];
var TO_COUNCIL = COUNCIL_EMAILS.join(',');
var SUBJECT = 'Opposition to Rezoning Case VA-2026-02';

/* ---- Helpers ---- */
function val(id) { return document.getElementById(id).value.trim(); }

function blank(id, label) {
  var v = val(id);
  if (v) return '<span class="blank filled">' + v + '</span>';
  return '<span class="blank">' + label + '</span>';
}

function raw(id, fallback) {
  var v = val(id);
  return v || fallback;
}

/* ---- Live Preview ---- */
function update() {
  var ccChecked = document.getElementById('cc-council').checked;
  var ccDisplay = document.getElementById('cc-display');
  if (ccDisplay) ccDisplay.style.display = ccChecked ? 'flex' : 'none';

  var addressBlock =
    '<div class="address-block">' +
      blank('f-date','[Date]') + '<br><br>' +
      'Greater Lowndes Planning Commission<br>' +
      'c/o Valdosta Planning Division<br>' +
      '300 North Lee Street<br>' +
      'Valdosta, Georgia 31603' +
      (ccChecked ? '<br><br><em>CC: Valdosta Mayor and City Council<br>216 East Central Avenue, Valdosta, Georgia 31601</em>' : '') +
    '</div>';

  var reLine = '<p class="re-line"><strong>RE:</strong> Opposition to Rezoning Request VA-2026-02</p>';

  var salutation = '<p>Dear Members of the Planning Commission' + (ccChecked ? ' and Mayor and City Council' : '') + ':</p>';

  var body =
    '<p>I am a resident of ' + blank('f-address','[Your Address]') + ', and I am writing in strong opposition to Rezoning Case VA-2026-02, the request by RST Construction to rezone approximately 5.20 acres on the north side of Lake Laurie Drive from Single-Family Residential (R-15) to Multi-Family Residential (R-M).</p>' +

    '<h4>1. Incompatible with Established Residential Character</h4>' +
    '<p>The surrounding neighborhood consists of large, single-family estate homes on lots of one to two acres or more, with homes typically ranging from 3,000 to 4,000+ square feet. The City of Valdosta\'s own Comprehensive Plan designates this area as an "Established Residential" character area, a designation specifically intended to protect existing low-density neighborhoods from incompatible intensification. Multi-family residential development at R-M densities is fundamentally inconsistent with this designation and with the physical character of the surrounding area.</p>' +

    '<h4>2. Proposed Density Is 4 to 5 Times Greater Than Appropriate</h4>' +
    '<p>The current R-15 zoning would yield approximately 10 to 15 single-family homes on the 5.20-acre parcel. The proposed R-M rezoning would permit, at minimum:</p>' +
    '<ul>' +
      '<li>8 four-story buildings</li>' +
      '<li>8 dwelling units per building</li>' +
      '<li>64+ total units, and this number can increase after rezoning since the concept plan is not binding</li>' +
    '</ul>' +
    '<p>This represents a four to five times increase in density over what is currently permitted. Such a dramatic increase in dwelling units and population intensity is inconsistent with neighboring properties and with the expectations of homeowners who purchased and invested in this area under existing zoning.</p>' +

    '<h4>3. No Impact Studies Have Been Submitted</h4>' +
    '<p>Despite the significant scale of this proposal, no traffic study, drainage study, environmental study, or infrastructure capacity analysis has been submitted with this application. The impacts of 64+ units, and potentially far more on the remaining 17+ acres of the property, on local roads, stormwater systems, and public utilities have not been quantified or disclosed. I respectfully urge the Planning Commission to require these studies before making any recommendation.</p>' +

    '<h4>4. The Concept Plan Is Not Binding</h4>' +
    '<p>City planning staff has confirmed that the submitted concept plan is illustrative only. If rezoning is approved, the developer is not bound by the current design. Density can increase, building heights can change, and layout can be altered. The community is being asked to approve a zoning category, not a specific project.</p>' +

    '<h4>5. History of Controversial Rezoning Attempts</h4>' +
    '<p>City records reflect that this same property, known as "The Cove," was the subject of a very controversial higher-density rezoning request in 2007, which was ultimately withdrawn before reaching City Council due to strong community opposition. The same fundamental concerns remain valid today.</p>' +

    '<h4>Request</h4>' +
    '<p>For the reasons stated above, I respectfully request that the Greater Lowndes Planning Commission recommend denial of Rezoning Case VA-2026-02. I further request that, in the event the Commission chooses not to recommend denial, it require the submission of complete traffic, drainage, and environmental impact studies prior to any final City Council vote.</p>' +
    '<p>I intend to appear in person at the March 30, 2026 public hearing to express these concerns.</p>' +
    '<p>Thank you for your consideration.</p>';

  var sigBlock =
    '<div class="sig-block">' +
      '<p>Respectfully submitted,</p><br>' +
      '<p>' + blank('f-name','[Your Name]') + '<br>' +
      blank('f-address','[Your Address]') + '<br>' +
      blank('f-contact','[Phone / Email]') + '</p>' +
    '</div>';

  document.getElementById('letter-body').innerHTML =
    addressBlock + reLine + salutation + body + sigBlock;
}

/* ---- Build Plain Text for Email ---- */
function buildPlainText() {
  var ccChecked = document.getElementById('cc-council').checked;
  var date    = raw('f-date', '[Date]');
  var name    = raw('f-name', '[Your Name]');
  var address = raw('f-address', '[Your Address]');
  var contact = raw('f-contact', '[Phone / Email]');

  var ccLine = ccChecked
    ? '\n\nCC: Valdosta Mayor and City Council\n216 East Central Avenue, Valdosta, Georgia 31601'
    : '';

  var salutation = ccChecked
    ? 'Dear Members of the Planning Commission and Mayor and City Council:'
    : 'Dear Members of the Planning Commission:';

  return date + '\n\n' +
'Greater Lowndes Planning Commission\n' +
'c/o Valdosta Planning Division\n' +
'300 North Lee Street\n' +
'Valdosta, Georgia 31603' + ccLine + '\n\n' +
'RE: Opposition to Rezoning Request VA-2026-02\n\n' +
salutation + '\n\n' +
'I am a resident of ' + address + ', and I am writing in strong opposition to Rezoning Case VA-2026-02, the request by RST Construction to rezone approximately 5.20 acres on the north side of Lake Laurie Drive from Single-Family Residential (R-15) to Multi-Family Residential (R-M).\n\n' +
'1. THE PROPOSED REZONING IS INCOMPATIBLE WITH THE ESTABLISHED RESIDENTIAL CHARACTER OF THE AREA\n\n' +
'The surrounding neighborhood consists of large, single-family estate homes on lots of one to two acres or more, with homes typically ranging from 3,000 to 4,000+ square feet. The City of Valdosta\'s own Comprehensive Plan designates this area as an "Established Residential" character area, a designation specifically intended to protect existing low-density neighborhoods from incompatible intensification. Multi-family residential development at R-M densities is fundamentally inconsistent with this designation and with the physical character of the surrounding area.\n\n' +
'2. THE PROPOSED DENSITY IS 4 TO 5 TIMES GREATER THAN WHAT IS APPROPRIATE\n\n' +
'The current R-15 zoning would yield approximately 10 to 15 single-family homes on the 5.20-acre parcel. The proposed R-M rezoning would permit, at minimum:\n\n' +
'  - 8 four-story buildings\n' +
'  - 8 dwelling units per building\n' +
'  - 64+ total units, and this number can increase after rezoning since the concept plan is not binding\n\n' +
'This represents a four to five times increase in density over what is currently permitted. Such a dramatic increase in dwelling units and population intensity is inconsistent with neighboring properties and with the expectations of homeowners who purchased and invested in this area under existing zoning.\n\n' +
'3. NO IMPACT STUDIES HAVE BEEN CONDUCTED OR SUBMITTED\n\n' +
'Despite the significant scale of this proposal, no traffic study, drainage study, environmental study, or infrastructure capacity analysis has been submitted with this application. The impacts of 64+ units, and potentially far more on the remaining 17+ acres of the property, on local roads, stormwater systems, and public utilities have not been quantified or disclosed to the community or to city staff. I respectfully urge the Planning Commission to require these studies before making any recommendation.\n\n' +
'4. THE CONCEPT PLAN IS NOT BINDING\n\n' +
'City planning staff has confirmed that the submitted concept plan is illustrative only. If rezoning is approved, the developer is not bound by the current design. Density can increase, building heights can change, and layout can be altered. The community is being asked to approve a zoning category, not a specific project. The actual development could be substantially more intense than what has been presented to the public.\n\n' +
'5. THIS PROPERTY HAS A HISTORY OF CONTROVERSIAL REZONING ATTEMPTS\n\n' +
'City records reflect that this same property, known as "The Cove," was the subject of a very controversial higher-density rezoning request in 2007, which was ultimately withdrawn before reaching City Council due to strong community opposition. The same fundamental concerns that drove that opposition remain valid today: the incompatibility of higher-density development with the established character of this neighborhood.\n\n' +
'REQUEST\n\n' +
'For the reasons stated above, I respectfully request that the Greater Lowndes Planning Commission recommend denial of Rezoning Case VA-2026-02. I further request that, in the event the Commission chooses not to recommend denial, it require the submission of complete traffic, drainage, and environmental impact studies prior to any final City Council vote.\n\n' +
'I intend to appear in person at the March 30, 2026 public hearing to express these concerns.\n\n' +
'Thank you for your consideration.\n\n' +
'Respectfully submitted,\n\n' +
name + '\n' +
address + '\n' +
contact;
}

/* ---- Send via mailto ---- */
function sendLetter() {
  var name = val('f-name');
  var address = val('f-address');

  if (!name) {
    alert('Please enter your name before sending.');
    document.getElementById('f-name').focus();
    return;
  }
  if (!address) {
    alert('Please enter your address before sending. This identifies you as a nearby resident and strengthens your letter.');
    document.getElementById('f-address').focus();
    return;
  }

  var ccChecked = document.getElementById('cc-council').checked;
  var body = buildPlainText();
  var cc = ccChecked ? '&cc=' + encodeURIComponent(TO_COUNCIL) : '';
  var link = 'mailto:' + TO_PLANNING + '?subject=' + encodeURIComponent(SUBJECT) + cc + '&body=' + encodeURIComponent(body);

  window.location.href = link;
}

/* ---- Init ---- */
(function() {
  var d = new Date();
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('f-date').value = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  update();
})();
