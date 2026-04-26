export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface GameTopic {
  id: string;
  name: string;
  icon: string;
  questions: Question[];
}

export interface SubjectGames {
  subject: string;
  color: string;
  topics: GameTopic[];
}

export const mathGames: SubjectGames = {
  subject: "Mathematics",
  color: "blue",
  topics: [
    {
      id: "addition",
      name: "Addition",
      icon: "➕",
      questions: [
        { id: 1, question: "What is 145 + 237?", options: ["372", "382", "392", "362"], correct: 1, explanation: "145 + 237 = 382" },
        { id: 2, question: "What is 56 + 78?", options: ["124", "134", "144", "114"], correct: 1, explanation: "56 + 78 = 134" },
        { id: 3, question: "What is 999 + 1?", options: ["1000", "1001", "999", "1010"], correct: 0, explanation: "999 + 1 = 1000" },
        { id: 4, question: "What is 345 + 655?", options: ["990", "1000", "1010", "1100"], correct: 1, explanation: "345 + 655 = 1000" },
        { id: 5, question: "What is 123 + 456?", options: ["579", "589", "569", "599"], correct: 0, explanation: "123 + 456 = 579" },
      ]
    },
    {
      id: "subtraction",
      name: "Subtraction",
      icon: "➖",
      questions: [
        { id: 1, question: "What is 500 - 237?", options: ["263", "253", "273", "283"], correct: 0, explanation: "500 - 237 = 263" },
        { id: 2, question: "What is 1000 - 456?", options: ["554", "544", "564", "534"], correct: 1, explanation: "1000 - 456 = 544" },
        { id: 3, question: "What is 89 - 47?", options: ["32", "42", "52", "62"], correct: 1, explanation: "89 - 47 = 42" },
        { id: 4, question: "What is 200 - 75?", options: ["115", "125", "135", "145"], correct: 1, explanation: "200 - 75 = 125" },
        { id: 5, question: "What is 356 - 129?", options: ["217", "227", "237", "207"], correct: 1, explanation: "356 - 129 = 227" },
      ]
    },
    {
      id: "multiplication",
      name: "Multiplication",
      icon: "✖️",
      questions: [
        { id: 1, question: "What is 12 × 15?", options: ["170", "180", "190", "160"], correct: 1, explanation: "12 × 15 = 180" },
        { id: 2, question: "What is 8 × 9?", options: ["63", "72", "81", "64"], correct: 1, explanation: "8 × 9 = 72" },
        { id: 3, question: "What is 25 × 4?", options: ["90", "95", "100", "105"], correct: 2, explanation: "25 × 4 = 100" },
        { id: 4, question: "What is 7 × 8?", options: ["54", "56", "58", "60"], correct: 1, explanation: "7 × 8 = 56" },
        { id: 5, question: "What is 11 × 12?", options: ["122", "132", "142", "152"], correct: 1, explanation: "11 × 12 = 132" },
      ]
    },
    {
      id: "division",
      name: "Division",
      icon: "➗",
      questions: [
        { id: 1, question: "What is 144 ÷ 12?", options: ["10", "11", "12", "13"], correct: 2, explanation: "144 ÷ 12 = 12" },
        { id: 2, question: "What is 81 ÷ 9?", options: ["7", "8", "9", "10"], correct: 2, explanation: "81 ÷ 9 = 9" },
        { id: 3, question: "What is 100 ÷ 4?", options: ["20", "25", "30", "35"], correct: 1, explanation: "100 ÷ 4 = 25" },
        { id: 4, question: "What is 56 ÷ 7?", options: ["6", "7", "8", "9"], correct: 2, explanation: "56 ÷ 7 = 8" },
        { id: 5, question: "What is 72 ÷ 8?", options: ["7", "8", "9", "10"], correct: 2, explanation: "72 ÷ 8 = 9" },
      ]
    },
    {
      id: "fractions",
      name: "Fractions",
      icon: "🔢",
      questions: [
        { id: 1, question: "What is 1/2 + 1/4?", options: ["2/6", "3/4", "2/4", "1/3"], correct: 1, explanation: "1/2 + 1/4 = 2/4 + 1/4 = 3/4" },
        { id: 2, question: "What is 3/4 - 1/4?", options: ["2/8", "1/2", "2/4", "Both B and C"], correct: 3, explanation: "3/4 - 1/4 = 2/4 = 1/2" },
        { id: 3, question: "Which fraction is equivalent to 2/3?", options: ["4/9", "6/9", "4/6", "Both B and C"], correct: 3, explanation: "2/3 = 4/6 = 6/9" },
        { id: 4, question: "What is 2/3 × 3/4?", options: ["6/12", "1/2", "5/7", "Both A and B"], correct: 3, explanation: "2/3 × 3/4 = 6/12 = 1/2" },
        { id: 5, question: "What is 5/6 of 12?", options: ["8", "10", "12", "6"], correct: 1, explanation: "5/6 × 12 = 60/6 = 10" },
      ]
    },
    {
      id: "geometry",
      name: "Geometry",
      icon: "📐",
      questions: [
        { id: 1, question: "What is the area of a rectangle with length 8 and width 5?", options: ["30", "35", "40", "45"], correct: 2, explanation: "Area = length × width = 8 × 5 = 40" },
        { id: 2, question: "What is the perimeter of a square with side 6?", options: ["12", "18", "24", "36"], correct: 2, explanation: "Perimeter = 4 × side = 4 × 6 = 24" },
        { id: 3, question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correct: 1, explanation: "A hexagon has 6 sides" },
        { id: 4, question: "What is the sum of angles in a triangle?", options: ["90°", "180°", "270°", "360°"], correct: 1, explanation: "Sum of angles in a triangle = 180°" },
        { id: 5, question: "What is the area of a circle with radius 7? (use π≈3.14)", options: ["43.96", "87.92", "153.86", "219.8"], correct: 2, explanation: "Area = πr² = 3.14 × 49 = 153.86" },
      ]
    },
    {
      id: "algebra",
      name: "Algebra",
      icon: "🔡",
      questions: [
        { id: 1, question: "Solve: x + 5 = 12", options: ["x = 5", "x = 7", "x = 8", "x = 17"], correct: 1, explanation: "x = 12 - 5 = 7" },
        { id: 2, question: "Solve: 2x = 14", options: ["x = 5", "x = 6", "x = 7", "x = 8"], correct: 2, explanation: "x = 14 ÷ 2 = 7" },
        { id: 3, question: "Simplify: 3x + 2x", options: ["5", "5x", "6x", "5x²"], correct: 1, explanation: "3x + 2x = 5x" },
        { id: 4, question: "Solve: 3x - 6 = 9", options: ["x = 3", "x = 4", "x = 5", "x = 6"], correct: 2, explanation: "3x = 15, x = 5" },
        { id: 5, question: "If y = 2x + 3, what is y when x = 4?", options: ["9", "10", "11", "12"], correct: 2, explanation: "y = 2(4) + 3 = 8 + 3 = 11" },
      ]
    },
    {
      id: "percentages",
      name: "Percentages",
      icon: "💯",
      questions: [
        { id: 1, question: "What is 20% of 150?", options: ["20", "25", "30", "35"], correct: 2, explanation: "20% of 150 = 0.20 × 150 = 30" },
        { id: 2, question: "What percentage is 45 of 180?", options: ["20%", "25%", "30%", "35%"], correct: 1, explanation: "45/180 × 100 = 25%" },
        { id: 3, question: "A shirt costs ₹500. After 30% discount, what is the price?", options: ["₹300", "₹325", "₹350", "₹375"], correct: 2, explanation: "Discount = 30% of 500 = 150; Price = 500 - 150 = 350" },
        { id: 4, question: "What is 15% of 200?", options: ["25", "30", "35", "40"], correct: 1, explanation: "15% of 200 = 0.15 × 200 = 30" },
        { id: 5, question: "If a price increases from ₹400 to ₹500, what is the percentage increase?", options: ["20%", "25%", "30%", "35%"], correct: 1, explanation: "Increase = 100; % = 100/400 × 100 = 25%" },
      ]
    },
  ]
};

