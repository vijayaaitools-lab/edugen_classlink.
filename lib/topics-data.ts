export interface TopicItem {
  id: string;
  subject: string;
  grade: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  gameUrl: string;
  keywords: string[];
}

const GAME_URLS = {
  mathPlayground: "https://www.mathplayground.com",
  abcya: "https://www.abcya.com",
  starfall: "https://www.starfall.com",
  toyTheater: "https://toytheater.com",
  kahoot: "https://kahoot.com",
  khanAcademy: "https://www.khanacademy.org",
  brainpop: "https://www.brainpop.com",
  coolmathGames: "https://www.coolmathgames.com",
  funbrain: "https://www.funbrain.com",
  prodigy: "https://www.prodigygame.com",
};

export const PRELOADED_TOPICS: TopicItem[] = [
  // ========== MATH ==========
  // Grade 1 Math
  { id: "math-g1-numbers", subject: "Math", grade: "1", title: "Numbers 1 to 100", description: "Count, read and write numbers from 1 to 100", difficulty: "beginner", gameUrl: GAME_URLS.abcya, keywords: ["numbers", "counting", "1 to 100"] },
  { id: "math-g1-addition", subject: "Math", grade: "1", title: "Addition (single digit)", description: "Add single digit numbers", difficulty: "beginner", gameUrl: GAME_URLS.mathPlayground, keywords: ["addition", "plus"] },
  { id: "math-g1-subtraction", subject: "Math", grade: "1", title: "Subtraction (single digit)", description: "Subtract single digit numbers", difficulty: "beginner", gameUrl: GAME_URLS.mathPlayground, keywords: ["subtraction", "minus"] },
  { id: "math-g1-shapes", subject: "Math", grade: "1", title: "2D Shapes", description: "Circle, square, triangle, rectangle", difficulty: "beginner", gameUrl: GAME_URLS.toyTheater, keywords: ["shapes", "2D", "geometry"] },
  { id: "math-g1-tables1", subject: "Math", grade: "1", title: "Tables 1 to 10", description: "Multiplication tables from 1 to 10", difficulty: "beginner", gameUrl: GAME_URLS.mathPlayground, keywords: ["tables", "multiplication"] },
  { id: "math-g1-time", subject: "Math", grade: "1", title: "Telling Time", description: "Read clocks and understand hours and half hours", difficulty: "beginner", gameUrl: GAME_URLS.abcya, keywords: ["time", "clock", "hours"] },
  { id: "math-g1-patterns", subject: "Math", grade: "1", title: "Patterns", description: "Identify and create simple repeating patterns", difficulty: "beginner", gameUrl: GAME_URLS.toyTheater, keywords: ["patterns", "sequences"] },
  { id: "math-g1-measurement", subject: "Math", grade: "1", title: "Measurement", description: "Measure using handspan, footspan and objects", difficulty: "beginner", gameUrl: GAME_URLS.brainpop, keywords: ["measurement", "length"] },
  { id: "math-g1-money", subject: "Math", grade: "1", title: "Money", description: "Identify coins and notes, count money", difficulty: "beginner", gameUrl: GAME_URLS.abcya, keywords: ["money", "coins", "currency"] },

  // Grade 2 Math
  { id: "math-g2-numbers", subject: "Math", grade: "2", title: "Numbers 1 to 1000", description: "Place value, comparing and ordering numbers to 1000", difficulty: "beginner", gameUrl: GAME_URLS.abcya, keywords: ["numbers", "place value", "1000"] },
  { id: "math-g2-addition", subject: "Math", grade: "2", title: "Addition (2-digit)", description: "Add 2-digit numbers with and without regrouping", difficulty: "beginner", gameUrl: GAME_URLS.mathPlayground, keywords: ["addition", "2-digit", "regrouping"] },
  { id: "math-g2-subtraction", subject: "Math", grade: "2", title: "Subtraction (2-digit)", description: "Subtract 2-digit numbers with and without regrouping", difficulty: "beginner", gameUrl: GAME_URLS.mathPlayground, keywords: ["subtraction", "2-digit"] },
  { id: "math-g2-tables2", subject: "Math", grade: "2", title: "Tables 1 to 20", description: "Multiplication tables from 1 to 20", difficulty: "intermediate", gameUrl: GAME_URLS.mathPlayground, keywords: ["tables", "multiplication"] },
  { id: "math-g2-fractions", subject: "Math", grade: "2", title: "Fractions (Half and Quarter)", description: "Understanding halves and quarters", difficulty: "beginner", gameUrl: GAME_URLS.abcya, keywords: ["fractions", "half", "quarter"] },
  { id: "math-g2-shapes3d", subject: "Math", grade: "2", title: "3D Shapes", description: "Cube, sphere, cylinder, cone and their properties", difficulty: "beginner", gameUrl: GAME_URLS.toyTheater, keywords: ["3D shapes", "geometry", "solid shapes"] },
  { id: "math-g2-data", subject: "Math", grade: "2", title: "Block Graphs & Pictograms", description: "Reading and creating simple graphs", difficulty: "beginner", gameUrl: GAME_URLS.brainpop, keywords: ["graphs", "data", "pictogram"] },
  { id: "math-g2-rounding", subject: "Math", grade: "2", title: "Rounding Numbers", description: "Round numbers to nearest 10 and 100", difficulty: "intermediate", gameUrl: GAME_URLS.mathPlayground, keywords: ["rounding", "nearest 10", "nearest 100"] },

  // Grade 3 Math
  { id: "math-g3-numbers", subject: "Math", grade: "3", title: "Numbers to 10,000", description: "Read, write and order numbers up to 10,000", difficulty: "intermediate", gameUrl: GAME_URLS.abcya, keywords: ["numbers", "10000", "place value"] },
  { id: "math-g3-multiplication", subject: "Math", grade: "3", title: "Multiplication", description: "Multiply 2-digit numbers, understand arrays", difficulty: "intermediate", gameUrl: GAME_URLS.mathPlayground, keywords: ["multiplication", "times", "arrays"] },
  { id: "math-g3-division", subject: "Math", grade: "3", title: "Division", description: "Divide numbers, understand remainders", difficulty: "intermediate", gameUrl: GAME_URLS.mathPlayground, keywords: ["division", "divide", "remainder"] },
  { id: "math-g3-fractions", subject: "Math", grade: "3", title: "Fractions", description: "Equivalent fractions, comparing fractions", difficulty: "intermediate", gameUrl: GAME_URLS.abcya, keywords: ["fractions", "equivalent", "comparing"] },
  { id: "math-g3-angles", subject: "Math", grade: "3", title: "Angles and Turns", description: "Right angles, half and quarter turns", difficulty: "intermediate", gameUrl: GAME_URLS.toyTheater, keywords: ["angles", "turns", "geometry"] },
  { id: "math-g3-perimeter", subject: "Math", grade: "3", title: "Perimeter and Area", description: "Calculate perimeter and area of simple shapes", difficulty: "intermediate", gameUrl: GAME_URLS.mathPlayground, keywords: ["perimeter", "area", "measurement"] },
  { id: "math-g3-venn", subject: "Math", grade: "3", title: "Venn Diagrams", description: "Sort objects using Venn diagrams", difficulty: "intermediate", gameUrl: GAME_URLS.brainpop, keywords: ["Venn diagram", "sorting", "sets"] },

  // Grade 4 Math
  { id: "math-g4-numbers", subject: "Math", grade: "4", title: "Numbers to 100,000", description: "Work with large numbers up to 100,000", difficulty: "intermediate", gameUrl: GAME_URLS.abcya, keywords: ["numbers", "100000", "large numbers"] },
  { id: "math-g4-decimals", subject: "Math", grade: "4", title: "Decimals", description: "Understanding tenths and hundredths", difficulty: "intermediate", gameUrl: GAME_URLS.mathPlayground, keywords: ["decimals", "tenths", "hundredths"] },
  { id: "math-g4-fractions-adv", subject: "Math", grade: "4", title: "Advanced Fractions", description: "Add and subtract fractions with same denominator", difficulty: "intermediate", gameUrl: GAME_URLS.abcya, keywords: ["fractions", "add", "subtract"] },
  { id: "math-g4-symmetry", subject: "Math", grade: "4", title: "Symmetry", description: "Lines of symmetry in 2D shapes", difficulty: "intermediate", gameUrl: GAME_URLS.toyTheater, keywords: ["symmetry", "lines of symmetry"] },
  { id: "math-g4-circles", subject: "Math", grade: "4", title: "Circles", description: "Radius, diameter, and circumference", difficulty: "intermediate", gameUrl: GAME_URLS.mathPlayground, keywords: ["circles", "radius", "diameter"] },
  { id: "math-g4-statistics", subject: "Math", grade: "4", title: "Statistics", description: "Mean, median, mode and bar charts", difficulty: "intermediate", gameUrl: GAME_URLS.brainpop, keywords: ["statistics", "mean", "median", "mode"] },
  { id: "math-g4-carroll", subject: "Math", grade: "4", title: "Carroll Diagrams", description: "Classify numbers using Carroll diagrams", difficulty: "intermediate", gameUrl: GAME_URLS.toyTheater, keywords: ["Carroll diagram", "classification"] },

  // Grade 5 Math
  { id: "math-g5-numbers", subject: "Math", grade: "5", title: "Numbers to 1,000,000", description: "Read, write and order numbers to one million", difficulty: "intermediate", gameUrl: GAME_URLS.abcya, keywords: ["numbers", "million", "large numbers"] },
  { id: "math-g5-percentages", subject: "Math", grade: "5", title: "Percentages", description: "Understanding and calculating percentages", difficulty: "intermediate", gameUrl: GAME_URLS.mathPlayground, keywords: ["percentages", "percent", "%"] },
  { id: "math-g5-ratio", subject: "Math", grade: "5", title: "Ratio and Proportion", description: "Simple ratios and proportional reasoning", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["ratio", "proportion", "scaling"] },
  { id: "math-g5-area-volume", subject: "Math", grade: "5", title: "Area and Volume", description: "Area of compound shapes, volume of cuboids", difficulty: "advanced", gameUrl: GAME_URLS.mathPlayground, keywords: ["area", "volume", "cuboid"] },
  { id: "math-g5-algebra-intro", subject: "Math", grade: "5", title: "Introduction to Algebra", description: "Simple expressions, equations and unknowns", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["algebra", "equations", "unknowns"] },

  // Grade 6 Math
  { id: "math-g6-algebra", subject: "Math", grade: "6", title: "Algebra", description: "Linear equations, substitution, expressions", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["algebra", "linear equations", "expressions"] },
  { id: "math-g6-integers", subject: "Math", grade: "6", title: "Integers", description: "Positive and negative integers, operations", difficulty: "intermediate", gameUrl: GAME_URLS.mathPlayground, keywords: ["integers", "negative numbers"] },
  { id: "math-g6-probability", subject: "Math", grade: "6", title: "Probability", description: "Basic probability, outcomes and events", difficulty: "advanced", gameUrl: GAME_URLS.brainpop, keywords: ["probability", "chance", "outcomes"] },
  { id: "math-g6-geometry", subject: "Math", grade: "6", title: "Advanced Geometry", description: "Angles in polygons, coordinate geometry", difficulty: "advanced", gameUrl: GAME_URLS.mathPlayground, keywords: ["geometry", "angles", "polygons", "coordinates"] },

  // Grades 7-12 Math
  { id: "math-g7-quadratics", subject: "Math", grade: "7", title: "Quadratic Equations", description: "Factorization and quadratic formula", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["quadratic", "equations", "factorization"] },
  { id: "math-g7-trigonometry", subject: "Math", grade: "7", title: "Introduction to Trigonometry", description: "Sine, cosine, tangent in right triangles", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["trigonometry", "sine", "cosine", "tangent"] },
  { id: "math-g8-linear-algebra", subject: "Math", grade: "8", title: "Simultaneous Equations", description: "Solve simultaneous linear equations", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["simultaneous equations", "algebra"] },
  { id: "math-g9-statistics", subject: "Math", grade: "9", title: "Advanced Statistics", description: "Standard deviation, normal distribution, histograms", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["statistics", "standard deviation", "normal distribution"] },
  { id: "math-g10-calculus", subject: "Math", grade: "10", title: "Introduction to Calculus", description: "Differentiation basics, rates of change", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["calculus", "differentiation", "derivatives"] },
  { id: "math-g11-calculus", subject: "Math", grade: "11", title: "Integral Calculus", description: "Integration, area under curves", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["calculus", "integration", "integrals"] },
  { id: "math-g12-matrices", subject: "Math", grade: "12", title: "Matrices and Vectors", description: "Matrix operations, determinants, eigenvectors", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["matrices", "vectors", "linear algebra"] },

  // Mental Math (all grades)
  { id: "math-mental-g1", subject: "Math", grade: "1", title: "Mental Math (Grade 1)", description: "Quick addition and subtraction in your head", difficulty: "beginner", gameUrl: GAME_URLS.abcya, keywords: ["mental math", "quick calculations"] },
  { id: "math-mental-g2", subject: "Math", grade: "2", title: "Mental Math (Grade 2)", description: "Fast number bonds and doubles", difficulty: "beginner", gameUrl: GAME_URLS.mathPlayground, keywords: ["mental math", "number bonds"] },
  { id: "math-mental-g3", subject: "Math", grade: "3", title: "Mental Math (Grade 3)", description: "Quick multiplication and division tricks", difficulty: "intermediate", gameUrl: GAME_URLS.coolmathGames, keywords: ["mental math", "multiplication tricks"] },
  { id: "math-mental-g4", subject: "Math", grade: "4", title: "Mental Math (Grade 4)", description: "Estimation and approximation strategies", difficulty: "intermediate", gameUrl: GAME_URLS.coolmathGames, keywords: ["mental math", "estimation"] },
  { id: "math-mental-g5", subject: "Math", grade: "5", title: "Mental Math (Grade 5)", description: "Percentage calculations and fraction shortcuts", difficulty: "intermediate", gameUrl: GAME_URLS.coolmathGames, keywords: ["mental math", "percentages"] },
  { id: "math-mental-g6", subject: "Math", grade: "6", title: "Mental Math (Grade 6)", description: "Algebraic shortcut methods", difficulty: "advanced", gameUrl: GAME_URLS.coolmathGames, keywords: ["mental math", "algebra shortcuts"] },

  // ========== ENGLISH ==========
  // Grade 1 English
  { id: "eng-g1-nouns", subject: "English", grade: "1", title: "Nouns", description: "Names of people, places and things", difficulty: "beginner", gameUrl: GAME_URLS.starfall, keywords: ["nouns", "naming words"] },
  { id: "eng-g1-verbs", subject: "English", grade: "1", title: "Action Verbs", description: "Words that show actions", difficulty: "beginner", gameUrl: GAME_URLS.starfall, keywords: ["verbs", "action words"] },
  { id: "eng-g1-phonics", subject: "English", grade: "1", title: "Phonics", description: "Letter sounds, blending and segmenting", difficulty: "beginner", gameUrl: GAME_URLS.starfall, keywords: ["phonics", "letter sounds", "blending"] },
  { id: "eng-g1-vocabulary", subject: "English", grade: "1", title: "Vocabulary Builder", description: "Common everyday words and their meanings", difficulty: "beginner", gameUrl: GAME_URLS.abcya, keywords: ["vocabulary", "word meanings"] },
  { id: "eng-g1-punctuation", subject: "English", grade: "1", title: "Basic Punctuation", description: "Full stops, question marks and exclamation marks", difficulty: "beginner", gameUrl: GAME_URLS.starfall, keywords: ["punctuation", "full stop", "question mark"] },

  // Grade 2 English
  { id: "eng-g2-adjectives", subject: "English", grade: "2", title: "Adjectives", description: "Describing words for nouns", difficulty: "beginner", gameUrl: GAME_URLS.abcya, keywords: ["adjectives", "describing words"] },
  { id: "eng-g2-sentences", subject: "English", grade: "2", title: "Sentence Structure", description: "Subject, predicate and complete sentences", difficulty: "beginner", gameUrl: GAME_URLS.starfall, keywords: ["sentences", "subject", "predicate"] },
  { id: "eng-g2-synonyms", subject: "English", grade: "2", title: "Synonyms and Antonyms", description: "Words with similar and opposite meanings", difficulty: "beginner", gameUrl: GAME_URLS.abcya, keywords: ["synonyms", "antonyms", "word meanings"] },
  { id: "eng-g2-comprehension", subject: "English", grade: "2", title: "Reading Comprehension", description: "Read and answer questions about short passages", difficulty: "beginner", gameUrl: GAME_URLS.funbrain, keywords: ["comprehension", "reading", "understanding"] },

  // Grade 3 English
  { id: "eng-g3-adverbs", subject: "English", grade: "3", title: "Adverbs", description: "Words that describe verbs, adjectives or other adverbs", difficulty: "intermediate", gameUrl: GAME_URLS.abcya, keywords: ["adverbs", "describing verbs"] },
  { id: "eng-g3-pronouns", subject: "English", grade: "3", title: "Pronouns", description: "Personal, possessive and reflexive pronouns", difficulty: "intermediate", gameUrl: GAME_URLS.abcya, keywords: ["pronouns", "personal pronouns", "he", "she", "they"] },
  { id: "eng-g3-conjunctions", subject: "English", grade: "3", title: "Conjunctions", description: "Connecting words: and, but, or, because, although", difficulty: "intermediate", gameUrl: GAME_URLS.starfall, keywords: ["conjunctions", "connecting words", "and", "but"] },
  { id: "eng-g3-letter-writing", subject: "English", grade: "3", title: "Letter Writing", description: "Format of informal and formal letters", difficulty: "intermediate", gameUrl: GAME_URLS.kahoot, keywords: ["letter writing", "formal", "informal"] },

  // Grade 4 English
  { id: "eng-g4-prefix-suffix", subject: "English", grade: "4", title: "Prefix and Suffix", description: "un-, re-, -ful, -less, -tion and more", difficulty: "intermediate", gameUrl: GAME_URLS.abcya, keywords: ["prefix", "suffix", "word building"] },
  { id: "eng-g4-homophones", subject: "English", grade: "4", title: "Homophones and Homonyms", description: "Words that sound alike but have different meanings", difficulty: "intermediate", gameUrl: GAME_URLS.abcya, keywords: ["homophones", "homonyms", "word meanings"] },
  { id: "eng-g4-speech-marks", subject: "English", grade: "4", title: "Speech Marks", description: "Direct and indirect speech, quotation marks", difficulty: "intermediate", gameUrl: GAME_URLS.brainpop, keywords: ["speech marks", "direct speech", "quotation"] },
  { id: "eng-g4-comprehension", subject: "English", grade: "4", title: "Advanced Comprehension", description: "Inference, deduction and author's purpose", difficulty: "intermediate", gameUrl: GAME_URLS.funbrain, keywords: ["comprehension", "inference", "reading"] },

  // Grade 5-12 English
  { id: "eng-g5-essay", subject: "English", grade: "5", title: "Essay Writing", description: "Introduction, body paragraphs and conclusion", difficulty: "intermediate", gameUrl: GAME_URLS.brainpop, keywords: ["essay writing", "paragraphs", "structure"] },
  { id: "eng-g5-proverbs", subject: "English", grade: "5", title: "Proverbs", description: "Common English proverbs and their meanings", difficulty: "intermediate", gameUrl: GAME_URLS.abcya, keywords: ["proverbs", "sayings", "idioms"] },
  { id: "eng-g6-tenses", subject: "English", grade: "6", title: "Tenses", description: "Past, present and future tenses including continuous and perfect", difficulty: "advanced", gameUrl: GAME_URLS.brainpop, keywords: ["tenses", "past", "present", "future"] },
  { id: "eng-g7-figures", subject: "English", grade: "7", title: "Figures of Speech", description: "Metaphor, simile, personification, alliteration", difficulty: "advanced", gameUrl: GAME_URLS.brainpop, keywords: ["figures of speech", "metaphor", "simile"] },
  { id: "eng-g8-comprehension", subject: "English", grade: "8", title: "Literary Comprehension", description: "Poetry analysis, prose and drama", difficulty: "advanced", gameUrl: GAME_URLS.funbrain, keywords: ["literature", "poetry", "analysis"] },
  { id: "eng-g9-grammar", subject: "English", grade: "9", title: "Advanced Grammar", description: "Clauses, phrases, complex sentence structures", difficulty: "advanced", gameUrl: GAME_URLS.brainpop, keywords: ["grammar", "clauses", "complex sentences"] },
  { id: "eng-g10-writing", subject: "English", grade: "10", title: "Creative and Descriptive Writing", description: "Narrative writing techniques, descriptive language", difficulty: "advanced", gameUrl: GAME_URLS.kahoot, keywords: ["creative writing", "descriptive writing"] },
  { id: "eng-g11-literature", subject: "English", grade: "11", title: "Literature Analysis", description: "Themes, characters and critical analysis of texts", difficulty: "advanced", gameUrl: GAME_URLS.brainpop, keywords: ["literature", "analysis", "themes"] },
  { id: "eng-g12-essay", subject: "English", grade: "12", title: "Advanced Essay and Report Writing", description: "Academic writing, research and argumentation", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["essay", "academic writing", "research"] },

  // ========== SCIENCE ==========
  // Grade 1-3 Science
  { id: "sci-g1-animals", subject: "Science", grade: "1", title: "Animals and Habitats", description: "Different animals and where they live", difficulty: "beginner", gameUrl: GAME_URLS.brainpop, keywords: ["animals", "habitats", "wildlife"] },
  { id: "sci-g1-plants", subject: "Science", grade: "1", title: "Life of Plants", description: "How plants grow, parts of a plant", difficulty: "beginner", gameUrl: GAME_URLS.brainpop, keywords: ["plants", "growth", "roots", "leaves"] },
  { id: "sci-g2-materials", subject: "Science", grade: "2", title: "Materials", description: "Natural and man-made materials, their properties", difficulty: "beginner", gameUrl: GAME_URLS.brainpop, keywords: ["materials", "natural", "man-made", "properties"] },
  { id: "sci-g2-senses", subject: "Science", grade: "2", title: "The Five Senses", description: "See, hear, touch, taste and smell", difficulty: "beginner", gameUrl: GAME_URLS.abcya, keywords: ["senses", "see", "hear", "touch", "taste"] },
  { id: "sci-g3-forces", subject: "Science", grade: "3", title: "Forces - Push and Pull", description: "Understanding push, pull and friction", difficulty: "beginner", gameUrl: GAME_URLS.brainpop, keywords: ["forces", "push", "pull", "friction"] },
  { id: "sci-g3-light", subject: "Science", grade: "3", title: "Light and Sources", description: "Natural and artificial sources of light, shadows", difficulty: "beginner", gameUrl: GAME_URLS.brainpop, keywords: ["light", "sources of light", "shadows"] },

  // Grade 4-6 Science
  { id: "sci-g4-human-body", subject: "Science", grade: "4", title: "Human Body", description: "Teeth, heart, muscles, bones and their functions", difficulty: "intermediate", gameUrl: GAME_URLS.brainpop, keywords: ["human body", "heart", "teeth", "muscles"] },
  { id: "sci-g4-electricity", subject: "Science", grade: "4", title: "Electricity", description: "Simple circuits, conductors and insulators, safety", difficulty: "intermediate", gameUrl: GAME_URLS.brainpop, keywords: ["electricity", "circuits", "conductors", "safety"] },
  { id: "sci-g4-weather", subject: "Science", grade: "4", title: "Weather and Seasons", description: "Types of weather, seasons and climate", difficulty: "intermediate", gameUrl: GAME_URLS.brainpop, keywords: ["weather", "seasons", "climate"] },
  { id: "sci-g5-environment", subject: "Science", grade: "5", title: "Environment and Pollution", description: "Types of pollution and how to protect the environment", difficulty: "intermediate", gameUrl: GAME_URLS.brainpop, keywords: ["environment", "pollution", "conservation"] },
  { id: "sci-g5-solids-liquids", subject: "Science", grade: "5", title: "States of Matter", description: "Solid, liquid and gas, changes of state", difficulty: "intermediate", gameUrl: GAME_URLS.brainpop, keywords: ["states of matter", "solid", "liquid", "gas"] },
  { id: "sci-g6-earth", subject: "Science", grade: "6", title: "Earth and Space", description: "Structure of Earth, solar system, day and night", difficulty: "advanced", gameUrl: GAME_URLS.brainpop, keywords: ["Earth", "space", "solar system", "planets"] },

  // Grade 7-12 Science
  { id: "sci-g7-chemistry", subject: "Science", grade: "7", title: "Chemical Reactions", description: "Types of reactions, acids and bases, indicators", difficulty: "advanced", gameUrl: GAME_URLS.brainpop, keywords: ["chemistry", "reactions", "acids", "bases"] },
  { id: "sci-g8-biology", subject: "Science", grade: "8", title: "Cells and Organisms", description: "Cell structure, mitosis, tissues and organs", difficulty: "advanced", gameUrl: GAME_URLS.brainpop, keywords: ["cells", "biology", "mitosis", "organisms"] },
  { id: "sci-g9-physics", subject: "Science", grade: "9", title: "Motion and Forces", description: "Newton's laws, speed, velocity, acceleration", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["motion", "forces", "Newton's laws", "velocity"] },
  { id: "sci-g10-genetics", subject: "Science", grade: "10", title: "Genetics and Heredity", description: "DNA, genes, chromosomes, inheritance", difficulty: "advanced", gameUrl: GAME_URLS.brainpop, keywords: ["genetics", "DNA", "heredity", "chromosomes"] },
  { id: "sci-g11-chemistry", subject: "Science", grade: "11", title: "Organic Chemistry", description: "Carbon compounds, hydrocarbons, reactions", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["organic chemistry", "hydrocarbons", "carbon"] },
  { id: "sci-g12-physics", subject: "Science", grade: "12", title: "Electromagnetism and Waves", description: "Electromagnetic waves, light, radioactivity", difficulty: "advanced", gameUrl: GAME_URLS.khanAcademy, keywords: ["electromagnetism", "waves", "radioactivity"] },

  // ========== HINDI ==========
  { id: "hindi-g1-akshar", subject: "Hindi", grade: "1", title: "Akshar - Swar aur Vyanjan", description: "Hindi vowels (Swar) and consonants (Vyanjan)", difficulty: "beginner", gameUrl: GAME_URLS.kahoot, keywords: ["akshar", "swar", "vyanjan", "hindi alphabet"] },
  { id: "hindi-g2-sangya", subject: "Hindi", grade: "2", title: "Sangya (Noun)", description: "Types of nouns in Hindi - vyakti, sthan, vastu", difficulty: "beginner", gameUrl: GAME_URLS.kahoot, keywords: ["sangya", "noun", "vyakti", "sthan"] },
  { id: "hindi-g3-sarvnam", subject: "Hindi", grade: "3", title: "Sarvnam (Pronoun)", description: "Pronouns in Hindi: main, aap, woh, hum", difficulty: "beginner", gameUrl: GAME_URLS.kahoot, keywords: ["sarvnam", "pronoun", "main", "aap"] },
  { id: "hindi-g3-kriya", subject: "Hindi", grade: "3", title: "Kriya (Verb)", description: "Action words in Hindi and their forms", difficulty: "intermediate", gameUrl: GAME_URLS.kahoot, keywords: ["kriya", "verb", "action words"] },
  { id: "hindi-g4-visheshan", subject: "Hindi", grade: "4", title: "Visheshan (Adjective)", description: "Describing words in Hindi", difficulty: "intermediate", gameUrl: GAME_URLS.kahoot, keywords: ["visheshan", "adjective", "describing words"] },
  { id: "hindi-g4-kaal", subject: "Hindi", grade: "4", title: "Kaal (Tense)", description: "Past, present and future tense in Hindi", difficulty: "intermediate", gameUrl: GAME_URLS.kahoot, keywords: ["kaal", "tense", "past", "present", "future"] },
  { id: "hindi-g5-anuched", subject: "Hindi", grade: "5", title: "Anuched Lekhan", description: "Paragraph writing in Hindi on various topics", difficulty: "intermediate", gameUrl: GAME_URLS.kahoot, keywords: ["anuched lekhan", "paragraph writing"] },
  { id: "hindi-g5-patra", subject: "Hindi", grade: "5", title: "Patra Lekhan", description: "Letter writing in Hindi - formal and informal", difficulty: "intermediate", gameUrl: GAME_URLS.kahoot, keywords: ["patra lekhan", "letter writing", "formal", "informal"] },
  { id: "hindi-g6-nibandh", subject: "Hindi", grade: "6", title: "Nibandh Lekhan", description: "Essay writing in Hindi on various topics", difficulty: "advanced", gameUrl: GAME_URLS.kahoot, keywords: ["nibandh lekhan", "essay writing"] },
  { id: "hindi-g7-grammar", subject: "Hindi", grade: "7", title: "Advanced Hindi Grammar", description: "Sandhi, Samas, Idioms in Hindi", difficulty: "advanced", gameUrl: GAME_URLS.kahoot, keywords: ["sandhi", "samas", "hindi grammar"] },
  { id: "hindi-g8-kavita", subject: "Hindi", grade: "8", title: "Kavita Lekhan", description: "Poetry writing and analysis in Hindi", difficulty: "advanced", gameUrl: GAME_URLS.kahoot, keywords: ["kavita", "poetry", "creative writing"] },
];

export const SUBJECTS = ["Math", "English", "Science", "Hindi", "Social Studies", "Computer Science"];
export const GRADES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
export const DIVISIONS = ["A", "B", "C", "D", "E", "F"];
export const BOARDS = ["IGCSE", "CBSE", "IB", "ICSE", "STATE"];

export const BOARD_LABELS: Record<string, string> = {
  IGCSE: "IGCSE (Cambridge Board)",
  CBSE: "CBSE",
  IB: "IB Board",
  ICSE: "ICSE",
  STATE: "State Board",
};

export const getTopicsForGrade = (grade: string, subject?: string): TopicItem[] => {
  return PRELOADED_TOPICS.filter(t =>
    t.grade === grade && (!subject || t.subject === subject)
  );
};

export const searchTopics = (query: string): TopicItem[] => {
  const q = query.toLowerCase();
  return PRELOADED_TOPICS.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.keywords.some(k => k.toLowerCase().includes(q)) ||
    t.subject.toLowerCase().includes(q)
  );
};
