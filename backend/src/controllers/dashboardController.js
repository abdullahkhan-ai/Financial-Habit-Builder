const Income = require("../models/Income");
const Expense = require("../models/Expense");
const Goal = require("../models/Goal");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch everything in parallel
    const [incomes, expenses, goals] = await Promise.all([
      Income.find({ user: userId })
        .select("amount source date")
        .sort({ date: 1 })
        .lean(),

      Expense.find({ user: userId })
        .select("amount title date")
        .sort({ date: 1 })
        .lean(),

      Goal.find({ user: userId })
        .select("targetAmount savedAmount")
        .lean(),
    ]);

    // ============================
    // Summary
    // ============================

    const totalIncome = incomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );

    const totalExpense = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const totalSavings = totalIncome - totalExpense;
    const netWorth = totalSavings;

    // ============================
    // Recent Transactions
    // ============================

    const recentTransactions = [
      ...incomes.map((income) => ({
        ...income,
        type: "Income",
        title: income.source,
      })),

      ...expenses.map((expense) => ({
        ...expense,
        type: "Expense",
        title: expense.title,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.date) - new Date(a.date)
      )
      .slice(0, 10);

    // ============================
    // Wealth Chart
    // ============================

    const monthlyData = {};

    incomes.forEach((income) => {
      const month = new Date(
        income.date
      ).toLocaleString("default", {
        month: "short",
      });

      if (!monthlyData[month]) {
        monthlyData[month] = {
          income: 0,
          expense: 0,
        };
      }

      monthlyData[month].income += income.amount;
    });

    expenses.forEach((expense) => {
      const month = new Date(
        expense.date
      ).toLocaleString("default", {
        month: "short",
      });

      if (!monthlyData[month]) {
        monthlyData[month] = {
          income: 0,
          expense: 0,
        };
      }

      monthlyData[month].expense += expense.amount;
    });

    let runningWealth = 0;

    const chartData = Object.entries(monthlyData).map(
      ([month, values]) => {
        runningWealth +=
          values.income - values.expense;

        return {
          month,
          wealth: runningWealth,
        };
      }
    );

    // ============================
    // Financial Health
    // ============================

    const savingRate =
      totalIncome > 0
        ? Math.round(
            (totalSavings / totalIncome) * 100
          )
        : 0;

    const expenseRate =
      totalIncome > 0
        ? Math.round(
            (totalExpense / totalIncome) * 100
          )
        : 0;

    let goalProgress = 0;
        if (goals.length > 0) {
      const totalProgress = goals.reduce(
        (sum, goal) => {
          const progress =
            goal.targetAmount > 0
              ? Math.min(
                  (goal.savedAmount / goal.targetAmount) * 100,
                  100
                )
              : 0;

          return sum + progress;
        },
        0
      );

      goalProgress = Math.round(
        totalProgress / goals.length
      );
    }

    // ============================
    // Overall Health Score
    // ============================

    const healthScore = Math.round(
      (
        savingRate +
        (100 - expenseRate) +
        goalProgress
      ) / 3
    );

    let healthStatus = "Needs Improvement";

    if (healthScore >= 80) {
      healthStatus = "Excellent";
    } else if (healthScore >= 60) {
      healthStatus = "Good";
    } else if (healthScore >= 40) {
      healthStatus = "Fair";
    }

    // ============================
    // Response
    // ============================

    return res.status(200).json({
      summary: {
        totalIncome,
        totalExpense,
        totalSavings,
        netWorth,
      },

      chartData,

      recentTransactions,

      financialHealth: {
        savingRate,
        expenseRate,
        goalProgress,
        healthScore,
        healthStatus,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      message: "Failed to load dashboard data.",
    });
  }
};

module.exports = {
  getDashboardData,
};