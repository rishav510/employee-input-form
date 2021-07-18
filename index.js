const marriedRadio = document.getElementById('Married');
const singleRadio = document.getElementById('Single');
const maleRadio = document.getElementById('Male')
const submitButton = document.getElementById('submitButton');
const employeeFirstName = document.getElementById('firstName');
const employeeLastName = document.getElementById('lastName');
const spouseFirstName = document.getElementById('spouseFirstName');
const spouseLastName = document.getElementById('spouseLastName');
const termsAccepted  = document.getElementById('termsAccepted');
const resetButtonContainer = document.getElementById('reset');
const resetButton = document.getElementById('resetButton');
const toolTip = document.getElementsByClassName('tooltip')[0];
const termsNotAcceptedWarning = document.getElementsByClassName('notAcceptedMessage')[0];
const warningClasses = ['warningEmployeeFirstName', 'warningEmployeeLastName', 'warningSpouseFirstName', 'warningSpouseLastName', 'notAcceptedMessage'];
const toolTipMessage = document.getElementsByClassName('tooltip-message')[0];
const termsAndConditionsLink = document.getElementById('termsAndConditonsLink');
console.log(termsAndConditionsLink);
const termsAndConditions = document.getElementById('termsAndConditionsDocument');
console.log(termsAndConditions);

const invalidNameEntryMessage = " cannot have spaces, digits or special characters.";
const termsNotAcceptedMessage = " Terms and Conditions need to be accepted.";
const resetWarningMessage = "All entered data will be lost!"
const acceptedMessage = "Thank You";
const validNameRegex = /^[A-Za-z]+[ ]*$/;
const containsNumberRegex = /\d/;


function setInitialFormState(){
    singleRadio.checked = true;
    maleRadio.checked = true;
    employeeFirstName.focus();
}

function getNameFieldLabel(nameTextBox){
    return nameTextBox.parentElement.previousElementSibling.innerText;
}

function addNameFieldWarning(inputField, warningClass)
{
    const nameTextBox = document.getElementsByClassName(warningClass)[0];
    let stillInvalid = false;
    const nameFieldLabel = getNameFieldLabel(nameTextBox);

    if(inputField.value === "")
    {
        alert('Please enter ' + nameFieldLabel);
        inputField.focus();
        return false;    
    }

        
    else if(validNameRegex.test(inputField.value) === false && !stillInvalid)
    {   
        nameTextBox.style.display='block';
        nameTextBox.innerText = "* " + nameFieldLabel + invalidNameEntryMessage;
        inputField.focus();
        stillInvalid = true;
        return false;
    }

    else
    {
        removeWarning(warningClass);
        stillInvalid = false;
        return true;
    }

}

function addTermsNotAcceptedWarning(){
    termsNotAcceptedWarning.innerText = "*" + termsNotAcceptedMessage; 
    termsNotAcceptedWarning.style.display = 'block';
}

function removeWarning(warningClass)
{
    const warningElement = document.getElementsByClassName(warningClass)[0];
    warningElement.style.display = 'none';
}



singleRadio.addEventListener('change', function(){
    const spouseSection = document.getElementsByClassName('spouse-visible');
    if(this.checked)
    for(element of spouseSection)
        element.classList.add('spouse-hidden');
});

marriedRadio.addEventListener('change', function(){
    const spouseSection = document.getElementsByClassName('spouse-hidden');
    if(this.checked)
        for (element of spouseSection)
        {
            element.classList.remove('spouse-hidden');
            element.classList.add('spouse-visible');
        }
});

termsAndConditionsLink.addEventListener('click', ()=>{
    termsAndConditions.style.display = 'block';
});

termsAndConditions.addEventListener('click',(event)=>{
    if(!termsAndConditions.firstChild.contains(event.target))
        termsAndConditions.style.display = 'none';
})
resetButtonContainer.addEventListener('mouseenter',function(){
    toolTip.style.opacity = 1;
    toolTipMessage.innerHTML = resetWarningMessage;
});

resetButtonContainer.addEventListener('mouseleave',function(){
    toolTip.style.opacity = 0;
});

resetButton.addEventListener('click', ()=>{
    setTimeout(()=>{
        singleRadio.checked = true;
        maleRadio.checked = true;
        employeeFirstName.focus();
        for(warningClass of warningClasses)
            removeWarning(warningClass);
    }, 1);
    
});

submitButton.addEventListener('click', ()=>{
    
    let spouseLastNameOK,spouseFirstNameOK,employeeLastNameOK,employeeFirstNameOK;
    if(!singleRadio.checked)
    {

        spouseLastNameOK = addNameFieldWarning(spouseLastName, warningClass= 'warningSpouseLastName');
        spouseFirstNameOK = addNameFieldWarning(spouseFirstName, warningClass= 'warningSpouseFirstName');        
    }
    else
        spouseLastNameOK = spouseFirstNameOK = true;

    employeeLastNameOK = addNameFieldWarning(employeeLastName, 'warningEmployeeLastName');
    employeeFirstNameOK = addNameFieldWarning(employeeFirstName, 'warningEmployeeFirstName');

    if(!termsAccepted.checked)
        addTermsNotAcceptedWarning();  

    if(termsAccepted.checked)
       removeWarning('notAcceptedMessage');
    
    if(termsAccepted.checked && spouseLastNameOK && spouseFirstNameOK && employeeLastNameOK && employeeFirstNameOK)
        alert(acceptedMessage);
           
});

setInitialFormState();