export const englishGames: SubjectGames = {
  subject: "English",
  color: "green",
  topics: [
    {
      id: "nouns",
      name: "Nouns",
      icon: "📝",
      questions: [
        { id: 1, question: "Which of the following is a proper noun?", options: ["city", "London", "book", "river"], correct: 1, explanation: "London is a proper noun — a specific name of a place." },
        { id: 2, question: "Identify the collective noun: 'A _____ of fish'", options: ["pack", "flock", "school", "herd"], correct: 2, explanation: "A school of fish is the correct collective noun." },
        { id: 3, question: "Which is an abstract noun?", options: ["table", "tree", "happiness", "cat"], correct: 2, explanation: "Happiness is an abstract noun — it cannot be seen or touched." },
        { id: 4, question: "Which sentence contains a compound noun?", options: ["She runs fast", "The bedroom is clean", "He eats food", "Birds fly high"], correct: 1, explanation: "'Bedroom' is a compound noun (bed + room)." },
        { id: 5, question: "What is the plural of 'child'?", options: ["childs", "childes", "children", "childies"], correct: 2, explanation: "The plural of child is children (irregular plural)." },
      ]
    },
    {
      id: "verbs",
      name: "Verbs",
      icon: "🏃",
      questions: [
        { id: 1, question: "Identify the verb: 'She quickly ran to school.'", options: ["She", "quickly", "ran", "school"], correct: 2, explanation: "'Ran' is the action verb in the sentence." },
        { id: 2, question: "Which is an auxiliary (helping) verb?", options: ["run", "have", "big", "book"], correct: 1, explanation: "'Have' is an auxiliary verb used to form tenses." },
        { id: 3, question: "What form of verb is 'singing' in 'She is singing'?", options: ["Infinitive", "Past participle", "Present participle", "Simple past"], correct: 2, explanation: "'Singing' is the present participle form." },
        { id: 4, question: "Past tense of 'write' is:", options: ["writed", "written", "wrote", "writ"], correct: 2, explanation: "The simple past tense of 'write' is 'wrote'." },
        { id: 5, question: "Which sentence is in the passive voice?", options: ["Tom ate the cake", "The cake was eaten by Tom", "Tom eats cake", "Cake is tasty"], correct: 1, explanation: "'The cake was eaten by Tom' is passive voice." },
      ]
    },
    {
      id: "adjectives",
      name: "Adjectives",
      icon: "🎨",
      questions: [
        { id: 1, question: "Identify the adjective: 'The tall boy ran fast.'", options: ["boy", "ran", "tall", "fast"], correct: 2, explanation: "'Tall' describes the boy, so it is an adjective." },
        { id: 2, question: "What is the superlative form of 'good'?", options: ["gooder", "goodest", "better", "best"], correct: 3, explanation: "The superlative form of 'good' is 'best'." },
        { id: 3, question: "Which is a demonstrative adjective?", options: ["beautiful", "this", "quickly", "run"], correct: 1, explanation: "'This' is a demonstrative adjective pointing to a specific noun." },
        { id: 4, question: "Comparative form of 'happy' is:", options: ["happier", "happiest", "more happy", "most happy"], correct: 0, explanation: "The comparative form of 'happy' is 'happier'." },
        { id: 5, question: "Which adjective describes quantity?", options: ["blue", "heavy", "some", "round"], correct: 2, explanation: "'Some' is an adjective of quantity." },
      ]
    },
    {
      id: "tenses",
      name: "Tenses",
      icon: "⏱️",
      questions: [
        { id: 1, question: "'She has eaten' is in which tense?", options: ["Simple past", "Past continuous", "Present perfect", "Past perfect"], correct: 2, explanation: "'Has eaten' is present perfect tense." },
        { id: 2, question: "Complete: 'By tomorrow, he _____ the project.'", options: ["will complete", "will have completed", "completes", "completed"], correct: 1, explanation: "Future perfect: 'will have completed'." },
        { id: 3, question: "'They were playing football' is in which tense?", options: ["Simple past", "Past continuous", "Present continuous", "Past perfect"], correct: 1, explanation: "'Were playing' is past continuous tense." },
        { id: 4, question: "Which is simple present tense?", options: ["She ate", "She is eating", "She eats", "She has eaten"], correct: 2, explanation: "'She eats' is simple present tense." },
        { id: 5, question: "Convert to future: 'I am studying.'", options: ["I studied", "I will study", "I have studied", "I was studying"], correct: 1, explanation: "Simple future: 'I will study'." },
      ]
    },
    {
      id: "grammar",
      name: "Grammar",
      icon: "📚",
      questions: [
        { id: 1, question: "Choose the correct sentence:", options: ["He don't know", "He doesn't knows", "He doesn't know", "He not know"], correct: 2, explanation: "Correct: 'He doesn't know' — third person singular uses 'doesn't'." },
        { id: 2, question: "Fill in the blank: 'Neither the boys ___ the girl was present.'", options: ["or", "nor", "and", "but"], correct: 1, explanation: "'Neither...nor' is the correct correlative conjunction." },
        { id: 3, question: "Which sentence is grammatically correct?", options: ["I has a cat", "She have a dog", "They has a bird", "We have a parrot"], correct: 3, explanation: "'We have a parrot' uses the correct verb form." },
        { id: 4, question: "Identify the preposition: 'The book is on the table.'", options: ["book", "is", "on", "table"], correct: 2, explanation: "'On' is the preposition showing position." },
        { id: 5, question: "Which punctuation ends an exclamatory sentence?", options: [".", "?", "!", ","], correct: 2, explanation: "An exclamatory sentence ends with an exclamation mark (!)." },
      ]
    },
    {
      id: "comprehension",
      name: "Comprehension",
      icon: "📖",
      questions: [
        { id: 1, question: "What does 'infer' mean in reading comprehension?", options: ["Read aloud", "Draw a conclusion from evidence", "Copy text", "Summarize"], correct: 1, explanation: "To infer means to draw a logical conclusion based on evidence in the text." },
        { id: 2, question: "What is the 'main idea' of a passage?", options: ["First sentence", "Last sentence", "Central thought the author conveys", "Any interesting fact"], correct: 2, explanation: "The main idea is the central point or message of the passage." },
        { id: 3, question: "A synonym means:", options: ["Opposite word", "Word with same meaning", "Rhyming word", "Longer word"], correct: 1, explanation: "A synonym is a word that has the same or nearly the same meaning." },
        { id: 4, question: "What is a metaphor?", options: ["Direct comparison using 'like/as'", "A comparison without 'like/as'", "An exaggeration", "A rhyme scheme"], correct: 1, explanation: "A metaphor directly states something is something else, without 'like' or 'as'." },
        { id: 5, question: "What is the purpose of a topic sentence?", options: ["Conclude the paragraph", "Add details", "Introduce the main idea of a paragraph", "Add examples"], correct: 2, explanation: "A topic sentence states the main idea of a paragraph." },
      ]
    },
    {
      id: "vocabulary",
      name: "Vocabulary",
      icon: "🔤",
      questions: [
        { id: 1, question: "What does 'benevolent' mean?", options: ["Cruel", "Kind and generous", "Lazy", "Bright"], correct: 1, explanation: "Benevolent means well-meaning and kindly." },
        { id: 2, question: "Antonym of 'ancient' is:", options: ["Old", "New/Modern", "Historic", "Ruined"], correct: 1, explanation: "Ancient means very old; its antonym is modern/new." },
        { id: 3, question: "What does 'lucid' mean?", options: ["Cloudy", "Clear and easy to understand", "Dark", "Mysterious"], correct: 1, explanation: "Lucid means clearly expressed and easy to understand." },
        { id: 4, question: "Synonym of 'brave' is:", options: ["Fearful", "Timid", "Courageous", "Cautious"], correct: 2, explanation: "Courageous is a synonym of brave." },
        { id: 5, question: "What does 'persevere' mean?", options: ["Give up easily", "Continue despite difficulty", "Run quickly", "Sleep deeply"], correct: 1, explanation: "Persevere means to continue in a course of action even in the face of difficulty." },
      ]
    },
    {
      id: "creative-writing",
      name: "Creative Writing",
      icon: "✍️",
      questions: [
        { id: 1, question: "A 'narrative essay' tells:", options: ["How to do something", "A personal story or experience", "Both sides of an argument", "Facts about a topic"], correct: 1, explanation: "A narrative essay tells a personal story or experience." },
        { id: 2, question: "What is 'onomatopoeia'?", options: ["A long word", "Words that imitate sounds (buzz, bang)", "A type of poem", "A grammar rule"], correct: 1, explanation: "Onomatopoeia refers to words that phonetically imitate sounds." },
        { id: 3, question: "In a story, the 'climax' is:", options: ["The beginning", "The most exciting/turning point", "The end", "The setting"], correct: 1, explanation: "The climax is the most intense or exciting part of the story." },
        { id: 4, question: "What is 'alliteration'?", options: ["Rhyming words", "Repetition of consonant sounds at start of words", "A type of metaphor", "Using similes"], correct: 1, explanation: "Alliteration is the repetition of initial consonant sounds in nearby words." },
        { id: 5, question: "A 'persuasive essay' aims to:", options: ["Tell a story", "Explain how something works", "Convince the reader of a viewpoint", "Describe a scene"], correct: 2, explanation: "A persuasive essay tries to convince the reader to agree with the writer's viewpoint." },
      ]
    },
  ]
};

