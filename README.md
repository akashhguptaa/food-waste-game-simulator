# 🎮 SDG Food Waste Game Simulation

An interactive game that teaches players about mindful food consumption and waste reduction through engaging scenarios.

## 🚀 Project Overview

This is a game simulation designed to raise awareness about food waste through the United Nations Sustainable Development Goals framework. Players navigate through various real-life scenarios and make decisions about food consumption to minimize waste.

## 📋 Todo

-   [ ] 📊 Evaluation of coming up with the right numbers - Vardhaman
-   [ ] 🍽️ Coming up with the right food considering mess and plaksha - Kunal
-   [ ] 🎨 Design implementation - Akash 

## 🎯 Game Scenarios

### 🏃‍♂️ Scenario 1: The Marathon Dinner

**Setting:** You just ran 10 km for a charity marathon and you're starving.  
**Challenge:** The dinner buffet looks amazing — rice, curry, salad, dessert, and juice. How much should you actually take?

**🍽️ Food Options:** Rice, Curry, Salad, Juice, Dessert  
**🧠 Logic:** The player needs a moderate portion of carbs and protein, but not too much dessert or juice.

---

### 📚 Scenario 2: The Study Marathon

**Setting:** You've been studying for 6 hours straight for tomorrow's test.  
**Challenge:** Your mom just brought snacks — chips, sandwich, smoothie, and fruits. Choose wisely, because your brain's tired, but your body isn't.

**🍽️ Food Options:** Sandwich, Smoothie, Chips, Fruits  
**🧠 Logic:** The player should choose balanced snack portions; too many chips count as waste or poor nutrition.

---

### 🎬 Scenario 3: The Movie Night Feast

**Setting:** It's Friday night and your friends are over for a movie marathon.  
**Challenge:** Everyone ordered pizza, popcorn, and soda — but not everyone eats the same. Decide how much you'll take without wasting food.

**🍽️ Food Options:** Pizza, Popcorn, Soda  
**🧠 Logic:** It's a social event; temptation is high, but the real need is lower than expected.

---

### 🏔️ Scenario 4: The Mountain Adventure

**Setting:** You've been hiking up a hill since morning and finally reach a campfire site.  
**Challenge:** Dinner time! You have soup, bread, and roasted vegetables to pick from. Don't waste — remember you carried this food up the mountain.

**🍽️ Food Options:** Soup, Bread, Roasted Vegetables  
**🧠 Logic:** The player needs energy but resources are limited, so realistic consumption is key.

---

### 🎂 Scenario 5: The Birthday Bash

**Setting:** It's your birthday and you're at your favorite restaurant with cake, pasta, and ice cream.  
**Challenge:** Excitement can lead to over-ordering — make your plate wisely.

**🍽️ Food Options:** Pasta, Cake, Ice Cream, Juice  
**🧠 Logic:** Celebration scenario; moderate portions prevent waste and overindulgence.

---

### 🛋️ Scenario 6: The Lazy Sunday

**Setting:** It's a lazy Sunday afternoon. You've done absolutely nothing all day.  
**Challenge:** You're about to order lunch — burger, fries, and milkshake. Do you really need all that, or just something light?

**🍽️ Food Options:** Burger, Fries, Milkshake  
**🧠 Logic:** Low activity means low energy requirement, so smaller portions are ideal.

---

## 🛠️ Tech Stack

-   **Frontend Framework:** Next.js with TypeScript
-   **Animation Library:** Framer Motion
-   **Styling:** Tailwind CSS
-   **Development:** Node.js

---

## � Scoring System & Game Mechanics

### 1️⃣ **Scientific Calorie Calculation System**

#### **BMR Calculation** (Mifflin-St Jeor Equation)

The game calculates your Basal Metabolic Rate - the calories your body burns at rest:

**For Men:**
```
BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
```

**For Women:**
```
BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
```

#### **TDEE Calculation** (Total Daily Energy Expenditure)

Your BMR is multiplied by an activity factor based on each scenario:

| Scenario | Activity Level | Factor |
|----------|---------------|--------|
| 🏃‍♂️ Scenario 1: Marathon Dinner | Moderately Active | **1.55x** |
| 📚 Scenario 2: Study Marathon | Sedentary | **1.3x** |
| 🎬 Scenario 3: Movie Night | Lightly Active | **1.375x** |
| 🏔️ Scenario 4: Mountain Adventure | Very Active | **1.725x** |
| 🎂 Scenario 5: Birthday Bash | Lightly Active | **1.375x** |
| 🛋️ Scenario 6: Lazy Sunday | Sedentary | **1.2x** |

---

### 2️⃣ **Food Calorie Database**

Every food item has scientifically accurate calorie values per unit:

