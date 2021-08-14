

let billAmountDoc = document.querySelector('#bill-amount');
let cashGivenOutDoc = document.querySelector('#cash-given-out');
let billAmountWarn = document.querySelector('#bill-amt-warn');
let cashGivenOutWarn = document.querySelector('#cash-given-warn');
let noteHolder = document.querySelector('#note-holder');
let billAmount = 0;
let cashGivenOut = 0;

let notes = [2000, 500, 100, 20, 10, 5, 1];
let notesDenominationDict = {
    2000: '0',
    500: '0',
    100: '0',
    20: '0',
    10: '0',
    5: '0',
    1: '0',
};


function refreshNotesDisp() {
    noteHolder.innerHTML = "";
    notes.forEach(note => {
        noteHolder.innerHTML = noteHolder.innerHTML +
        `
        <li>
            <div>${note}</div><div>${notesDenominationDict[note]}</div>
        </li>
        `       
    });
}

function onChangeHandler(e) {
    let targetId = e.target.id;
    let targetValue;

    switch(targetId) {
        case 'bill-amount':
            billAmountWarn.style.display = "None";
            billAmountWarn.innerHTML = "";

            billAmount = e.target.value
            
            if(parseInt(billAmount, 10) > 0) {
                if(billAmount === '') {
                    cashGivenOutDoc.value = 0;
                    cashGivenOutDoc.disabled = true;
                    noteHolder.innerHTML = "";
                }
                else {
                    cashGivenOutDoc.disabled = false;
                }
                console.log(billAmount)
            }
            else {
                billAmountWarn.style.display = "block";
                billAmountWarn.innerHTML = "Enter Non-Negative Bill Amount.";
            }

            break;

        case 'cash-given-out':
            cashGivenOutWarn.style.display = "None";
            cashGivenOutWarn.innerHTML = "";    
            cashGivenOut = parseInt(e.target.value, 10);
            balanceCash = cashGivenOut - parseInt(billAmount, 10);

            if (cashGivenOut > 0) {
                if (balanceCash >= 0) {
                    notes.forEach(note => {
                        if(balanceCash >= note) {
                            note = parseInt(note)
                            notesDenominationDict[note] = parseInt(balanceCash / note, 10);
                            balanceCash = balanceCash - (notesDenominationDict[note] * note)
                        }
                    });

                    refreshNotesDisp();
                    console.log(notesDenominationDict)
                }
                else {
                    cashGivenOutWarn.style.display = "block";
                    cashGivenOutWarn.innerHTML = "Cash Given Out Has to be more than Bill Amount.";
                }
            }
            else {
                cashGivenOutWarn.style.display = "block";
                cashGivenOutWarn.innerHTML = "Enter Non-Negative Cash Value.";
            }
            break;

    }

}

billAmountDoc.addEventListener('change', onChangeHandler);
cashGivenOutDoc.addEventListener('change', onChangeHandler);