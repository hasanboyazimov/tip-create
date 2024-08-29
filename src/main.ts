// Select elements
const billInput = document.getElementById('bill') as HTMLInputElement;
const peopleInput = document.getElementById('people') as HTMLInputElement;
const tipButtons = document.querySelectorAll<HTMLButtonElement>('.tip-buttons button');
const customTipButton = document.querySelector<HTMLButtonElement>('.tip-buttons button:last-child');
const tipAmountDisplay = document.querySelector('.output-group:nth-child(1) .amount') as HTMLElement;
const totalAmountDisplay = document.querySelector('.output-group:nth-child(2) .amount') as HTMLElement;
const resetButton = document.querySelector('.reset-button') as HTMLButtonElement;

let tipPercentage: number = 15; // Default tip percentage

// Function to calculate and update tip and total amounts
function calculateAmounts(): void {
    const bill: number = parseFloat(billInput.value);
    const people: number = parseInt(peopleInput.value);

    if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0) {
        tipAmountDisplay.textContent = '$0.00';
        totalAmountDisplay.textContent = '$0.00';
        return;
    }

    const tipAmount: number = (bill * (tipPercentage / 100)) / people;
    const totalAmount: number = (bill / people) + tipAmount;

    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
}

// Function to handle tip button click
function handleTipButtonClick(event: MouseEvent): void {
    tipButtons.forEach(button => button.classList.remove('active'));
    const target = event.target as HTMLButtonElement;
    target.classList.add('active');
    tipPercentage = parseFloat(target.textContent!.replace('%', ''));
    calculateAmounts();
}

// Function to handle custom tip input
function handleCustomTip(): void {
    const customTip = prompt("Enter custom tip percentage:");
    if (customTip !== null && !isNaN(parseFloat(customTip)) && parseFloat(customTip) > 0) {
        tipPercentage = parseFloat(customTip);
        tipButtons.forEach(button => button.classList.remove('active'));
        calculateAmounts();
    }
}

// Function to reset all values
function resetValues(): void {
    billInput.value = '';
    peopleInput.value = '';
    tipPercentage = 15;
    tipButtons.forEach(button => button.classList.remove('active'));
    tipButtons[2].classList.add('active');
    calculateAmounts();
}

// Event listeners for real-time updates
billInput.addEventListener('input', calculateAmounts);
peopleInput.addEventListener('input', calculateAmounts);
tipButtons.forEach(button => button.addEventListener('click', handleTipButtonClick));
// customTipButton.addEventListener('click', handleCustomTip);
resetButton.addEventListener('click', resetValues);

// Initial calculation
calculateAmounts();
