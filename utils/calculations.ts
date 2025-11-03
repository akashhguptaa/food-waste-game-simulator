// BMR and TDEE Calculation Utilities

export interface PlayerData {
  name: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
}

/**
 * Calculate Basal Metabolic Rate using Mifflin-St Jeor Equation
 * For Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
 * For Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
 */
export function calculateBMR(playerData: PlayerData): number {
  const weight = parseFloat(playerData.weight);
  const height = parseFloat(playerData.height);
  const age = parseFloat(playerData.age);
  const gender = playerData.gender.toLowerCase();

  const baseBMR = 10 * weight + 6.25 * height - 5 * age;

  if (gender === "male") {
    return baseBMR + 5;
  } else if (gender === "female") {
    return baseBMR - 161;
  } else {
    // For "other" or any other gender, use average of male and female
    return baseBMR - 78; // Average of +5 and -161
  }
}

/**
 * Activity factors for each scenario based on the activity level
 */
export const ACTIVITY_FACTORS: { [key: number]: number } = {
  1: 1.55, // Marathon Dinner - Moderately Active (just ran 10km)
  2: 1.3, // Study Marathon - Sedentary (mental, not physical)
  3: 1.375, // Movie Night - Lightly Active
  4: 1.725, // Mountain Adventure - Very Active (hiking all day)
  5: 1.375, // Birthday Bash - Lightly Active
  6: 1.2, // Lazy Sunday - Sedentary
};

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 * TDEE = BMR × Activity Factor
 */
export function calculateTDEE(
  playerData: PlayerData,
  scenarioId: number
): number {
  const bmr = calculateBMR(playerData);
  const activityFactor = ACTIVITY_FACTORS[scenarioId] || 1.2;
  return bmr * activityFactor;
}

/**
 * Calculate total calories from food selections
 */
export function calculateTotalCalories(
  selections: { [key: string]: number },
  foods: Array<{ name: string; caloriesPerUnit: number }>
): number {
  let total = 0;
  for (const food of foods) {
    const quantity = selections[food.name] || 0;
    total += quantity * food.caloriesPerUnit;
  }
  return total;
}

/**
 * Calculate optimal calories from optimal portions
 */
export function calculateOptimalCalories(
  foods: Array<{ optimal: number; caloriesPerUnit: number }>
): number {
  return foods.reduce(
    (total, food) => total + food.optimal * food.caloriesPerUnit,
    0
  );
}

/**
 * Calculate score based on how close user's selection is to optimal
 * Returns a score out of 100
 */
export function calculateScore(
  userCalories: number,
  optimalCalories: number
): number {
  if (optimalCalories === 0) return 0;

  const difference = Math.abs(userCalories - optimalCalories);
  const percentageOff = (difference / optimalCalories) * 100;

  // Perfect match = 100 points
  // Within 10% = 90-100 points
  // Within 20% = 80-90 points
  // Within 30% = 70-80 points
  // etc.
  const score = Math.max(0, 100 - percentageOff);

  return Math.round(score);
}

/**
 * Get feedback message based on score
 */
export function getScoreFeedback(
  score: number,
  userCalories: number,
  optimalCalories: number
): {
  title: string;
  message: string;
  emoji: string;
  color: string;
} {
  const difference = userCalories - optimalCalories;
  const isOver = difference > 0;
  const percentageOff = Math.abs((difference / optimalCalories) * 100);

  if (score >= 95) {
    return {
      title: "PERFECT PORTION!",
      message:
        "🎯 You nailed it! Your portion size is spot-on for your body and activity level.",
      emoji: "🏆",
      color: "text-green-400",
    };
  } else if (score >= 85) {
    return {
      title: "EXCELLENT CHOICE!",
      message:
        "✨ Great job! Your portions are well-balanced and very close to optimal.",
      emoji: "⭐",
      color: "text-green-300",
    };
  } else if (score >= 70) {
    return {
      title: "GOOD EFFORT!",
      message: isOver
        ? "📊 You took a bit more than needed, but nothing too extreme. Consider smaller portions next time!"
        : "📊 You took a bit less than ideal. Don't be afraid to fuel your body properly!",
      emoji: "👍",
      color: "text-yellow-400",
    };
  } else if (score >= 50) {
    return {
      title: "ROOM FOR IMPROVEMENT",
      message: isOver
        ? `⚠️ You took ${Math.round(
            percentageOff
          )}% more calories than needed. This can lead to food waste and overconsumption.`
        : `⚠️ You took ${Math.round(
            percentageOff
          )}% fewer calories than needed. Make sure you're eating enough!`,
      emoji: "🤔",
      color: "text-orange-400",
    };
  } else {
    return {
      title: "NEEDS WORK",
      message: isOver
        ? `❌ Whoa! That's ${Math.round(
            percentageOff
          )}% more than optimal. This wastes food and isn't healthy for you.`
        : `❌ That's ${Math.round(
            percentageOff
          )}% less than you need! Your body needs proper fuel to function.`,
      emoji: "😰",
      color: "text-red-400",
    };
  }
}

/**
 * Portion size reference guide
 */
export const PORTION_SIZES: {
  [key: string]: { size: string; weight: string; description: string };
} = {
  bowls: {
    size: "1 bowl",
    weight: "~200ml / 200g",
    description: "A standard medium-sized bowl (like a rice or cereal bowl)",
  },
  glasses: {
    size: "1 glass",
    weight: "~250ml",
    description: "A standard drinking glass (8 oz)",
  },
  pieces: {
    size: "1 piece",
    weight: "~50-100g",
    description: "One standard serving piece (varies by food)",
  },
  slices: {
    size: "1 slice",
    weight: "~100g",
    description: "One medium slice (e.g., pizza, cake, bread)",
  },
  scoops: {
    size: "1 scoop",
    weight: "~75g",
    description: "One standard ice cream scoop",
  },
  servings: {
    size: "1 serving",
    weight: "~100-150g",
    description: "One standard serving portion",
  },
};
