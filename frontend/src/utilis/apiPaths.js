export const API_BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  DASHBOARD: {
    GET_DATA: "/api/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/income/add",
    GET_All_INCOME: "/api/income/get",
    DELETE_INCOME: (incomeId) => `/api/income/${incomeId}`,
    DOWNLOAD_INCOME: `/api/income/downloadIncomeExcel`,
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/expense/add",
    GET_ALL_EXPENSE: "/api/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: `/api/expense/downloadExpenseExcel`,
  },
  AUTH: {
    LOGIN: "/api/users/loginUser",
    REGISTER: "/api/users/registerUser",
    GET_USER: "/api/users/me",
    SEND_OTP: "/api/users/send-otp",                
    VERIFY_OTP_RESET: "/api/users/verify-otp-reset" 
  },
  REPORT: {
    DOWNLOAD_MONTHLY_COMPARISON: "/api/report/monthly-comparison",
  },
};
