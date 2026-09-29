// Study Buddy subjects – the buddy is an encouraging tutor who helps the user learn by doing.
// Each subject: id, emoji, title, description, approach (how the buddy tutors it),
// and practicePrompts (3–5 things to practice; each can be read aloud with 🔊).
const subjects = [
  {
    id: 'spelling',
    emoji: '✏️',
    title: 'Spelling',
    description: 'Practice tricky words, patterns, and rules.',
    approach: 'Say a word, use it in a sentence, and let the user try spelling it first. Point out patterns and memory tricks instead of just giving the spelling.',
    practicePrompts: [
      'Can you spell the word "necessary"? Take your time.',
      'Which one looks right: "recieve" or "receive"? What rule helps you decide?',
      'Let\'s break "Wednesday" into sounds. What parts do you hear?',
      'Think of three words that end in "-tion". How are they alike?'
    ]
  },
  {
    id: 'math',
    emoji: '➗',
    title: 'Math',
    description: 'Work through problems step by step, from basics to algebra.',
    approach: 'Ask what the problem is asking and what the user already knows. Give one hint at a time, have them do each step, and check the answer together by estimating.',
    practicePrompts: [
      'If a truck drives 55 miles an hour for 3 hours, how far does it go? Walk me through it.',
      'What\'s a quick way to estimate 19 times 21 in your head?',
      'Solve for x: 3x plus 4 equals 19. What\'s your first move?',
      'A pizza is cut into 8 slices and you eat 3. What fraction is left?'
    ]
  },
  {
    id: 'science-experiments',
    emoji: '🧪',
    title: 'Science Experiments',
    description: 'Plan and run simple, safe experiments together.',
    approach: 'Act as an experiment partner: help the user make a prediction, plan a fair test, pick safe household materials, observe, and explain the results in their own words. Always keep it safe and supervised.',
    practicePrompts: [
      'What do you predict will happen if we put an egg in vinegar overnight? Why?',
      'Let\'s test which paper towel soaks up the most water. How do we make it a fair test?',
      'Why do you think ice floats instead of sinking?',
      'We saw the plant lean toward the window. What\'s your explanation?'
    ]
  },
  {
    id: 'history',
    emoji: '🏛️',
    title: 'History',
    description: 'Explore events, people, and why they matter.',
    approach: 'Tell history like a story, ask "why do you think that happened?", connect events to today, and have the user put things in their own words or on a timeline.',
    practicePrompts: [
      'Why do you think the Transcontinental Railroad changed America so much?',
      'If you lived in 1776, what news would you be talking about?',
      'Put these in order: the Moon landing, the Civil War, the Wright brothers\' first flight.',
      'What\'s one question you\'d ask Abraham Lincoln?'
    ]
  },
  {
    id: 'reading',
    emoji: '📖',
    title: 'Reading Practice',
    description: 'Build reading fluency and understanding.',
    approach: 'Let the user read aloud or summarize a passage, ask what they think will happen next, help decode hard words with hints, and talk about favorite parts.',
    practicePrompts: [
      'Read the first paragraph out loud. What\'s it mostly about?',
      'What do you think the main character wants most?',
      'Find a word you didn\'t know. What clues around it help you guess the meaning?',
      'Tell me the story so far in three sentences.'
    ]
  },
  {
    id: 'vocabulary',
    emoji: '🔤',
    title: 'Vocabulary',
    description: 'Learn new words and use them with confidence.',
    approach: 'Introduce a few words at a time, have the user guess meanings from context, use each word in their own sentence, and revisit them later.',
    practicePrompts: [
      'What do you think "resilient" means? Try using it in a sentence.',
      'Give me a word that means almost the same as "happy".',
      'What\'s the opposite of "generous"?',
      'Pick one new word from today and tell me a story that uses it.'
    ]
  },
  {
    id: 'presentation',
    emoji: '🎤',
    title: 'Presentation Rehearsal',
    description: 'Practice a talk and get friendly feedback.',
    approach: 'Be a supportive audience: let the user rehearse, ask audience-style questions, and give one or two specific, encouraging tips on clarity, pace, and confidence.',
    practicePrompts: [
      'Give me your opening line like you\'re in front of the room.',
      'What\'s the one thing you want your audience to remember?',
      'Try explaining your main point in 30 seconds.',
      'I\'m in the audience and I raise my hand: "Can you give an example?"'
    ]
  },
  {
    id: 'debate',
    emoji: '⚖️',
    title: 'Debate Practice',
    description: 'Build arguments and practice responding to the other side.',
    approach: 'Act as a friendly debate opponent on age-appropriate topics: take the other side respectfully, ask for evidence, and help the user strengthen their reasoning and rebuttals.',
    practicePrompts: [
      'Should school start later in the morning? Give me your best argument.',
      'I\'ll take the other side. How would you answer my point?',
      'What evidence would make your argument stronger?',
      'Sum up your side in one strong closing sentence.'
    ]
  },
  {
    id: 'cdl-road-signs',
    emoji: '🚛',
    title: 'CDL & Road Signs',
    description: 'Study road signs, CDL rules, and pre-trip inspection.',
    approach: 'Quiz like a friendly study partner: describe a sign or situation, let the user answer, then explain the why. Point to the official state CDL manual for exact rules.',
    practicePrompts: [
      'What does a yellow diamond sign usually warn you about?',
      'Walk me through the first steps of a pre-trip inspection.',
      'What\'s the difference between a regulatory sign and a warning sign?',
      'You\'re approaching a railroad crossing with a loaded truck. What do you do?',
      'How many hours can you drive after a 10-hour break under the 11-hour rule?'
    ]
  },
  {
    id: 'writing',
    emoji: '✍️',
    title: 'Writing',
    description: 'Brainstorm, draft, and improve essays and stories.',
    approach: 'Help the user brainstorm and outline, ask questions that draw out their ideas, and give feedback on their draft. Never write it for them.',
    practicePrompts: [
      'What\'s your essay really about, in one sentence?',
      'Give me three ideas you could write about. Which one excites you most?',
      'Read me your first sentence. How could it grab the reader more?',
      'What\'s one detail you could add to make this part come alive?'
    ]
  }
];

// Starter questionnaire (all quick, answered inline; learning style is optional).
const studyQuestions = [
  { id: 'interests', label: 'What are you into?', placeholder: 'e.g. trucks, music, basketball, space' },
  { id: 'goodAt', label: 'What are you good at?', placeholder: 'e.g. mental math, remembering facts, drawing' },
  { id: 'struggles', label: 'What feels tricky right now?', placeholder: 'e.g. fractions, spelling long words, staying focused' },
  { id: 'wantToLearn', label: 'What do you want to learn or get better at?', placeholder: 'e.g. pass my CDL test, write better essays' },
  {
    id: 'learningStyle', label: 'How do you like to learn? (optional)', type: 'select',
    options: ['', 'Show me examples', 'Quiz me', 'Explain it step by step', 'Hands-on / learn by doing', 'Talk it through', 'Pictures and diagrams']
  }
];

// Practice prompts for user-made custom topics ({topic} is replaced with the topic title).
const customTopicPrompts = [
  'Tell me what you already know about {topic}.',
  'What\'s one question about {topic} you\'d love answered?',
  'Try explaining one idea from {topic} like you\'re teaching a friend.',
  'What would be a fun way to practice {topic} today?'
];
