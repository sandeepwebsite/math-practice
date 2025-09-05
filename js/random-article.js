document.addEventListener('DOMContentLoaded', () => {
  const numberContainer = document.getElementById('number-container');
  const textContainer = document.getElementById('text-container');
  const countdownDisplay = document.getElementById('countdown');
  const messageDisplay = document.getElementById('message');
  const resetBtn = document.getElementById('reset-btn');
  const quitBtn = document.getElementById('quit-btn');

  // --- Article Numbers ---
  const articleList = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
  '12', '13', '14', '15', '16', '17', '18', '19',
  '20', '21', '21A', '22', '23', '24', '25', '26', '27',
  '28', '29', '30', '32', '33', '34', '35', '36', '37',
  '38','39', '39A', '40', '41', '42', '43', '43A', '43B', 
  '44', '45', '46', '47', '48', '49', '50', '51', '51A','52',
  '53', '54', '55', '56', '57', '58', '59', '60', '61', '62',
  '63', '64', '65', '66', '67', '68', '69', '70',
  '71', '72', '73', '74', '75', '76', '77', '78', '79',
  '80', '81', '82', '83', '84', '85', '86',
  '87', '88', '89', '90', '91', '92', '93', '94',
  '95', '96', '97', '98', '99', '100', '101', '102', '103',
  '104', '105', '106', '107', '108', '109', '110', '111', '112',
  '113', '114', '115', '116', '117', '118', '119', '120', '121',
  '122' , '123', '124', '125', '126', '127', '128', '129', '130',
  '136', '137', '141', '143', '148', '149', '151', '153', '154', '161',
  '165', '167', '168', '170', '171', '172', '173', '174', '178', '183', '190', '191',
  '200', '202', '208', '213', '214', '217', '226', '227',
  '233', '235', '239', '239AA', '243', '243P', '244', '343',
  '356', '370', '395'
];

const articleTexts = {
  '1': 'Name and territory of the Union – India, that is Bharat, shall be a Union of States.',
  '2': 'Admission or establishment of new States by Parliament.',
  '3': 'Formation of new States and alteration of areas, boundaries or names of existing States.',
  '4': 'Laws under Articles 2 and 3 to provide for amendment of the First and Fourth Schedules; not considered constitutional amendments.',
  '5': 'Citizenship at the commencement of the Constitution.',
  '6': 'Rights of citizenship of certain persons who migrated from Pakistan to India.',
  '7': 'Rights of citizenship of certain migrants to Pakistan.',
  '8': 'Rights of citizenship of certain persons of Indian origin residing outside India.',
  '9': 'Persons voluntarily acquiring citizenship of a foreign State not to be citizens of India.',
  '10': 'Continuance of the rights of citizenship subject to laws made by Parliament.',
  '11': 'Parliament to regulate the right of citizenship by law.',
  '12': 'Defines "State" for purposes of implementation of fundamental rights under Part III.',
  '13': 'Laws inconsistent with or in derogation of fundamental rights are void.',
  '14': 'Equality before law; equal protection of laws.',
  '15': 'Prohibits discrimination on grounds of religion, race, caste, sex or place of birth.',
  '16': 'Equality of opportunity in public employment.',
  '17': 'Abolition of untouchability.',
  '18': 'Abolition of titles.',
  '19': 'Guarantees six fundamental freedoms like speech, movement, profession, etc.',
  '20': 'Protection in respect of conviction for offences.',
  '21': 'Protection of life and personal liberty.',
  '21A': 'Right to Education – The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.',
  '22': 'Protection against arbitrary arrest and detention.',
  '23': 'Prohibition of human trafficking and forced labour.',
  '24': 'Prohibition of child labour under age 14.',
  '25': 'Freedom of conscience and free profession, practice and propagation of religion.',
  '26': 'Freedom to manage religious affairs.',
  '27': 'Freedom as to taxation for promotion of any religion.',
  '28': 'Freedom from attending religious instruction in state institutions.',
  '29': 'Protection of interests of minorities to conserve culture, language, script.',
  '30': 'Right of minorities to establish and administer educational institutions.',
  '32': 'Right to constitutional remedies.',
  '33': 'Parliament may modify the application of fundamental rights to members of the Armed Forces, police, intelligence organizations, or persons employed in telecommunication systems for national security.',
  '34': 'Allows Parliament to indemnify any person for acts done during martial law and to validate such actions.',
  '35': 'Parliament has the exclusive power to make laws for prescribing punishment for acts declared to be offences under Part III and for matters relating to Articles 16(3), 32(3), 33, and 34.',
  '36': 'Definition of DPSP.',
  '37': 'Applicability of Directive Principles.',
  '38': 'State to secure a social order for the promotion of welfare of the people – The State shall strive to promote the welfare of the people by securing and protecting a social order in which justice, social, economic and political, shall inform all the institutions of national life, and shall minimize inequalities in income, status, facilities, and opportunities.',
  '39': 'Certain principles of policy to be followed by the State – The State shall direct its policy towards securing adequate means of livelihood, equal pay for equal work, protection of children and youth, right to work, and prevention of concentration of wealth.',
  '39A': 'Equal justice and free legal aid – The State shall secure that the operation of the legal system promotes justice, on a basis of equal opportunity, and shall provide free legal aid to ensure access to justice.',
  '40': 'Organization of village panchayats – The State shall take steps to organize village panchayats and endow them with powers and authority to function as units of self-government.',
  '41': 'Right to work, to education and to public assistance in certain cases – The State shall, within its capacity, make effective provision for securing the right to work, education, and assistance in cases of unemployment, old age, sickness, and disablement.',
  '42': 'Provision for just and humane conditions of work and maternity relief – The State shall make provision for securing humane working conditions and maternity benefits.',
  '43': 'Living wage, etc., for workers – The State shall endeavor to secure a living wage, decent standard of life, and cultural opportunities for workers.',
  '43A': 'Participation of workers in management of industries – The State shall take steps to secure the participation of workers in the management of undertakings and establishments.',
  '43B': 'Promotion of co-operative societies – The State shall promote voluntary formation, autonomous functioning, democratic control, and professional management of co-operative societies.',
  '44': 'Uniform civil code (notably Goa).',
  '45': 'Free & compulsory education for children.',
  '46': 'Promotion of educational/economic interests of SC/ST/OBC.',
  '47': 'Duty to raise nutrition, living standards, public health.',
  '48': 'Organisation of agriculture and animal husbandry.',
  '49': 'Protection of monuments and natural importance.',
  '50': 'Separation of judiciary from executive.',
  '51': 'Promotion of international peace and security.',
  '51A': 'Fundamental duties of citizens.',
  '52': 'The President of India – There shall be a President of India.',
  '53': 'Executive power of the Union shall be vested in the President and exercised either directly or through officers subordinate to him.',
  '54': 'Election of President – The President shall be elected by an electoral college consisting of elected members of both Houses of Parliament and the elected members of the Legislative Assemblies of the States.',
  '55': 'Manner of election of President – Ensures uniformity in the scale of representation of different States at the election of the President.',
  '56': 'Term of office of President – The President shall hold office for a term of five years from the date of entering office.',
  '57': 'Eligibility for re-election – A person who has been President shall be eligible for re-election.',
  '58': 'Qualifications for election as President – Must be a citizen of India, at least 35 years old, and qualified for election as a member of the House of the People.',
  '59': 'Conditions of the President’s office – The President shall not hold any other office of profit and shall be entitled to official residence and emoluments.',
  '60': 'Oath or affirmation by the President – Administered by the Chief Justice of India, affirming to preserve, protect, and defend the Constitution and the law.',
  '61': 'Procedure for impeachment of the President – The President can be impeached for violation of the Constitution by a process in Parliament.',
  '62': 'Time of holding election to fill vacancy in the office of President and the term of office of a person elected to fill a casual vacancy.',
  '63': 'There shall be a Vice-President of India.',
  '64': 'The Vice-President shall be ex-officio Chairman of the Council of States (Rajya Sabha).',
  '65': 'The Vice-President shall act as President in case of vacancy or absence of the President.',
  '66': 'Election of Vice-President – Elected by members of both Houses of Parliament.',
  '67': 'Term of office of Vice-President – Five years, eligible for re-election.',
  '68': 'Time of holding election to fill vacancy in the office of Vice-President.',
  '69': 'Oath or affirmation by the Vice-President.',
  '70': 'Discharge of President’s functions in other contingencies.',
  '71': 'Matters relating to, or connected with, the election of President or Vice-President to be decided by the Supreme Court.',
  '72': 'Power of the President to grant pardons, reprieves, respites, or remissions of punishment.',
  '73': 'Extent of executive power of the Union – Shall extend to matters on which Parliament has power to make laws.',
  '74': 'Council of Ministers to aid and advise the President.',
  '75': 'Other provisions as to Ministers – Appointment, tenure, collective responsibility, salaries.',
  '76': 'Attorney-General for India – Appointment, duties, and rights.',
  '77': 'Conduct of business of the Government of India – Authentication of orders and instruments.',
  '78': 'Duties of Prime Minister – To communicate to the President all decisions of the Council of Ministers and furnish information when called for.',
  '79': 'Parliament shall consist of the President and two Houses – the Council of States (Rajya Sabha) and the House of the People (Lok Sabha).',
  '80': 'Composition of the Council of States (Rajya Sabha).',
  '81': 'Composition of the House of the People (Lok Sabha).',
  '82': 'Readjustment of representation after each census by delimitation.',
  '83': 'Duration of Houses of Parliament – Rajya Sabha is permanent; Lok Sabha has a term of five years unless dissolved sooner.',
  '84': 'Qualifications for membership of Parliament – Citizenship, minimum age, and other qualifications prescribed by law.',
  '85': 'Sessions of Parliament, prorogation, and dissolution of Lok Sabha.',
  '86': 'Right of the President to address either House of Parliament and send messages.',
  '87': 'Special address by the President at the commencement of the first session after each general election and at the first session of each year.',
  '88': 'Rights of Ministers and Attorney-General to speak in and participate in proceedings of Parliament without voting rights.',
  '89': 'The Chairman and Deputy Chairman of the Council of States (Rajya Sabha).',
  '90': 'Vacation and resignation of, and removal from, the office of the Deputy Chairman of Rajya Sabha.',
  '91': 'The Deputy Chairman or other person to perform the duties of the office of, or to act as, Chairman of Rajya Sabha.',
  '92': 'The Chairman or Deputy Chairman not to preside while a resolution for his removal is under consideration.',
  '93': 'The Speaker and Deputy Speaker of the House of the People (Lok Sabha).',
  '94': 'Vacation and resignation of, and removal from, the offices of Speaker and Deputy Speaker of Lok Sabha.',
  '95': 'Power of the Deputy Speaker or other person to perform the duties of the office of, or to act as, Speaker.',
  '96': 'The Speaker or Deputy Speaker not to preside while a resolution for his removal is under consideration.',
  '97': 'Salaries and allowances of the Chairman and Deputy Chairman of Rajya Sabha and the Speaker and Deputy Speaker of Lok Sabha.',
  '98': 'Secretariat of Parliament – Separate secretarial staff for each House.',
  '99': 'Oath or affirmation by members of Parliament before taking their seats.',
  '100': 'Voting in Houses, power of Houses to act notwithstanding vacancies, and quorum.',
  '101': 'Vacation of seats – A member of Parliament cannot simultaneously be a member of both Houses or of a House of Parliament and a House of the Legislature of a State.',
  '102': 'Disqualifications for membership – Holds office of profit, unsound mind, insolvent, not a citizen of India, or disqualified under law.',
  '103': 'Decision on questions as to disqualifications of members shall be decided by the President after consulting the Election Commission.',
  '104': 'Penalty for sitting and voting before making oath or affirmation or when not qualified.',
  '105': 'Powers, privileges, and immunities of Parliament and its members.',
  '106': 'Salaries and allowances of members of Parliament.',
  '107': 'Provisions regarding introduction and passing of Bills in Parliament.',
  '108': 'Joint sitting of both Houses in case of deadlock on a Bill (except Money Bills and Constitutional Amendment Bills).',
  '109': 'Special procedure in respect of Money Bills – Lok Sabha has exclusive powers.',
  '110': 'Definition of Money Bills.',
  '111': 'Assent to Bills – President may give assent or withhold assent or return a Bill (if not a Money Bill) for reconsideration.',
  '112': 'Annual financial statement (Union Budget).',
  '113': 'Procedure in Parliament with respect to estimates (Demands for Grants).',
  '114': 'Appropriation Bills – Authorising withdrawal of money from Consolidated Fund of India.',
  '115': 'Supplementary, additional, or excess grants.',
  '116': 'Votes on account, votes of credit, and exceptional grants.',
  '117': 'Special provisions as to financial Bills.',
  '118': 'Rules of procedure – Each House of Parliament may make rules for regulating its procedure and conduct of business.',
  '119': 'Regulation by law of procedure in Parliament in relation to financial business.',
  '120': 'Language to be used in Parliament – Hindi or English; members may express themselves in their mother tongue.',
  '121': 'Restriction on discussion in Parliament regarding the conduct of judges of the Supreme Court or High Courts except in cases of impeachment.',
  '122': 'Courts not to inquire into proceedings of Parliament on grounds of alleged irregularity of procedure.',
  '123': 'Power of the President to promulgate Ordinances when Parliament is not in session.',
  '124': 'Establishment and constitution of the Supreme Court of India.',
  '125': 'Salaries, allowances, and rights of the Judges of the Supreme Court.',
  '126': 'Appointment of an acting Chief Justice of India when the office is vacant or the Chief Justice is unable to perform duties.',
  '127': 'Appointment of ad hoc Judges of the Supreme Court.',
  '128': 'Attendance of retired Judges of the Supreme Court at sittings of the Court.',
  '129': 'The Supreme Court shall be a court of record and have power to punish for contempt.',
  '130': 'Seat of the Supreme Court shall be in Delhi, but may sit elsewhere if the Chief Justice of India so decides with approval of the President.',
  '136': 'Special leave to appeal to the Supreme Court.',
  '137': 'Review of judgments or orders by the Supreme Court.',
  '141': 'Law declared by the Supreme Court is binding on all courts within India.',
  '143': 'Power of the President to consult the Supreme Court (Advisory jurisdiction).',
  
  '148': 'Comptroller and Auditor-General of India (CAG).',
  '149': 'Duties and powers of the Comptroller and Auditor-General of India.',
  '151': 'Reports of the Comptroller and Auditor-General to be laid before the legislatures.',
  
  '153': 'There shall be a Governor for each State.',
  '154': 'Executive power of the State vested in the Governor.',
  '161': 'Power of the Governor to grant pardons, reprieves, respites, or remissions of punishment.',
  
  '165': 'Advocate-General for the State.',
  '167': 'Duties of the Chief Minister in relation to furnishing information to the Governor.',
  
  '168': 'Constitution of State Legislatures.',
  '170': 'Composition of the Legislative Assemblies of States.',
  '171': 'Composition of the Legislative Councils of States.',
  '172': 'Duration of State Legislatures.',
  '173': 'Qualification for membership of State Legislature.',
  '174': 'Sessions of State Legislature, prorogation, and dissolution.',
  '178': 'The Speaker and Deputy Speaker of the Legislative Assembly.',
  '183': 'The Chairman and Deputy Chairman of the Legislative Council.',
  '190': 'Vacation of seats by members of State Legislature.',
  '191': 'Disqualification for membership of State Legislature.',
  
  '200': 'Governor’s assent to Bills.',
  '202': 'Annual financial statement (State Budget).',
  '208': 'Rules of procedure of the State Legislature.',
  
  '213': 'Power of Governor to promulgate Ordinances.',
  
  '214': 'High Court for each State.',
  '217': 'Appointment and conditions of the office of a Judge of a High Court.',
  '226': 'Power of High Courts to issue writs.',
  '227': 'Power of superintendence of High Courts over all courts in the territory.',
  
  '233': 'Appointment of District Judges.',
  '235': 'Control over subordinate courts vested in High Court.',
  
  '239': 'Administration of Union Territories.',
  '239AA': 'Special provisions with respect to Delhi (NCT).',
  
  '243': 'Panchayati Raj Institutions.',
  '243P': 'Definitions for Municipalities.',

  '244': 'Scheduled and Tribal Areas.',
  '343': 'Hindi as official language.',
  '356': 'Imposition of President’s Rule.',
  '370': 'Special status of Jammu & Kashmir (now revoked).',
  '395': 'Short title, commencement, and repeals related to Indian Independence/Government of India Acts.'
};

  // --- Timers ---
  const phaseDurationMs = 15000; // 15 sec
  const phaseDurationSec = phaseDurationMs / 1000;

  let articleQueue = [];
  let countdownInterval, messageInterval, phaseTimeout, cycleTimeout;
  let isRunning = true;

  // Shuffle articles
  function shuffleArticles() {
    articleQueue = [...articleList];
    for (let i = articleQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [articleQueue[i], articleQueue[j]] = [articleQueue[j], articleQueue[i]];
    }
  }

  function getNextArticle() {
    if (articleQueue.length === 0) shuffleArticles();
    return articleQueue.shift();
  }

  function animateOut(elem) {
    return new Promise(resolve => {
      elem.classList.add('animate-out');
      elem.addEventListener('animationend', () => {
        elem.remove();
        resolve();
      }, { once: true });
    });
  }

  function animateInNumber(article) {
    const elem = document.createElement('div');
    elem.className = 'number';
    elem.textContent = `Article ${article}`;
    numberContainer.appendChild(elem);
  }

  function showText(article) {
    textContainer.innerHTML =
      `<span class="article-number">Article ${article} → </span>` +
      (articleTexts[article] || 'Text not available.');
  }

  function startCountdown(seconds) {
    let timeLeft = seconds;
    countdownDisplay.textContent = timeLeft;

    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      timeLeft--;
      countdownDisplay.textContent = timeLeft;
      if (timeLeft <= 0) clearInterval(countdownInterval);
    }, 1000);
  }

  function startMessageCountdown(duration, prefixText) {
    let timeLeft = duration;
    messageDisplay.innerHTML =
      `${prefixText} <span class="count-number">${timeLeft}</span> sec`;

    clearInterval(messageInterval);
    messageInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft >= 0) {
        messageDisplay.innerHTML =
          `${prefixText} <span class="count-number">${timeLeft}</span> sec`;
      }
      if (timeLeft <= 0) clearInterval(messageInterval);
    }, 1000);
  }

  async function updateArticle() {
    if (!isRunning) return;

    const current = document.querySelector('.number');
    if (current) await animateOut(current);

    textContainer.style.display = 'none';
    textContainer.textContent = '';

    const article = getNextArticle();
    animateInNumber(article);

    // Phase 1: 15 sec (no text)
    startCountdown(phaseDurationSec);
    startMessageCountdown(phaseDurationSec, 'Answer will come in');

    phaseTimeout = setTimeout(() => {
      // Phase 2: show text + 15 sec
      textContainer.style.display = 'block';
      showText(article);

      startCountdown(phaseDurationSec);
      startMessageCountdown(phaseDurationSec, 'Next article in');

      cycleTimeout = setTimeout(updateArticle, phaseDurationMs);
    }, phaseDurationMs);
  }

  function resetApp() {
    clearAllTimers();
    isRunning = true;
    shuffleArticles();
    updateArticle();
  }

  function quitApp() {
    clearAllTimers();
    isRunning = false;
    textContainer.textContent = 'Thank you for exploring the Constitution!';
    textContainer.style.display = 'block';
    numberContainer.innerHTML = '';
    countdownDisplay.textContent = '—';
    messageDisplay.textContent = '';
  }

  function clearAllTimers() {
    clearTimeout(phaseTimeout);
    clearTimeout(cycleTimeout);
    clearInterval(countdownInterval);
    clearInterval(messageInterval);
  }

  resetBtn.addEventListener('click', resetApp);
  quitBtn.addEventListener('click', quitApp);

  // --- Start ---
  shuffleArticles();
  updateArticle();
});
