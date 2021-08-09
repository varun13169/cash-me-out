

let billAmountDoc = document.querySelector('#bill-amount');
let cashGivenOutDoc = document.querySelector('#cash-given-out');
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
            billAmount = e.target.value
            if(billAmount != '') {
                console.log(billAmount)
            }
            console.log(billAmount)
            break;

        case 'cash-given-out':
            cashGivenOut = parseInt(e.target.value, 10)
            console.log(cashGivenOut)
            notes.forEach(note => {
                if(cashGivenOut >= note) {
                    console.log(cashGivenOut, note, (cashGivenOut => note))
                    note = parseInt(note)
                    notesDenominationDict[note] = parseInt(cashGivenOut / note, 10);
                    cashGivenOut = cashGivenOut - (notesDenominationDict[note] * note)
                }
            });
            refreshNotesDisp();
            console.log(notesDenominationDict)
            break;

    }

}

billAmountDoc.addEventListener('change', onChangeHandler);
cashGivenOutDoc.addEventListener('change', onChangeHandler);