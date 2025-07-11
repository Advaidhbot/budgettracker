import React, { useEffect, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { useUserAuth } from "../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utilis/apiPaths";
import axiosInstance from "../utilis/axiosInstance";
import InfoCard from "../CARDS/InfoCard";
import { addThousandsSeparator } from "../utilis/helper";
import { LuHandCoins, LuPiggyBank, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import RecentTransactions from "../Dashboard2/RecentTransactions";
import FinanceOverview from "../Dashboard2/FinanceOverview";
import ExpenseTransactions from "../Dashboard2/ExpenseTransactions";
import Last30DaysExpenses from "../Dashboard2/Last30DaysExpenses";
import RecentIncomeWithChart from "../Dashboard2/RecentIncomeWithChart";
import RecentIncome from "../Dashboard2/RecentIncome";
import LastMonthSavingsChart from "../Dashboard2/LastMonthSavingsChart";
import MonthlyComparisonChart from "../Dashboard2/MonthlyComparisonChart"
import "./Design/Home.css";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExpenseAlert, setShowExpenseAlert] = useState(false);

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDashboardData(response.data);
    } catch (error) {
      console.log("Something went wrong. Please try again later.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line
  }, []);

  // Expense limit check
  useEffect(() => {
    if (dashboardData) {
      const { totalIncome, totalExpense } = dashboardData;
      const limit = totalIncome * 0.8;

      if (totalExpense > limit) {
        alert("⚠️ Warning: Your expenses have exceeded 80% of your income!");
        setShowExpenseAlert(true);
      }
    }
  }, [dashboardData]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="dashboard-container">
        <h2 className="dashboard-header">Dashboard Overview</h2>

        {loading ? (
          <div className="dashboard-loader">Loading...</div>
        ) : dashboardData ? (
          <>
            <div className="dashboard-info-cards">
              <InfoCard
                icon={<IoMdCard />}
                label="Total Balance"
                value={addThousandsSeparator(dashboardData.totalBalance)}
                color="bg-blue"
                iconColor="#2563eb"
              />

              <InfoCard
                icon={<LuWalletMinimal />}
                label="Total Income"
                value={addThousandsSeparator(dashboardData.totalIncome)}
                color="bg-green"
                iconColor="#1f7a4b"
              />

              <InfoCard
                icon={<LuHandCoins />}
                label="Total Expense"
                value={addThousandsSeparator(dashboardData.totalExpense)}
                color="bg-red"
                iconColor="#b91c1c"
              />

              <InfoCard
                icon={<LuPiggyBank />}
                label="Total Savings"
                value={addThousandsSeparator(dashboardData.totalSavings)}
                color="bg-yellow"
                iconColor="#d97706"
              />
            </div>

            {/* 🚨 Expense Limit Alert Message */}
            {showExpenseAlert && (
              <div className="alert-expense-limit">
                ⚠️ Your expenses have exceeded 80% of your income! Consider
                reducing unnecessary spending.
              </div>
            )}

            <div className="dashboard-section">
              <RecentTransactions
                transactions={dashboardData?.recentTransactions}
                onSeeMore={() => navigate("/expense")}
              />
            </div>

            <div className="dashboard-two-columns">
              <FinanceOverview
                totalIncome={dashboardData?.totalIncome || 0}
                totalExpense={dashboardData?.totalExpense || 0}
                totalBalance={dashboardData?.totalBalance || 0}
              />

              <ExpenseTransactions
                transactions={dashboardData?.last30Expenses?.transactions || []}
                onSeeMore={() => navigate("/expense")}
              />
            </div>

            <div className="dashboard-section">
              <Last30DaysExpenses
                data={dashboardData?.last30Expenses?.transactions || []}
              />
            </div>

            <div className="dashboard-section">
              <LastMonthSavingsChart data={dashboardData?.lastMonthSavings} />
            </div>

            {dashboardData?.monthlyComparison && (
              <div className="dashboard-section">
                <MonthlyComparisonChart
                  data={dashboardData.monthlyComparison}
                />
              </div>
            )}

            <div className="dashboard-two-columns">
              <RecentIncomeWithChart
                data={
                  dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) ||
                  []
                }
                totalIncome={dashboardData?.totalIncome || 0}
              />
              <RecentIncome
                transactions={
                  dashboardData?.last60DaysIncome?.transactions || []
                }
                onSeeMore={() => navigate("/income")}
              />
            </div>
          </>
        ) : (
          <div className="dashboard-error">No dashboard data available.</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;