| Food Item | Calories Per Unit |
|-----------|------------------|
| 🍚 Rice | 200 cal/bowl |
| � Curry | 180 cal/bowl |
| 🥗 Salad | 50 cal/bowl |
| 🍫 Brownie | 150 cal/piece |
| 🧃 Juice | 120 cal/glass |
| 🥪 Sandwich | 250 cal/piece |
| 🍕 Pizza | 280 cal/slice |
| 🍔 Burger | 550 cal/piece |
| 🍨 Ice Cream | 150 cal/scoop |
| 🎂 Cake | 350 cal/slice |
| ...and more! | |

---

### 3️⃣ **Interactive Portion Size Guide** (ℹ️ Icon)

Click the info icon next to any food to see:

-   **📏 Portion Size:** (e.g., "1 bowl ≈ 200ml / 200g")
-   **📝 Description:** ("A standard medium-sized bowl like a rice or cereal bowl")
-   **🔥 Calories:** Displayed dynamically as you adjust portions

**Standard Portion References:**
-   🥣 **Bowl:** ~200ml / 200g
-   🥤 **Glass:** ~250ml (8 oz)
-   🍕 **Slice:** ~100g
-   🍨 **Scoop:** ~75g
-   🍽️ **Serving:** ~100-150g

---

### 4️⃣ **Score Calculation & Feedback**

Your score is calculated by comparing your total calories to the optimal amount:

**Scoring System:**
```
Score = 100 - (|User Calories - Optimal Calories| / Optimal Calories × 100)
```

**Feedback Tiers:**

| Score Range | Title | Emoji | Message |
|-------------|-------|-------|---------|
| **95-100%** | PERFECT PORTION! | 🏆 | You nailed it! Your portion size is spot-on. |
| **85-94%** | EXCELLENT CHOICE! | ⭐ | Great job! Your portions are well-balanced. |
| **70-84%** | GOOD EFFORT! | 👍 | You're close! Minor adjustments needed. |
| **50-69%** | ROOM FOR IMPROVEMENT | 🤔 | Consider portion sizes more carefully. |
| **0-49%** | NEEDS WORK | 😰 | Significant adjustment needed. |

---

### 5️⃣ **Individual Score Page** (`/score/[id]`)

After each scenario, you'll see:

-   ✨ **Score & Emoji Feedback** - Your performance rating
-   🔥 **Your Metabolism Panel:**
    -   BMR (Basal Metabolic Rate)
    -   Activity Factor for this scenario
    -   TDEE (Total Daily Energy Expenditure)
-   🍽️ **Your Choices Panel:**
    -   Total calories you selected
    -   Optimal calories needed
    -   Difference (+ or -)
-   📊 **Food-by-Food Breakdown:**
    -   ✅ Perfect portion
    -   ⚠️ Close, but not optimal
    -   ❌ Needs improvement
-   📈 **Overall Progress** - Your average across all completed scenarios
-   💡 **Real-time Calorie Display** - See calories update as you adjust sliders

---

### 6️⃣ **Final Results Page** (`/final-results`)

After completing all 6 scenarios, view your complete performance:

#### **🏆 Rank Titles:**

| Overall Score | Rank | Emoji |
|---------------|------|-------|
| **90%+** | Portion Master | 👑 |
| **80-89%** | Nutrition Expert | ⭐ |
| **70-79%** | Portion Pro | 🎯 |
| **60-69%** | Learning Fast | 📈 |
| **<60%** | Portion Apprentice | 🌱 |

#### **Player Statistics:**
-   🔥 **Your BMR** - Baseline calories burned daily
-   🍽️ **Total Calories Chosen** - Sum across all scenarios
-   ✅ **Optimal Calories** - What you should have chosen

#### **📊 Complete Scenario Breakdown**
See your score for each scenario with visual indicators

#### **💡 Educational Lessons**
-   🔬 **BMR Matters** - Understanding your baseline metabolism
-   🏃 **Activity Adjusts Needs** - Different activities need different energy
-   ⚖️ **Balance is Key** - Not too much, not too little
-   ♻️ **Reduce Food Waste** - Taking the right amount helps the planet

#### **Action Buttons:**
-   🔄 **Play Again** - Reset and try to improve your score
-   🏠 **Back to Home** - Return to the main menu

---

## 🎮 Navigation Flow

```
Initial Form (/)
    ↓ Enter name, age, weight, height, gender
Scenario Intro (/scenerio)
    ↓ View player profile
Scenario 1 Game (/scenerio/1)
    ↓ Select food portions
Scenario 1 Score (/score/1)
    ↓ View results & feedback
Scenario 2 Game (/scenerio/2)
    ↓ Continue through all scenarios...
    ⋮
Final Results (/final-results)
    ↓ View overall performance
Play Again or Home
```

---

## 🤝 Contributing

Feel free to contribute to this project by:

-   Adding new scenarios
-   Improving game mechanics
-   Enhancing UI/UX design
-   Optimizing performance
-   Updating calorie databases
-   Adding more educational content

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).