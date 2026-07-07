const Income = require("../models/Income");
const Expense = require("../models/Expense");

const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const incomes = await Income.find({ user: userId });
    const expenses = await Expense.find({ user: userId });

    // ----------------------------
    // Summary
    // ----------------------------

    const totalIncome = incomes.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const totalExpense = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const totalSavings = totalIncome - totalExpense;

    const savingRate =
      totalIncome > 0
        ? Math.round((totalSavings / totalIncome) * 100)
        : 0;

    // ----------------------------
    // Highest Income
    // ----------------------------

    const highestIncome =
      incomes.length > 0
        ? incomes.reduce((max, item) =>
            item.amount > max.amount ? item : max
          )
        : null;

    // ----------------------------
    // Highest Expense
    // ----------------------------

    const highestExpense =
      expenses.length > 0
        ? expenses.reduce((max, item) =>
            item.amount > max.amount ? item : max
          )
        : null;

    // ----------------------------
    // Category Breakdown
    // ----------------------------

    const categoryMap = {};

    expenses.forEach((expense) => {
      categoryMap[expense.category] =
        (categoryMap[expense.category] || 0) + expense.amount;
    });

    const categoryBreakdown = Object.entries(categoryMap).map(
      ([category, amount]) => ({
        category,
        amount,
      })
    );

    // ----------------------------
    // Monthly Data
    // ----------------------------

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyMap = {};

    incomes.forEach((income) => {
      const month = monthNames[new Date(income.date).getMonth()];

      if (!monthlyMap[month]) {
        monthlyMap[month] = {
          income: 0,
          expense: 0,
        };
      }

      monthlyMap[month].income += income.amount;
    });

    expenses.forEach((expense) => {
      const month = monthNames[new Date(expense.date).getMonth()];

      if (!monthlyMap[month]) {
        monthlyMap[month] = {
          income: 0,
          expense: 0,
        };
      }

      monthlyMap[month].expense += expense.amount;
    });

    const monthlyData = monthNames
      .filter((month) => monthlyMap[month])
      .map((month) => ({
        month,
        income: monthlyMap[month].income,
        expense: monthlyMap[month].expense,
      }));

    // ----------------------------
    // Response
    // ----------------------------

    res.status(200).json({
      summary: {
        totalIncome,
        totalExpense,
        totalSavings,
        savingRate,
      },
      highestIncome,
      highestExpense,
      categoryBreakdown,
      monthlyData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load analytics.",
    });
  }
};

module.exports = {
  getAnalytics,
};