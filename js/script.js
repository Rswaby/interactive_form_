// Rohan Swaby
// Interactive Form

// define action 
const SHOW = 'show';
const HIDE = 'hide';


const focusOnElementById = id =>{
    console.log('focusing on element with id =', id);
    document.getElementById(id).focus();
};

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

const jobSection = document.getElementById('title');

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
 
const shirtDesigns = document.getElementById('shirt-designs');

shirtDesigns.addEventListener('change',(e)=>{
    console.log('++++++++++++ shirt-designs ++++++++++++')
    let currentSelection = e.target.value;
    console.log('current user shirt design selection : ', currentSelection);
});



