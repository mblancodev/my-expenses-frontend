export const formatAmount = (amount: number) => {
  const locale = "co-CO";
  const currency = new Intl.NumberFormat(locale, {
    currencySign: "standard",
    minimumFractionDigits: 0,
    style: "currency",
    currency: "USD",
  });

  return currency.format(amount);
};
