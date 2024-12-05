let bonuses = {
  mortgageLoan: 0,
  consumerLoan: 0,
  creditCard: 0,
  overdraft: 0,
  myFibank: 0,
};

function updateBonuses() {
  Object.keys(bonuses).forEach((type) => {
    bonuses[type] = Math.min(bonuses[type] + 1, 100);
    document.getElementById(type).textContent = `${type.replace(
      /([A-Z])/g,
      " $1"
    )}: ${bonuses[type]}%`;
    document.getElementById(
      `${type}-progress`
    ).style.width = `${bonuses[type]}%`;
  });

  setTimeout(updateBonuses, 1000);
}

updateBonuses();
