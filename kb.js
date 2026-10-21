// Offline knowledge base (used when live AI is unavailable)
const KB = [
  {
    keys: ['ctc', 'in-hand', 'inhand', 'take home', 'take-home', 'salary slip', 'offer letter'],
    answer: 'CTC is the total money the company spends on you in a year, including things you never get in your bank account, like the employer’s PF share and gratuity. In-hand salary is what actually reaches your bank after PF, tax and other deductions.',
    simple: 'CTC is the big number on the offer letter. In-hand is the smaller number that lands in your bank.',
    example: 'If your CTC is ₹6,00,000 a year, you will not get ₹50,000 every month. After deductions you may get around ₹40,000–₹45,000, depending on your pay structure.',
    todo: 'Ask HR for the “monthly in-hand” figure in writing before you accept any offer.',
  },
  {
    keys: ['budget', 'split', 'divide', '50/30/20', 'plan my salary', 'manage salary', 'spend'],
    answer: 'A simple rule is 50/30/20: 50% of your salary for needs (rent, food, travel), 30% for wants (movies, shopping), and 20% for savings. You can adjust the numbers, but always set aside the savings part first.',
    simple: 'Half for must-haves, a little for fun, and some for your future self.',
    example: 'On ₹30,000 a month: ₹15,000 for needs, ₹9,000 for wants, ₹6,000 for savings.',
    todo: 'The day your salary comes in, move your savings amount to a separate account before spending anything.',
  },
  {
    keys: ['emergency', 'rainy day', 'safety fund', 'job loss'],
    answer: 'An emergency fund is money kept aside only for surprises like a medical bill or sudden job loss. A common target is 3 to 6 months of your monthly expenses, kept somewhere safe that you can reach quickly.',
    simple: 'It is a small safety pot so you never have to borrow when something goes wrong.',
    example: 'If you spend ₹20,000 a month, aim for ₹60,000 to ₹1,20,000 over time. Start with ₹5,000.',
    todo: 'Open a separate savings account, name it “Emergency”, and set a small monthly auto-transfer.',
  },
  {
    keys: ['sip', 'systematic'],
    answer: 'A SIP (Systematic Investment Plan) is a way of investing a fixed small amount every month in a mutual fund, instead of a big amount at once. Returns are not guaranteed because the value can go up or down with the market.',
    simple: 'You put in a fixed amount every month, like a recurring deposit, but the value can rise or fall.',
    example: 'Investing ₹1,000 every month for 12 months means you put in ₹12,000 in total. What it becomes depends on the market, and it could be more or less.',
    todo: 'First build your emergency fund, then learn how SIPs work on an official fund-house or regulator website before you start.',
  },
  {
    keys: ['mutual fund', 'mutual funds', 'stock', 'stocks', 'invest', 'share market', 'shares'],
    answer: 'A mutual fund collects money from many people and invests it in shares or bonds through a professional fund manager. It is not guaranteed and the value can fall, so it suits money you will not need for several years.',
    simple: 'Many people put money in one pot, and an expert invests it. It can grow or shrink.',
    example: 'If 1,000 people each put in ₹5,000, the fund invests ₹50,00,000 together and each person owns a small share of the pot.',
    todo: 'Write down one goal and the year you need the money, because that decides how risky you can be.',
  },
  {
    keys: ['upi', 'gpay', 'phonepe', 'paytm', 'otp', 'scam', 'fraud', 'qr', 'collect request'],
    answer: 'You only enter your UPI PIN to SEND money, never to receive it. If someone says “enter your PIN to get money”, it is a scam. Never share your OTP, PIN or screen with anyone, even if they say they are from the bank.',
    simple: 'PIN means money goes out. If a stranger asks for your PIN or OTP, it is a scam.',
    example: 'A buyer says “I sent you ₹500, scan this QR to receive.” Scanning and entering your PIN actually sends ₹500 from your account.',
    todo: 'Turn on app lock for your payment apps today and set a daily UPI limit you are comfortable with.',
  },
  {
    keys: ['credit card', 'credit', 'emi', 'minimum due', 'cibil', 'credit score', 'loan'],
    answer: 'A credit card is a short-term loan from the bank. If you pay the full bill before the due date it costs no interest, but if you pay only the “minimum due” the bank charges very high interest on the rest.',
    simple: 'Pay the full bill on time and it is useful. Pay only the minimum and it becomes expensive.',
    example: 'You spend ₹10,000 and pay only the ₹500 minimum. The remaining ₹9,500 keeps growing with high interest every month.',
    todo: 'Set a reminder two days before your due date to pay the full amount.',
  },
  {
    keys: ['insurance', 'term plan', 'term insurance', 'health insurance', 'mediclaim', 'policy'],
    answer: 'Insurance protects you from a big unexpected cost. Health insurance covers hospital bills, and term life insurance helps your family if you are not there. It is best to keep insurance separate from investing.',
    simple: 'You pay a small amount every year so a big problem does not wipe out your savings.',
    example: 'A hospital stay can cost ₹2,00,000. With health cover, the insurer pays most of it instead of you.',
    todo: 'Check if your employer already gives you health cover, and find out what it does and does not include.',
  },
  {
    keys: ['tax', 'itr', 'income tax', 'tds', '80c', 'regime', 'form 16'],
    answer: 'Income tax is a part of your earnings that goes to the government. Your employer usually deducts it each month (called TDS), and once a year you file a return to confirm everything is correct. Rules and slabs change, so always check the official income tax website.',
    simple: 'The government takes a share of income. Your company often pays it for you, but you still file a yearly return.',
    example: 'If ₹2,000 is cut as TDS from your salary every month, that is ₹24,000 for the year, which your Form 16 will show.',
    todo: 'Ask your employer for your Form 16 after the year ends and keep it safe.',
  },
  {
    keys: ['pf', 'epf', 'provident', 'gratuity'],
    answer: 'PF (Provident Fund) is forced savings for your retirement. A part of your salary goes into it every month and your employer adds some too. It is a long-term safety net, so it is best not to withdraw it every time you change jobs.',
    simple: 'It is a salary-linked piggy bank for your future that your company also contributes to.',
    example: 'If ₹1,800 is cut from your salary for PF and your employer adds a similar amount, your PF grows by around ₹3,600 every month.',
    todo: 'Check your PF balance on the official EPFO member portal and make sure your UAN is active.',
  },
  {
    keys: ['fd', 'fixed deposit', 'savings account', 'recurring', 'rd', 'interest'],
    answer: 'A fixed deposit (FD) means you lock money in a bank for a set time and get a fixed interest rate. It is safe and predictable, but the interest is taxable and usually grows slowly compared to risky options.',
    simple: 'You lend money to the bank for a fixed time and it pays you interest.',
    example: 'You put ₹50,000 in an FD for one year at a fixed rate, and you know exactly what you will get back at the end.',
    todo: 'Compare rates at two banks before you open any FD, and check the penalty for breaking it early.',
  },
];

function findEntry(q) {
  const text = q.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const e of KB) {
    // Short keys (sip, pf, fd, rd, emi...) must match whole words, so "card" never triggers "rd".
    const hit = (k) => (k.length <= 4 ? new RegExp('(^|[^a-z0-9])' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z0-9]|$)').test(text) : text.includes(k));
    const score = e.keys.reduce((n, k) => n + (hit(k) ? 1 : 0), 0);
    if (score > bestScore) {
      best = e;
      bestScore = score;
    }
  }
  return best;
}

