let step = 1;
let monthly = true;
let chosenPlan = -1;
let plans = [
  {
    plan: "Arcade",
    priceMonthly: 9,
    priceYearly: 90,
    discount: "2 months free",
  },
  {
    plan: "Advanced",
    priceMonthly: 12,
    priceYearly: 120,
    discount: "2 months free",
  },
  {
    plan: "Pro",
    priceMonthly: 15,
    priceYearly: 150,
    discount: "2 months free",
  },
];
let addOns = [
  {
    addOn: "Online service",
    des: "Access to multiplayer games",
    priceMonthly: 1,
    priceYearly: 10,
    selected: false,
  },
  {
    addOn: "Larger storage",
    des: "Extra 1TB of cloud save",
    priceMonthly: 2,
    priceYearly: 20,
    selected: false,
  },
  {
    addOn: "Customizable Profile",
    des: "Custom theme on your profile",
    priceMonthly: 2,
    priceYearly: 20,
    selected: false,
  },
];

const main = document.querySelector(`main`);
const navButtons = main.querySelector(`.navigation-buttons`);
const nextStep = navButtons.querySelector(`.my-button`);
const goBack = navButtons.querySelector(`.go-back`);
const thanksSection = main.querySelector(`.thanks`);
const plansList = main.querySelectorAll(
  `.content-wrapper .select-plan .plans-container .plan-card`
);
const toggle = document.getElementById("toggle");
const checkboxes = main.querySelectorAll(
  `.add-ons .add-on-card .add-on-checkbox`
);
const addOnsCards = main.querySelectorAll(`.add-ons .add-on-card`);
function removeActiveStepsAndAssignNew(idx) {
  let stepList = main.querySelectorAll(`.steps .steps-list .step`);
  for (let i = 0; i < stepList.length; i++) {
    stepList[i].classList.remove("active");
  }
  stepList[idx - 1].classList.add("active");
}

function removeActiveSectionsAndAssignNew(idx) {
  let sectionList = main.querySelector(`.content-wrapper`).children;
  console.log(sectionList);
  for (let i = 0; i < 5; i++) {
    sectionList[i].style.display = "none";
  }
  sectionList[idx - 1].style.display = "flex";
}

function navigate(idx) {
  if (idx == 5) {
    removeActiveStepsAndAssignNew(4);

    removeActiveSectionsAndAssignNew(5);
  } else {
    removeActiveStepsAndAssignNew(idx);
    removeActiveSectionsAndAssignNew(idx);
  }
}

nextStep.addEventListener("click", () => {
  if (step == 2) {
    if (!validateSelectPlan()) {
      return;
    } else {
      handleStepThree();
    }
  } else if (step == 3) {
    console.log(addOns);
    handleStepFour();
  } else if (step == 1) {
    if (validatePersonalInfo() === false) {
      return;
    }
  }
  step++;

  goBack.style.display = "block";
  if (step == 5) {
    navButtons.style.display = "none";
  } else if (step == 4) {
    nextStep.style.background = "hsl(243, 100%, 62%)";
  }
  navigate(step);
});

goBack.addEventListener("click", () => {
  nextStep.style.background = "hsl(213, 96%, 18%)";
  if (step == 2) {
    goBack.style.display = "none";
  }
  step--;
  navigate(step);
});

//Select your plan
for (let i = 0; i < plansList.length; i++) {
  plansList[i].addEventListener("click", () => {
    for (let j = 0; j < plansList.length; j++) {
      plansList[j].classList.remove("selected");
    }
    plansList[i].classList.add("selected");
  });
}
toggle.addEventListener("click", () => {
  if (monthly) {
    monthly = false;
    document.getElementById("monthly").classList.remove("active");
    document.getElementById("yearly").classList.add("active");
    main
      .querySelectorAll(
        `.select-plan .plans-container .plan-card .plan-content .yearly-discount`
      )
      .forEach((e) => {
        e.style.display = "block";
      });
    const prices = main.querySelectorAll(
      `.select-plan .plans-container .plan-card .plan-content .plan-price`
    );
    for (let i = 0; i < prices.length; i++) {
      prices[i].textContent = `$${plans[i].priceYearly}/yr`;
    }
  } else {
    monthly = true;
    document.getElementById("yearly").classList.remove("active");
    document.getElementById("monthly").classList.add("active");
    main
      .querySelectorAll(
        `.select-plan .plans-container .plan-card .plan-content .yearly-discount`
      )
      .forEach((e) => {
        e.style.display = "none";
      });
    const prices = main.querySelectorAll(
      `.select-plan .plans-container .plan-card .plan-content .plan-price`
    );
    for (let i = 0; i < prices.length; i++) {
      prices[i].textContent = `$${plans[i].priceMonthly}/mo`;
    }
  }
});

