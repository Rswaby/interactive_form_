// Rohan Swaby
// Interactive Form

// define constants that maybe reused alot
const SHOW = 'show';
const HIDE = 'hide';
const OTHERJOBROLE = 'other-job-role';
const CREDITCARD = 'credit-card';
const COLORS = 'shirt-colors';
const PAYPAL = 'paypal';
const BITCOIN = 'bitcoin';
const NAME = 'name';
const NAMEHINT = 'name-hint';
const EMAILHINT = 'email-hint';
const ACTIVITIESHINT = 'activities-hint';
const CREDITCARDHINTS = {card:'cc-hint', zip:'zip-hint', cvv:'cvv-hint'};
const STATE = { 
    activitiesCost : 0, 
    paymentMethod : CREDITCARD,
};

// helper functions 
const focusOnElementById = id => {
    console.log('focusing on element with id =', id);
    document.getElementById(id).focus();
};
const getAllSubElements = (elementId, tag) => {
    return document.getElementById(elementId).getElementsByTagName(tag);
}
const getElementById = id =>{
    return document.getElementById(id);
}
const hideOrShowElementById = (id,action) => {
    const element = document.getElementById(id);

    if (action === SHOW){
        console.log('showing element with id :',id);
        element.style.display = "block";
    } else if(action === HIDE) {
        console.log('hiding element with id :',id);
        element.style.display = "none";
    }
};

// used to add and remove the 'not-valid' class Name from elements used to display warnings to the user. 
// it is called in all the validator functions with id of element to hide or show with a action flag. 
const hideOrShowObviousErrors = (id,action) => {
    const parentElement = getElementById(id).parentElement;
    if (action === SHOW){
        console.log("Showing obv error: ", id)
        parentElement.classList.add('not-valid');
    } else if(action === HIDE) {
        parentElement.classList.remove('not-valid');
        console.log("Hiding obv error: ", id)
    }
}

// depending on the currently selected payment method
// hide all other payment methods
// this is called when there is a change in the payment section of the form
// STATE.paymentMethod = e.target.value  
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
// called using eventlistener on activites when there is a 'change' 
// passing in clickedCheckbox as e.target;
const determindConflict = (clickedCheckbox) => {
    const dateAttribute = 'data-day-and-time';

    const recentClickedDateTime = clickedCheckbox.getAttribute(dateAttribute);
    const recentChecked = clickedCheckbox.checked;
    const recentCheckboxName = clickedCheckbox.name;

    for (let activity of activitesInputElemets){
        const activityDateTime = activity.getAttribute(dateAttribute);
        // if name is the same return false, else return true
        const isNotSameCheckBox = !(recentCheckboxName === activity.name);
        if ((activityDateTime === recentClickedDateTime) && isNotSameCheckBox){
            if(recentChecked){
                console.log("conflict detected");
                activity.parentElement.classList.add('disabled');
                activity.disabled = true;
            }else{
                console.log("removing conflict");
                activity.parentElement.classList.remove('disabled');
                activity.disabled = false;
            }
        }

    }
}

// +++++++++++++++++++++++++++++++++++ validators +++++++++++++++++++++++++++++++++++++++++++++
const nameValidator = () => {
    console.log('++++++++++++ Name Validator ++++++++++++');
    const name =  getElementById(NAME);
    // if name field is blank or only has white spaces return false
    isValid = name.value.trim().length > 0; 
    if(isValid){
        // if the name field is valid hind the hint and the warning signs
        hideOrShowElementById(NAMEHINT, HIDE);
        hideOrShowObviousErrors(NAME, HIDE);
    }else{
        // if the name field not valid show the hint and the warning sign
        hideOrShowElementById(NAMEHINT, SHOW);
        // show warning on pareent element
        hideOrShowObviousErrors(NAME, SHOW);
    }
    console.log('isNameValid : ', isValid);
    return isValid;
}
const emailValidator = () => {
    const emailValue = String(getElementById('email').value);
    // determind if emailValue is formated as "example@.[com,net,org..]"
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);

    if(emailIsValid){
        // if the email field not valid show the hint and the warning sign
        hideOrShowElementById(EMAILHINT, HIDE);
        hideOrShowObviousErrors('email', HIDE);
    }else{
        // Conditional error message: if the email field is blank change text of hint
        let hint = getElementById(EMAILHINT);
        if(emailValue.length < 1){
            hint.innerHTML = 'Email address cannot be blank';
        }else{
            hint.innerHTML = 'Email address must be formatted correctly';
        }
        // if the email field not valid show the hint and the warning sign
        hideOrShowElementById(EMAILHINT,SHOW);
        // show warning on pareent element
        hideOrShowObviousErrors('email',SHOW);
    }
    return emailIsValid;
}

