// Role-play scenarios – the buddy plays a character so the user can practice a conversation.
// Each scenario: id, title, emoji, setting (short description), buddyRole, userRole,
// learnLines (3–5 useful phrases for the user to practice), and optional guidance
// (extra in-character rules added to the prompt).
const scenarios = [
  {
    id: 'coffee-shop',
    title: 'Coffee Shop Barista',
    emoji: '☕',
    setting: 'A busy neighborhood coffee shop during the morning rush.',
    buddyRole: 'a friendly barista taking orders behind the counter',
    userRole: 'a customer ordering a drink',
    learnLines: [
      "Hi! Could I get a medium latte with oat milk, please?",
      "What do you recommend if I want something not too sweet?",
      "Can I get that iced, with an extra shot?",
      "Is that for here or to go? To go, please.",
      "Thanks so much, have a great day!"
    ]
  },
  {
    id: 'boss-checkin',
    title: 'Your Boss: Performance Check-in',
    emoji: '💼',
    setting: 'A one-on-one performance check-in in a quiet office.',
    buddyRole: "the user's manager running a fair, supportive performance review",
    userRole: 'an employee discussing their work and goals',
    learnLines: [
      "Thanks for making time to meet with me today.",
      "This quarter I'm most proud of finishing the project ahead of schedule.",
      "Could you give me an example of where I can improve?",
      "I'd like to take on more responsibility. What would that look like?",
      "Can we set a time to check in on my progress next month?"
    ]
  },
  {
    id: 'bar-stranger',
    title: 'Flirty Stranger at a Bar',
    emoji: '🍸',
    setting: 'A relaxed bar on a Friday night; you strike up a conversation with someone new.',
    buddyRole: 'a charming, friendly stranger at the bar',
    userRole: 'someone practicing striking up a conversation',
    guidance: 'Keep the flirting playful and respectful, never explicit, and only as far as the user is comfortable. Read their cues, ease off right away if they seem uneasy, and take no for an answer gracefully.',
    learnLines: [
      "Hi, is this seat taken?",
      "I love this song. Do you come here often?",
      "I'm glad I said hello. What's your name?",
      "Can I buy you a drink, or would you rather just chat?",
      "It was really nice talking with you. Maybe I'll see you around."
    ]
  },
  {
    id: 'job-interview',
    title: 'Job Interviewer',
    emoji: '🧑‍💼',
    setting: 'A job interview for a position the user wants.',
    buddyRole: 'a professional, encouraging hiring manager conducting the interview',
    userRole: 'a job candidate',
    learnLines: [
      "Thank you for having me. I'm excited to be here.",
      "Let me tell you a little about myself and my experience.",
      "One of my strengths is staying calm and organized under pressure.",
      "Could you tell me what a typical day looks like in this role?",
      "Thank you for your time. What are the next steps?"
    ]
  },
  {
    id: 'taxi-driver',
    title: 'Taxi Driver',
    emoji: '🚕',
    setting: 'A taxi ride across town.',
    buddyRole: 'a talkative, friendly taxi driver who knows the city well',
    userRole: 'a passenger',
    learnLines: [
      "Hi, could you take me to the train station, please?",
      "About how long will it take to get there?",
      "Could you take the fastest route? I'm running a little late.",
      "Can I pay by card?",
      "You can drop me off right here. Thanks!"
    ]
  },
  {
    id: 'farmers-market',
    title: 'Old Farmer at the Market',
    emoji: '🌽',
    setting: "A farmer's market stand on a sunny Saturday morning.",
    buddyRole: 'an old, easygoing farmer selling produce from the family farm',
    userRole: 'a shopper at the market',
    learnLines: [
      "Good morning! Everything looks so fresh.",
      "How much for a basket of these tomatoes?",
      "What's in season right now?",
      "Did you grow all of this yourself?",
      "I'll take two of those, please. Have a good one!"
    ]
  },
  {
    id: 'doctor-visit',
    title: "Doctor's Appointment",
    emoji: '🩺',
    setting: "A routine visit at a family doctor's office.",
    buddyRole: 'a calm, caring family doctor',
    userRole: 'a patient describing how they feel',
    guidance: "This is conversation practice only, not real medical advice. If the user describes a real health concern, gently suggest they talk to an actual doctor.",
    learnLines: [
      "I've been having headaches for about a week.",
      "It usually gets worse in the afternoon.",
      "Are there any side effects I should know about?",
      "How often should I take this?",
      "When should I come back for a follow-up?"
    ]
  },
  {
    id: 'parent-teacher',
    title: 'Parent-Teacher Conference',
    emoji: '🍎',
    setting: "A parent-teacher conference in the classroom after school.",
    buddyRole: "a warm, organized teacher meeting with a student's parent",
    userRole: "a parent asking about their child's progress",
    learnLines: [
      "Thanks for meeting with me. How is my child doing in class?",
      "What subjects is she doing well in?",
      "Is there anything we can work on at home?",
      "How does he get along with the other kids?",
      "What's the best way to reach you if I have questions?"
    ]
  },
  {
    id: 'truck-stop',
    title: 'Truck Stop Cashier',
    emoji: '⛽',
    setting: 'A 24-hour truck stop counter in the middle of the night.',
    buddyRole: 'a friendly late-night truck stop cashier',
    userRole: 'a long-haul driver stopping for fuel and coffee',
    learnLines: [
      "Evening. Can I get a fill-up on pump twelve?",
      "Do you have showers available tonight?",
      "Where's the fresh coffee?",
      "How's the weather looking up the interstate?",
      "Thanks. Stay safe tonight."
    ]
  },
  {
    id: 'dispatcher',
    title: 'Trucking Dispatcher',
    emoji: '📻',
    setting: 'A call with dispatch about the next load.',
    buddyRole: 'a no-nonsense but supportive trucking dispatcher',
    userRole: 'a driver checking in about a load',
    learnLines: [
      "Hey dispatch, this is truck forty-two checking in.",
      "I'm loaded and rolling. ETA is about six hours.",
      "I'm running low on hours. I need to take my ten-hour break.",
      "Can you send me the address and the pickup number again?",
      "Copy that. I'll call you when I'm empty."
    ]
  }
];

// Generic practice lines used for user-made custom scenarios.
const genericRolePlayLines = [
  "Hi, nice to meet you.",
  "Could you say that again a little slower, please?",
  "What would you recommend?",
  "That makes sense. Thanks for explaining.",
  "It was great talking with you."
];
