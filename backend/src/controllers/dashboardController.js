const Income = require("../models/Income");
const Expense = require("../models/Expense");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch user data
    const incomes = await Income.find({ user: userId }).sort({ date: 1 });
    const expenses = await Expense.find({ user: userId }).sort({ date: 1 });

    // Summary
    const totalIncome = incomes.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const totalExpense = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const totalSavings = totalIncome - totalExpense;

    const netWorth = totalSavings;

    // Recent Transactions
    const recentTransactions = [
      ...incomes.map((item) => ({
        ...item.toObject(),
        type: "Income",
        title: item.source,
      })),

      ...expenses.map((item) => ({
        ...item.toObject(),
        type: "Expense",
        title: item.title,
      })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    // Wealth Chart (Monthly)
    const monthlyData = {};

    incomes.forEach((income) => {
      const month = new Date(income.date).toLocaleString("default", {
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
      const month = new Date(expense.date).toLocaleString("default", {
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

    const chartData = Object.keys(monthlyData).map((month) => {
      runningWealth +=
        monthlyData[month].income -
        monthlyData[month].expense;

      return {
        month,
        wealth: runningWealth,
      };
    });

    // Financial Health

    const savingRate =
      totalIncome > 0
        ? Math.round((totalSavings / totalIncome) * 100)
        : 0;

    const expenseRate =
      totalIncome > 0
        ? Math.round((totalExpense / totalIncome) * 100)
        : 0;

    const investmentRate = 0;

    res.status(200).json({
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
        investmentRate,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load dashboard data.",
    });
  }
};

module.exports = {
  getDashboardData,
};