const activitiesValidator = () => {
    // if cost is 0 that means no activities were selected 
    const isValid = STATE.activitiesCost > 0 || false;
    if(isValid){
        hideOrShowElementById(ACTIVITIESHINT, HIDE);
        // hide error warning on parent element 
        hideOrShowObviousErrors(ACTIVITIESHINT, HIDE); 
    } else {
        hideOrShowElementById(ACTIVITIESHINT, SHOW);
        // show error warning on parent element 
        hideOrShowObviousErrors(ACTIVITIESHINT,SHOW); 
    }
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
    /* credit card feild should follow one of Visa, Master card or American Express formats to be valid not just 13-16 characters
       example:
    visa: 4111111111111111 : 16 length, 4642307997554 : 13 digits, 4143618179763 : 13 digits 
    MasterCard: 5555555555554444 : 16 length
    American Express: 378282246310005 : 15 length 
    */ 
    const isCardNumberValid = visaCardRegex.test(cardNumber) || masterCardRegx.test(cardNumber) || amex.test(cardNumber);
    const isYearValid = isNaN(year); //not needed? 
    const isValidZipCode = zipRegex.test(zip);
    const isValidCvv = cvvRegex.test(cvv);
    // cc-num
    if(isCardNumberValid){
        // if card number is one of the valid card format hide the error messages and hints
        hideOrShowElementById(CREDITCARDHINTS.card,HIDE);
        hideOrShowObviousErrors(CREDITCARDHINTS.card, HIDE);
    }else{
        // if card number is NOT one of the valid card format show the error messages and hints
        hideOrShowElementById(CREDITCARDHINTS.card,SHOW);
        hideOrShowObviousErrors(CREDITCARDHINTS.card, SHOW);
    }
    // cc-zip
    if(isValidZipCode){
         // if zip code is valid  hide the error messages and hints
        hideOrShowElementById(CREDITCARDHINTS.zip,HIDE);
        hideOrShowObviousErrors(CREDITCARDHINTS.zip,HIDE);
    }else{
        // if zip code is valid  show the error messages and hints
        hideOrShowElementById(CREDITCARDHINTS.zip,SHOW);
        hideOrShowObviousErrors(CREDITCARDHINTS.zip,SHOW);
    }
    // cvv
    if(isValidCvv){
        hideOrShowElementById(CREDITCARDHINTS.cvv,HIDE);
        hideOrShowObviousErrors(CREDITCARDHINTS.cvv,HIDE)
    }else{
        hideOrShowElementById(CREDITCARDHINTS.cvv,SHOW);
        hideOrShowObviousErrors(CREDITCARDHINTS.cvv,SHOW)
    }
    return isCardNumberValid && isValidZipCode && isCvv;
}
// set the default requirements when user first loads the page
focusOnElementById(NAME);
hideOrShowElementById(OTHERJOBROLE,HIDE);
getElementById(COLORS).disabled = true;
getElementById('payment').value = CREDITCARD;
showPaymentMethodfor();

// Get Elements
const emailInfo = getElementById('email');
const jobSection = getElementById('title');
const shirtDesigns = getElementById('shirt-designs');
const designOptions = getElementById('color');
const activities = getElementById('activities');
const activitesInputElemets = getAllSubElements('activities','input');
const displayTotal = getElementById('activities-cost');
const payment = getElementById('payment');
const form = document.querySelector("form");

designOptions.disabled = true;
// real time updates for email field. 
emailInfo.addEventListener('keyup',(e) => {
    emailValidator();
});
// when there is a change in the job section drop down 
// determind wether to hind or show the other job input field. 
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
    const color = getElementById('color');
    // set disabled to false if and only if it's 
    if (designOptions.disabled === true){
        designOptions.disabled = false;
    }
    let defaultSelectIndex = -1;
    for (let i=0; i < designOptions.length; i++){
        if(designOptions[i].dataset.theme === currentSelection){
            designOptions[i].style.display = 'block';
        
            if(defaultSelectIndex === -1){
                defaultSelectIndex = i;
            }
        }else {
            designOptions[i].style.display = 'none';
        }
    }
    /* if no default option is set, 
       go ahead and set it based on the index of first item
       from each set of options js-puns vs heart js.

         exmample:
        if currentSelection = js puns 
        set default option to cornflowerblue

        if currenSelection = heart js 
        set default option to tomato
   */
    color.selectedIndex = defaultSelectIndex;
});

activities.addEventListener('change',(e) => {
    console.log('++++++++++++ activites ++++++++++++');
    const checkBox = e.target;
    console.log('activity: ', checkBox.name);
    // get current cost of activity 
    const cost = +checkBox.getAttribute('data-cost');
    displayTotal.innerHTML='';
    /* if the checkBox.checked === true then add to current total 
      if checkBox.checked === false subtract 'data-cost' amount from currentTotal
      this will not go below 0 because for checkBox.checked to be false then it must have been true 
      the first time this check box was clicked and already added to the total.  
     */
    checkBox.checked ? STATE.activitiesCost += cost : STATE.activitiesCost -= cost;
    displayTotal.innerHTML = `Total: $${STATE.activitiesCost}`; 
     /* 
      Determine if there is another event with conflicting date and time.
      disable the other contlicting checck box
    */ 
     determindConflict(checkBox);   
});
/**
 * For each activitty input field, 
 * if the user tabs over them we highlight the current checkbox on focus. 
 */
for (let input of activitesInputElemets){
    const parentLabel = input.parentElement;
    ['focus','blur'].forEach(action => {
        input.addEventListener(action,(e) => {
            if(action === 'focus'){

                parentLabel.classList.add('focus');
            }else{
                parentLabel.classList.remove('focus');
            }
        })
    });
}

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
