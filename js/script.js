// Rohan Swaby
// Interactive Form

// define action 
const SHOW = 'show';
const HIDE = 'hide';


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
        console.log('showing element with id =',id);
        element.style.display = "block";
    } else if(action === HIDE) {
        console.log('hiding element with id =',id);
        element.style.display = "none";
    }
};

// defaults 
focusOnElementById('name');
hideOrShowElementById('other-job-role',HIDE);

// Title section control

const jobSection = getElementById('title');

jobSection.addEventListener('change',(e)=>{
    console.log('++++++++++++ Job Section ++++++++++++')
    let currentSelection = e.target.value;
    console.log('current user selection : ', currentSelection);
    if (currentSelection === 'other'){
        hideOrShowElementById('other-job-role',SHOW);
    }else{
        hideOrShowElementById('other-job-role',HIDE);
    }
});
 
const shirtDesigns = getElementById('shirt-designs');
const designOptions = getElementById('color');

shirtDesigns.addEventListener('change',(e)=>{
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

const activities = getElementById('activities');
const displayTotal = getElementById('activities-cost');
let currentCost = 0;

activities.addEventListener('change',(e)=>{
    console.log('++++++++++++ activites ++++++++++++');
    const checkBox = e.target;
    const isChecked = checkBox.checked;
    // get current cost of activity 
    const cost = +checkBox.getAttribute('data-cost');
    displayTotal.innerHTML='';
    isChecked ? currentCost += cost : currentCost -= cost;
    displayTotal.innerHTML = `Total: $${currentCost}`;    
});


