// Rohan Swaby
// Interactive Form
  
const SHOW = 'show';
const HIDE = 'hide';
const OTHERJOBROLE = 'other-job-role';
const CREDITCARD = 'credit-card';
const PAYPAL = 'paypal';
const BITCOIN = 'bitcoin';
const NAME = 'name';
const NAMEHINT = 'name-hint';
const EMAILHINT = 'email-hint';
const ACTIVITIESHINT = 'activities-hint';
const CREDITCARDHINTS = {card:'cc-hint', zip:'zip-hint', cvv:'cvv-hint'};
const STATE = { activitiesCost : 0, paymentMethod : CREDITCARD, };

const focusOnElementById = id =>{
    console.log('focusing on element with id =', id);
    document.getElementById(id).focus();
};
const getElementById = id =>{
    return document.getElementById(id);
}
const hideOrShowElementById = (id,action) =>{
    const element = document.getElementById(id);

    if (action === SHOW){
        console.log('showing element with id :',id);
        element.style.display = "block";
    } else if(action === HIDE) {
        console.log('hiding element with id :',id);
        element.style.display = "none";
    }
};
// +++++++++++++++++++++++++++++++++++ validators +++++++++++++++++++++++++++++++++++++++++++++
const nameValidator = () => {
    console.log('++++++++++++ Name Validator ++++++++++++');
    const name =  getElementById(NAME);
    isValid = name.value.trim().length > 0 || false;
    isValid ? hideOrShowElementById(NAMEHINT,HIDE) : hideOrShowElementById(NAMEHINT, SHOW);
    console.log('isNameValid : ',isValid)
    return isValid;
}
const emailValidator = () => {
    const emailValue = String(getElementById('email').value);
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    emailIsValid ?  hideOrShowElementById(EMAILHINT,HIDE) : hideOrShowElementById(EMAILHINT,SHOW);
    return emailIsValid;
}

const activitiesValidator = () =>{
    const isValid = STATE.activitiesCost > 0 || false;
    isValid ? hideOrShowElementById(ACTIVITIESHINT, HIDE) : hideOrShowElementById(ACTIVITIESHINT, SHOW);
    return isValid;
}

const creditCardValidator = () => {
    const cardNumber = getElementById('cc-num').value;
    const year = + getElementById('exp-year').value;
    const cvv = getElementById('cvv').value;
    const zip = getElementById('zip').value;

    const visaCardRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const amex = /^3[47][0-9]{13}$/; 
    const masterCardRegx =  /^5[1-5][0-9]{14}$/; 
    const zipRegex = /^\d{5}$/;
    const cvvRegex = /^\d{3}$/;

    const isCardNumberValid = visaCardRegex.test(cardNumber) || masterCardRegx.test(cardNumber) || amex.test(cardNumber);
    const isYearValid = isNaN(year);
    const isValidZipCode = zipRegex.test(zip);
    const isCvv = cvvRegex.test(cvv);

    isCardNumberValid ? hideOrShowElementById(CREDITCARDHINTS.card,HIDE) : hideOrShowElementById(CREDITCARDHINTS.card,SHOW);
    isValidZipCode ? hideOrShowElementById(CREDITCARDHINTS.zip,HIDE) : hideOrShowElementById(CREDITCARDHINTS.zip,SHOW);
    isCvv ? hideOrShowElementById(CREDITCARDHINTS.cvv,HIDE) : hideOrShowElementById(CREDITCARDHINTS.cvv,SHOW);

    return isCardNumberValid && isValidZipCode && isCvv;
}

const showPaymentMethodfor = () => {
    if(STATE.paymentMethod === PAYPAL){
        hideOrShowElementById(PAYPAL,SHOW);
        hideOrShowElementById(CREDITCARD,HIDE);
        hideOrShowElementById(BITCOIN,HIDE);
    } else if (STATE.paymentMethod === CREDITCARD){
        hideOrShowElementById(PAYPAL,HIDE);
        hideOrShowElementById(CREDITCARD,SHOW);
        hideOrShowElementById(BITCOIN,HIDE);
    } else if (STATE.paymentMethod === BITCOIN){
        hideOrShowElementById(PAYPAL,HIDE);
        hideOrShowElementById(CREDITCARD,HIDE);
        hideOrShowElementById(BITCOIN,SHOW);
    }
}

// defaults 
focusOnElementById(NAME);
hideOrShowElementById(OTHERJOBROLE,HIDE);
getElementById('payment').value = CREDITCARD;
showPaymentMethodfor();

// Title section control
const jobSection = getElementById('title');
const shirtDesigns = getElementById('shirt-designs');
const designOptions = getElementById('color');
const activities = getElementById('activities');
const displayTotal = getElementById('activities-cost');
const payment = getElementById('payment');
const form = document.querySelector("form");

jobSection.addEventListener('change',(e) => {
    console.log('++++++++++++ Job Section ++++++++++++')
    let currentSelection = e.target.value;
    console.log('current user selection : ', currentSelection);
    if (currentSelection === 'other'){
        hideOrShowElementById(OTHERJOBROLE,SHOW);
    }else{
        hideOrShowElementById(OTHERJOBROLE,HIDE);
    }
});

shirtDesigns.addEventListener('change',(e) => {
    console.log('++++++++++++ shirt-designs ++++++++++++');
    let currentSelection = e.target.value;
    for (let option of designOptions){
        if(option.dataset.theme === currentSelection){
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    }
});

activities.addEventListener('change',(e) => {
    console.log('++++++++++++ activites ++++++++++++');
    const checkBox = e.target;
    const isChecked = checkBox.checked;
    console.log('activity: ', checkBox.name);
    // get current cost of activity 
    const cost = +checkBox.getAttribute('data-cost');
    displayTotal.innerHTML='';
    isChecked ? STATE.activitiesCost += cost : STATE.activitiesCost -= cost;
    displayTotal.innerHTML = `Total: $${STATE.activitiesCost}`;    
});

payment.addEventListener('change',(e) => {
    console.log('++++++++++++ payment ++++++++++++');
    STATE.paymentMethod = e.target.value;
    showPaymentMethodfor();
});

form.addEventListener('submit', (e) => {
    console.log('++++++++++++ final Form ++++++++++++');
    
    let paymentValidation = true;

    if (STATE.paymentMethod === CREDITCARD){
        paymentValidation = creditCardValidator();
    }

    const isValidEmail = emailValidator();
    const isValidName = nameValidator();
    const isValidActivities = activitiesValidator();

    if(isValidName && isValidEmail && isValidActivities && paymentValidation){
        console.log('form is complete!');
    } else {
        e.preventDefault();
        console.log('form is incomplete!');
    }
  });
