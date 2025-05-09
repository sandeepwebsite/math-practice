// Data for articles
const articles = {
  1: "Article 1: Name and territory of the Union.",
  2: "Article 2: Admission or establishment of new States.",
  3: "Article 3: Formation of new States and alteration of areas, boundaries, or names of existing States.",
  5: "Article 5: Citizenship at the commencement of the Constitution.",
  6: "Article 6: Rights of citizenship of certain persons who have migrated to India from Pakistan.",
  9: "Article 9: Persons voluntarily acquiring citizenship of a foreign State not to be citizens.",
  10: "Article 10: Continuance of the rights of citizenship.",
  11: "Article 11: Parliament to regulate the right of citizenship by law.",
  12: "Article 12: Definition of State.",
  13: "Article 13: Laws inconsistent with or in derogation of Fundamental Rights.",
  14: "Article 14: Right to Equality.",
  15: "Article 15: Prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth.",
  16: "Article 16: Equality of opportunity in matters of public employment.",
  17: "Article 17: Abolition of untouchability.",
  18: "Article 18: Abolition of titles.",
  19: "Article 19: Protection of certain rights regarding freedom of speech, etc.",
  21: "Article 21: Protection of life and personal liberty.",
  211: "Article 21A: Right to education.",
  22: "Article 22: Protection against arrest and detention in certain cases.",
  23: "Article 23: Prohibition of human trafficking and forced labor.",
  24: "Article 24: Prohibition of employment of children in factories, etc.",
  25: "Article 25: Freedom of conscience and free profession, practice, and propagation of religion.",
  29: "Article 29: Protection of the interests of minorities.",
  36: "Article 36: Definition of Directive Principles.",
  39: "Article 39: Certain principles of policy to be followed by the State.",
  40: "Article 40: Organization of village panchayats.",
  44: "Article 44: Uniform civil code for the citizens.",
  48: "Article 48: Organization of agriculture and animal husbandry.",
  51: "Article 51: Promotion of international peace and security.",
  511: "Article 511: Fundamental duties of every citizen of India.",
  52: "Article 52: The President of India.",
  53: "Article 53: Executive power of the Union.",
  61: "Article 61: Procedure for impeachment of the President.",
  72: "Article 72: Power of President to grant pardons, etc.",
  79: "Article 79: Constitution of Parliament.",
  80: "Article 80: Composition of the Council of States (Rajya Sabha).",
  81: "Article 81: Composition of the House of the People (Lok Sabha).",
  110: "Article 110: Definition of money bills.",
  124: "Article 124: Establishment and constitution of the Supreme Court.",
  125: "Article 125: Salaries, etc., of Judges.",
  136: "Article 136: Special leave to appeal by the Supreme Court.",
  143: "Article 143: Power of the President to consult the Supreme Court.",
  153: "Article 153: Governors of States.",
  154: "Article 154: Executive power of the State.",
  163: "Article 163: Council of Ministers to aid and advise the Governor.",
  168: "Article 168: Constitution of Legislatures in States.",
  169: "Article 169: Abolition or creation of Legislative Councils in States.",
  214: "Article 214: High Courts for States.",
  266: "Article 266: Consolidated Fund and Public Accounts of India and the States.",
  280: "Article 280: Finance Commission.",
  301: "Article 301: Freedom of trade, commerce, and intercourse.",
  324: "Article 324: Superintendence, direction, and control of elections to be vested in an Election Commission.",
  330: "Article 330: Reservation of seats for Scheduled Castes and Scheduled Tribes in the House of the People.",
  352: "Article 352: Proclamation of Emergency.",
  356: "Article 356: Provisions in case of failure of constitutional machinery in States.",
  360: "Article 360: Provisions as to Financial Emergency.",
  368: "Article 368: Power of Parliament to amend the Constitution."



};

// Function to toggle article details on click
function toggleDetails(articleNumber) {
  const detailsDiv = document.getElementById(`article-details-${articleNumber}`);
  if (detailsDiv.style.display === "none" || detailsDiv.style.display === "") {
    detailsDiv.style.display = "block"; // Show the details
    detailsDiv.innerHTML = articles[articleNumber]; // Update the content
  } else {
    detailsDiv.style.display = "none"; // Hide the details if already visible
  }
}

// Function to show all articles when the button is clicked
function showAllArticles() {
  for (let article in articles) {
    const detailsDiv = document.getElementById(`article-details-${article}`);
    detailsDiv.style.display = 'block'; // Show all the details divs
    detailsDiv.innerHTML = articles[article]; // Update the content for each
  }
}
