import moment from "moment";

// ✅ Validate email format
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ✅ Format numbers with commas
export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedIntegerPart}.${fractionalPart}`
    : formattedIntegerPart;
};

// ✅ Prepare Expense Bar Chart Data (category vs amount)
export const prepareExpenseBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("MMM D"), 
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};

// ✅ Prepare Income Bar Chart Data (month vs amount)
export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("MMM D"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};

// ✅ Prepare Expense Line Chart Data (month vs amount)
export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("MMM D"),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};