function validateSelectPlan() {
  let valid = false;
  for (let i = 0; i < plansList.length; i++) {
    if (plansList[i].classList.contains("selected")) {
      valid = true;
      chosenPlan = i;
      break;
    }
  }
  if (!valid) {
    alert("Please Choose a plan");
  }
  return valid;
}

// pick add-ons

function handleStepThree() {
  let addOnsPriceList = main.querySelectorAll(
    `.add-ons .add-on-card .add-on-price`
  );
  if (!monthly) {
    for (let i = 0; i < addOnsPriceList.length; i++) {
      addOnsPriceList[i].textContent = `+$${addOns[i].priceYearly}/yr`;
    }
  } else {
    for (let i = 0; i < addOnsPriceList.length; i++) {
      addOnsPriceList[i].textContent = `+$${addOns[i].priceMonthly}/mo`;
    }
  }
}

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("click", () => {
    if (addOnsCards[i].classList.contains("active")) {
      addOnsCards[i].classList.remove("active");
      addOns[i].selected = false;
    } else {
      addOnsCards[i].classList.add("active");
      addOns[i].selected = true;
    }
  });
}

// finishing up

function handleStepFour() {
  let planName = plans[chosenPlan].plan;
  let duration = "";
  let planPrice = "";
  let total = 0;
  if (monthly) {
    duration = "Monthly";
    planPrice = `$${plans[chosenPlan].priceMonthly}/mo`;
    total += plans[chosenPlan].priceMonthly;
  } else {
    duration = "Yearly";
    planPrice = `$${plans[chosenPlan].priceYearly}/yr`;
    total += plans[chosenPlan].priceYearly;
  }

  const title = main.querySelector(`.selections .plan-selected h3`);
  title.textContent = `${planName} (${duration})`;
  const price = main.querySelector(`.selections .plan-selected #plan-price`);
  price.textContent = planPrice;
  const addOnsContainer = main.querySelector(
    `.finishing-up .selections .add-on-selected`
  );
  addOnsContainer.innerHTML = "";
  for (let i = 0; i < addOns.length; i++) {
    if (addOns[i].selected) {
      if (monthly) {
        total += addOns[i].priceMonthly;
        let el = makeAddedAddOnElement(
          addOns[i].addOn,
          addOns[i].priceMonthly,
          true
        );
        addOnsContainer.appendChild(el);
      } else {
        total += addOns[i].priceYearly;
        let el = makeAddedAddOnElement(
          addOns[i].addOn,
          addOns[i].priceYearly,
          false
        );
        addOnsContainer.appendChild(el);
      }
    }
  }
  const totalWord = main.querySelector(`.finishing-up .total p`);
  const totalPrice = main.querySelector(`.finishing-up .total span`);
  if (monthly) {
    totalWord.textContent = `Total (per month)`;
    totalPrice.textContent = `$${total}/mo`;
  } else {
    totalWord.textContent = `Total (per year)`;
    totalPrice.textContent = `$${total}/yr`;
  }
}

function makeAddedAddOnElement(name, price, monthly) {
  const addOnSelected = document.createElement("div");
  addOnSelected.classList.add("add-on-selec");
  const addOnPara = document.createElement("p");
  addOnPara.textContent = name;
  const addOnPrice = document.createElement("span");
  if (monthly) {
    addOnPrice.textContent = `+$${price}/mo`;
  } else {
    addOnPrice.textContent = `+$${price}/yr`;
  }
  addOnSelected.append(addOnPara);
  addOnSelected.append(addOnPrice);

  return addOnSelected;
}

const change = document
  .getElementById("change")
  .addEventListener("click", () => {
    step = 2;
    navigate(2);
  });

// personal info

let nameInput = document.getElementById("name");
nameInput.onchange = () => {
  document.getElementById("invalid-name").style.display = "none";
};
let emailInput = document.getElementById("email");
emailInput.onchange = () => {
  document.getElementById("invalid-email").style.display = "none";
};
let phoneInput = document.getElementById("phoneNumber");
phoneInput.onchange = () => {
  document.getElementById("invalid-phone").style.display = "none";
};
function validatePersonalInfo() {
  if (!nameInput.value) {
    document.getElementById("invalid-name").style.display = "block";
    return false;
  } else if (validEmail(emailInput.value) === false) {
    document.getElementById("invalid-email").style.display = "block";
    return false;
  } else if (!phoneInput.value) {
    document.getElementById("invalid-phone").style.display = "block";
    return false;
  }
  return true;
}

function validEmail(email) {
  const pattern = /\w+@\w+.(com|net)/gi;
  return pattern.test(email);
}