export const scienceGames: SubjectGames = {
  subject: "Science",
  color: "purple",
  topics: [
    {
      id: "human-body",
      name: "Human Body",
      icon: "🧠",
      questions: [
        { id: 1, question: "Which organ pumps blood through the body?", options: ["Lungs", "Liver", "Heart", "Kidney"], correct: 2, explanation: "The heart is the muscular organ that pumps blood throughout the body." },
        { id: 2, question: "How many bones are in the adult human body?", options: ["186", "196", "206", "216"], correct: 2, explanation: "An adult human body has 206 bones." },
        { id: 3, question: "Which part of the brain controls balance?", options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"], correct: 1, explanation: "The cerebellum controls balance and coordination." },
        { id: 4, question: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Brain", "Skin"], correct: 3, explanation: "Skin is the largest organ of the human body." },
        { id: 5, question: "Which blood cells fight infection?", options: ["Red blood cells", "Platelets", "White blood cells", "Plasma"], correct: 2, explanation: "White blood cells (leukocytes) are the infection-fighting cells." },
      ]
    },
    {
      id: "plants",
      name: "Plants",
      icon: "🌱",
      questions: [
        { id: 1, question: "Which process do plants use to make food?", options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"], correct: 1, explanation: "Plants make food through photosynthesis using sunlight, CO₂ and water." },
        { id: 2, question: "What gas do plants release during photosynthesis?", options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"], correct: 2, explanation: "Plants release oxygen as a byproduct of photosynthesis." },
        { id: 3, question: "What is the green pigment in plants called?", options: ["Melanin", "Carotene", "Chlorophyll", "Anthocyanin"], correct: 2, explanation: "Chlorophyll is the green pigment that absorbs sunlight." },
        { id: 4, question: "Through which part do plants absorb water from soil?", options: ["Leaves", "Stem", "Roots", "Flowers"], correct: 2, explanation: "Roots absorb water and minerals from the soil." },
        { id: 5, question: "What is the process of water loss through leaves called?", options: ["Osmosis", "Transpiration", "Photosynthesis", "Respiration"], correct: 1, explanation: "Transpiration is the process of water evaporation through leaf pores (stomata)." },
      ]
    },
    {
      id: "animals",
      name: "Animals",
      icon: "🦁",
      questions: [
        { id: 1, question: "Animals that eat only plants are called:", options: ["Carnivores", "Omnivores", "Herbivores", "Decomposers"], correct: 2, explanation: "Herbivores eat only plants (e.g., cow, deer, rabbit)." },
        { id: 2, question: "Which animal is a mammal?", options: ["Crocodile", "Shark", "Dolphin", "Frog"], correct: 2, explanation: "Dolphins are mammals — they breathe air and nurse young with milk." },
        { id: 3, question: "What is the term for animals active at night?", options: ["Diurnal", "Nocturnal", "Crepuscular", "Aquatic"], correct: 1, explanation: "Nocturnal animals are active at night (e.g., owls, bats)." },
        { id: 4, question: "Which class of animals has scales and lays eggs?", options: ["Mammals", "Amphibians", "Birds", "Reptiles"], correct: 3, explanation: "Reptiles have scales and most lay eggs (e.g., snakes, lizards)." },
        { id: 5, question: "The study of birds is called:", options: ["Entomology", "Ornithology", "Herpetology", "Zoology"], correct: 1, explanation: "Ornithology is the scientific study of birds." },
      ]
    },
    {
      id: "matter",
      name: "Matter & Materials",
      icon: "⚗️",
      questions: [
        { id: 1, question: "What are the three states of matter?", options: ["Solid, liquid, plasma", "Solid, liquid, gas", "Gas, plasma, energy", "Ice, water, steam"], correct: 1, explanation: "The three main states of matter are solid, liquid, and gas." },
        { id: 2, question: "At what temperature does water boil?", options: ["90°C", "95°C", "100°C", "110°C"], correct: 2, explanation: "Water boils at 100°C (212°F) at standard atmospheric pressure." },
        { id: 3, question: "What is the chemical symbol for water?", options: ["WA", "Wt", "H₂O", "HO₂"], correct: 2, explanation: "Water is H₂O — two hydrogen atoms and one oxygen atom." },
        { id: 4, question: "Which state of matter has a definite shape and volume?", options: ["Gas", "Liquid", "Solid", "Plasma"], correct: 2, explanation: "Solids have a definite shape and volume." },
        { id: 5, question: "What happens when ice melts?", options: ["Evaporation", "Condensation", "Melting/Fusion", "Sublimation"], correct: 2, explanation: "When ice (solid) changes to water (liquid), it is called melting or fusion." },
      ]
    },
    {
      id: "forces",
      name: "Forces & Motion",
      icon: "⚡",
      questions: [
        { id: 1, question: "What force pulls objects toward Earth?", options: ["Friction", "Magnetism", "Gravity", "Tension"], correct: 2, explanation: "Gravity is the force that pulls objects toward the Earth's center." },
        { id: 2, question: "What is the unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], correct: 2, explanation: "Force is measured in Newtons (N)." },
        { id: 3, question: "Which force opposes motion between surfaces?", options: ["Gravity", "Friction", "Magnetism", "Buoyancy"], correct: 1, explanation: "Friction is the force that opposes motion between two surfaces." },
        { id: 4, question: "Newton's first law is also called the law of:", options: ["Acceleration", "Action-Reaction", "Inertia", "Momentum"], correct: 2, explanation: "Newton's first law is the law of inertia — objects remain in their state of motion." },
        { id: 5, question: "What is the formula for speed?", options: ["Speed = Distance × Time", "Speed = Distance ÷ Time", "Speed = Mass × Acceleration", "Speed = Force ÷ Mass"], correct: 1, explanation: "Speed = Distance ÷ Time" },
      ]
    },
    {
      id: "earth-space",
      name: "Earth & Space",
      icon: "🌍",
      questions: [
        { id: 1, question: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], correct: 1, explanation: "There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune." },
        { id: 2, question: "Which planet is closest to the Sun?", options: ["Venus", "Mars", "Earth", "Mercury"], correct: 3, explanation: "Mercury is the closest planet to the Sun." },
        { id: 3, question: "What causes day and night on Earth?", options: ["Revolution around Sun", "Rotation on its own axis", "Moon's gravity", "Earth's tilt"], correct: 1, explanation: "Earth's rotation on its own axis causes day and night." },
        { id: 4, question: "What is the largest planet in our solar system?", options: ["Saturn", "Neptune", "Jupiter", "Uranus"], correct: 2, explanation: "Jupiter is the largest planet in our solar system." },
        { id: 5, question: "What is a light-year?", options: ["Speed of light per second", "Distance light travels in one year", "Age of the universe", "Size of a galaxy"], correct: 1, explanation: "A light-year is the distance light travels in one year (about 9.46 trillion km)." },
      ]
    },
    {
      id: "electricity",
      name: "Electricity",
      icon: "💡",
      questions: [
        { id: 1, question: "What is the unit of electric current?", options: ["Volt", "Watt", "Ampere", "Ohm"], correct: 2, explanation: "Electric current is measured in Amperes (A)." },
        { id: 2, question: "Which material is the best conductor of electricity?", options: ["Wood", "Rubber", "Copper", "Glass"], correct: 2, explanation: "Copper is an excellent conductor of electricity." },
        { id: 3, question: "What does a circuit breaker do?", options: ["Stores electricity", "Generates electricity", "Protects circuit from overload", "Measures voltage"], correct: 2, explanation: "A circuit breaker protects electrical circuits from damage due to overload." },
        { id: 4, question: "In a series circuit, if one bulb fuses:", options: ["Others glow brighter", "Others continue to glow", "All bulbs stop glowing", "Nothing changes"], correct: 2, explanation: "In a series circuit, all components share one path — if one fails, all stop." },
        { id: 5, question: "What is voltage measured in?", options: ["Amperes", "Watts", "Volts", "Ohms"], correct: 2, explanation: "Voltage (electric potential difference) is measured in Volts (V)." },
      ]
    },
    {
      id: "environment",
      name: "Environment",
      icon: "🌿",
      questions: [
        { id: 1, question: "What is the greenhouse effect?", options: ["Growing plants in glass", "Warming of Earth due to trapped heat", "Cooling of oceans", "Acid rain formation"], correct: 1, explanation: "The greenhouse effect is the trapping of Sun's heat in Earth's atmosphere." },
        { id: 2, question: "Which gas is primarily responsible for global warming?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], correct: 2, explanation: "Carbon dioxide (CO₂) is the main greenhouse gas causing global warming." },
        { id: 3, question: "What is biodiversity?", options: ["Variety of climates", "Variety of life forms in an ecosystem", "Different types of soil", "Ocean water diversity"], correct: 1, explanation: "Biodiversity refers to the variety of living organisms in an ecosystem." },
        { id: 4, question: "What is a food chain?", options: ["Grocery store chain", "Sequence of who eats whom in nature", "Recycling process", "Water cycle"], correct: 1, explanation: "A food chain shows the flow of energy from one organism to another." },
        { id: 5, question: "What is the 3Rs of environmental conservation?", options: ["Reduce, Reuse, Recycle", "Read, Reflect, Respond", "Rain, Rivers, Resources", "Rest, Renew, Recover"], correct: 0, explanation: "The 3Rs — Reduce, Reuse, Recycle — help protect the environment." },
      ]
    },
  ]
};

export const hindiGames: SubjectGames = {
  subject: "Hindi",
  color: "orange",
  topics: [
    {
      id: "varnamala",
      name: "वर्णमाला (Alphabet)",
      icon: "अ",
      questions: [
        { id: 1, question: "हिंदी वर्णमाला में स्वरों की संख्या कितनी है?", options: ["11", "13", "16", "18"], correct: 0, explanation: "हिंदी वर्णमाला में 11 स्वर हैं: अ, आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ, ऋ" },
        { id: 2, question: "'क' वर्ग में कितने व्यंजन हैं?", options: ["3", "4", "5", "6"], correct: 2, explanation: "क वर्ग में 5 व्यंजन हैं: क, ख, ग, घ, ङ" },
        { id: 3, question: "कौन सा स्वर नहीं है?", options: ["अ", "क", "इ", "उ"], correct: 1, explanation: "'क' एक व्यंजन है, स्वर नहीं।" },
        { id: 4, question: "हिंदी में कुल कितने व्यंजन हैं?", options: ["33", "36", "40", "44"], correct: 0, explanation: "हिंदी वर्णमाला में 33 व्यंजन हैं।" },
        { id: 5, question: "'ड़' और 'ढ़' किस प्रकार के व्यंजन हैं?", options: ["मूल व्यंजन", "उत्क्षिप्त व्यंजन", "संयुक्त व्यंजन", "अनुस्वार"], correct: 1, explanation: "'ड़' और 'ढ़' उत्क्षिप्त (flap) व्यंजन हैं।" },
      ]
    },
    {
      id: "shabd",
      name: "शब्द (Words)",
      icon: "📝",
      questions: [
        { id: 1, question: "'पेड़' का बहुवचन क्या है?", options: ["पेड़ें", "पेड़ों", "पेड़े", "पेड़ा"], correct: 1, explanation: "'पेड़' का बहुवचन 'पेड़ों' होता है (oblique plural)।" },
        { id: 2, question: "'राजा' का स्त्रीलिंग क्या है?", options: ["राजानी", "राजिन", "रानी", "राजी"], correct: 2, explanation: "'राजा' का स्त्रीलिंग 'रानी' है।" },
        { id: 3, question: "'आकाश' का पर्यायवाची (synonym) कौन सा है?", options: ["पृथ्वी", "गगन", "सागर", "पर्वत"], correct: 1, explanation: "'आकाश' का पर्यायवाची 'गगन', 'अंबर', 'नभ' आदि हैं।" },
        { id: 4, question: "कौन सा शब्द 'सूर्य' का पर्यायवाची नहीं है?", options: ["भास्कर", "रवि", "शशि", "दिनकर"], correct: 2, explanation: "'शशि' चंद्रमा का पर्यायवाची है, सूर्य का नहीं।" },
        { id: 5, question: "विलोम बताइए: 'दिन'", options: ["सुबह", "शाम", "रात", "दोपहर"], correct: 2, explanation: "'दिन' का विलोम (antonym) 'रात' है।" },
      ]
    },
    {
      id: "vyakaran",
      name: "व्याकरण (Grammar)",
      icon: "📚",
      questions: [
        { id: 1, question: "संज्ञा के कितने भेद होते हैं?", options: ["3", "4", "5", "6"], correct: 2, explanation: "संज्ञा के 5 भेद हैं: व्यक्तिवाचक, जातिवाचक, भाववाचक, समूहवाचक, द्रव्यवाचक।" },
        { id: 2, question: "'वह दौड़ता है' — 'वह' कौन सा सर्वनाम है?", options: ["पुरुषवाचक", "निश्चयवाचक", "अनिश्चयवाचक", "प्रश्नवाचक"], correct: 0, explanation: "'वह' एक पुरुषवाचक (personal) सर्वनाम है (अन्य पुरुष)।" },
        { id: 3, question: "क्रिया के कितने भेद होते हैं?", options: ["2", "3", "4", "5"], correct: 0, explanation: "क्रिया के 2 मुख्य भेद हैं: सकर्मक और अकर्मक।" },
        { id: 4, question: "'अच्छा बच्चा' में 'अच्छा' कौन सा विशेषण है?", options: ["गुणवाचक", "परिमाणवाचक", "संख्यावाचक", "सार्वनामिक"], correct: 0, explanation: "'अच्छा' एक गुणवाचक विशेषण है।" },
        { id: 5, question: "'बहुत' किस प्रकार का क्रियाविशेषण है?", options: ["रीतिवाचक", "स्थानवाचक", "परिमाणवाचक", "कालवाचक"], correct: 2, explanation: "'बहुत' परिमाणवाचक क्रियाविशेषण है।" },
      ]
    },
    {
      id: "kavita",
      name: "कविता (Poetry)",
      icon: "🎭",
      questions: [
        { id: 1, question: "दोहे में कितनी पंक्तियाँ होती हैं?", options: ["1", "2", "3", "4"], correct: 1, explanation: "दोहा एक छंद है जिसमें 2 पंक्तियाँ (चरण) होती हैं।" },
        { id: 2, question: "कबीर दास किस काल के कवि थे?", options: ["आधुनिक काल", "भक्ति काल", "वीरगाथा काल", "रीतिकाल"], correct: 1, explanation: "कबीर दास भक्ति काल (15वीं सदी) के महान कवि थे।" },
        { id: 3, question: "'तुलसीदास' ने कौन सा प्रमुख ग्रंथ लिखा?", options: ["महाभारत", "रामायण", "रामचरितमानस", "मेघदूत"], correct: 2, explanation: "तुलसीदास ने 'रामचरितमानस' की रचना की।" },
        { id: 4, question: "मीराबाई किनकी भक्त थीं?", options: ["राम", "कृष्ण", "शिव", "दुर्गा"], correct: 1, explanation: "मीराबाई भगवान कृष्ण की परम भक्त थीं।" },
        { id: 5, question: "'सूरदास' किस रस के प्रमुख कवि थे?", options: ["वीर रस", "श्रृंगार रस", "करुण रस", "वात्सल्य रस"], correct: 3, explanation: "सूरदास वात्सल्य रस और श्रृंगार रस के महान कवि थे।" },
      ]
    },
    {
      id: "gadya",
      name: "गद्य (Prose)",
      icon: "📰",
      questions: [
        { id: 1, question: "निबंध के कितने अंग होते हैं?", options: ["2", "3", "4", "5"], correct: 1, explanation: "निबंध के 3 मुख्य अंग हैं: प्रस्तावना, मूल विषय, उपसंहार।" },
        { id: 2, question: "पत्र के कितने प्रकार होते हैं?", options: ["2", "3", "4", "5"], correct: 0, explanation: "पत्र के 2 प्रकार हैं: औपचारिक (Formal) और अनौपचारिक (Informal)।" },
        { id: 3, question: "संवाद का अर्थ क्या है?", options: ["कहानी", "दो व्यक्तियों के बीच बातचीत", "कविता", "निबंध"], correct: 1, explanation: "संवाद का अर्थ है दो या अधिक व्यक्तियों के बीच की बातचीत।" },
        { id: 4, question: "आत्मकथा किसके बारे में लिखी जाती है?", options: ["किसी और के बारे में", "स्वयं के बारे में", "देश के बारे में", "प्रकृति के बारे में"], correct: 1, explanation: "आत्मकथा लेखक अपने स्वयं के जीवन के बारे में लिखता है।" },
        { id: 5, question: "रिपोर्ताज क्या होता है?", options: ["एक प्रकार की कविता", "किसी घटना का आँखों देखा वर्णन", "नाटक का रूप", "शब्दकोश"], correct: 1, explanation: "रिपोर्ताज किसी घटना का प्रत्यक्ष, जीवंत वर्णन होता है।" },
      ]
    },
    {
      id: "muhavare",
      name: "मुहावरे (Idioms)",
      icon: "💬",
      questions: [
        { id: 1, question: "'आँखें चुराना' मुहावरे का अर्थ है:", options: ["आँखें बंद करना", "किसी से छुपना/सामना न करना", "चोरी करना", "देखना"], correct: 1, explanation: "'आँखें चुराना' का अर्थ है किसी से कतराना या सामना न करना।" },
        { id: 2, question: "'नौ दो ग्यारह होना' का अर्थ है:", options: ["गणित करना", "भाग जाना", "11 बजना", "9 और 2 जोड़ना"], correct: 1, explanation: "'नौ दो ग्यारह होना' का अर्थ है तेजी से भाग जाना।" },
        { id: 3, question: "'अंगूठा दिखाना' का अर्थ है:", options: ["अंगूठा उठाना", "मना करना/इनकार करना", "सहमति देना", "इशारा करना"], correct: 1, explanation: "'अंगूठा दिखाना' का अर्थ है मना करना या धोखा देना।" },
        { id: 4, question: "'हाथ-पाँव मारना' का अर्थ है:", options: ["मारपीट करना", "तैरना", "प्रयास करना", "चलना"], correct: 2, explanation: "'हाथ-पाँव मारना' का अर्थ है बहुत कोशिश करना।" },
        { id: 5, question: "'ईंट का जवाब पत्थर से देना' का अर्थ है:", options: ["पत्थर फेंकना", "करारा जवाब देना", "माफ कर देना", "पत्थर देना"], correct: 1, explanation: "इस मुहावरे का अर्थ है बुरे व्यवहार का कड़ा जवाब देना।" },
      ]
    },
    {
      id: "nibandh",
      name: "निबंध विषय (Essay Topics)",
      icon: "✍️",
      questions: [
        { id: 1, question: "'प्रदूषण' पर निबंध में कौन सा बिंदु सबसे उचित है?", options: ["खेल-कूद का महत्व", "वायु, जल और भूमि प्रदूषण के कारण और निवारण", "त्योहारों का वर्णन", "परिवार की जानकारी"], correct: 1, explanation: "प्रदूषण निबंध में प्रकार, कारण और निवारण का वर्णन होना चाहिए।" },
        { id: 2, question: "'मेरा प्रिय त्योहार' निबंध में किस त्योहार का वर्णन कर सकते हैं?", options: ["केवल दीपावली", "केवल होली", "कोई भी प्रिय त्योहार", "केवल ईद"], correct: 2, explanation: "आप अपने किसी भी प्रिय त्योहार के बारे में लिख सकते हैं।" },
        { id: 3, question: "निबंध की भाषा कैसी होनी चाहिए?", options: ["बहुत कठिन", "सरल, स्पष्ट और प्रवाहपूर्ण", "केवल तत्सम शब्दों वाली", "अंग्रेजी मिश्रित"], correct: 1, explanation: "निबंध की भाषा सरल, स्पष्ट और प्रवाहपूर्ण होनी चाहिए।" },
        { id: 4, question: "'विज्ञान के चमत्कार' निबंध में क्या शामिल करें?", options: ["इतिहास के युद्ध", "वैज्ञानिक आविष्कार और दैनिक जीवन में उपयोग", "प्रकृति का वर्णन", "धर्म का वर्णन"], correct: 1, explanation: "इस निबंध में वैज्ञानिक खोजों और जीवन पर उनके प्रभाव का वर्णन करें।" },
        { id: 5, question: "उपसंहार में क्या लिखा जाता है?", options: ["नई जानकारी", "विषय का परिचय", "विषय का सारांश और निष्कर्ष", "प्रश्न"], correct: 2, explanation: "उपसंहार में पूरे निबंध का सार और निष्कर्ष लिखा जाता है।" },
      ]
    },
  ]
};

export const allSubjectGames = [mathGames, englishGames, scienceGames, hindiGames];

export function getSubjectByName(subject: string): SubjectGames | undefined {
  return allSubjectGames.find(s => s.subject.toLowerCase() === subject.toLowerCase());
}
