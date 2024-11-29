document.addEventListener('DOMContentLoaded', function () {
    
    // --- Mortgage Calculator ---
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function (event) {
            event.preventDefault();
            calculatePayment();
        });
    }

    function calculatePayment() {
        // Clear previous result
        document.getElementById("progressText").textContent = "Simulating Loan Payment...";
        document.getElementById("monthlyPayment").textContent = "";
        document.getElementById("eligibility").textContent = "";
        document.getElementById("expenseBreakdown").textContent = "";

        // Get input values
        const loanAmount = parseFloat(document.getElementById("loanAmount").value);
        const interestRate = parseFloat(document.getElementById("interestRate").value) / 100 / 12;
        const loanTerm = parseFloat(document.getElementById("loanTerm").value) * 12;
        const income = parseFloat(document.getElementById("income").value);

        // Validate inputs
        if (isNaN(loanAmount) || loanAmount <= 0 || isNaN(interestRate) || isNaN(loanTerm) || loanTerm <= 0 || isNaN(income) || income <= 0) {
            document.getElementById("result").innerHTML = "<p>Please enter valid numbers.</p>";
            return;
        }

        // Calculate mortgage
        const monthlyPayment = loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm) /
            (Math.pow(1 + interestRate, loanTerm) - 1);
        const affordablePayment = income * 0.30;

        // Simulate loan payment progress
        const progressBar = document.getElementById("progressBarInner");
        const progressText = document.getElementById("progressText");
        let currentPayment = 1;
        const totalPayments = loanTerm;
        const animationDuration = 6000; // Total animation time in milliseconds

        const intervalId = setInterval(() => {
            const percentage = (currentPayment / totalPayments) * 100;
            progressBar.style.width = percentage + "%";
            progressText.textContent = `Simulating Loan Payment: Payment ${currentPayment} of ${totalPayments}`;
            currentPayment++;

            if (currentPayment > totalPayments) {
                clearInterval(intervalId);
                progressText.textContent = "Simulation Complete!";
                document.getElementById("monthlyPayment").textContent = `Monthly Payment: £${monthlyPayment.toFixed(2)}`;

                // Check loan eligibility
                if (monthlyPayment > affordablePayment) {
                    document.getElementById("eligibility").textContent = "Loan denied: Monthly payment exceeds 30% of your income.";
                } else {
                    document.getElementById("eligibility").textContent = "You are eligible for this loan based on your income.";
                }

                // Expense breakdown
                const totalInterestPaid = (monthlyPayment * loanTerm) - loanAmount;
                document.getElementById("expenseBreakdown").innerHTML = `
                    <strong>Expense Breakdown:</strong><br>
                    Principal: £${loanAmount.toFixed(2)}<br>
                    Total Interest: £${totalInterestPaid.toFixed(2)}<br>
                    Monthly Interest Payment: £${(monthlyPayment - (loanAmount * interestRate)).toFixed(2)}<br>
                    Monthly Principal Payment: £${(monthlyPayment - (monthlyPayment - (loanAmount * interestRate))).toFixed(2)}<br>
                    Remaining Income After Loan Payment: £${(income - monthlyPayment).toFixed(2)}
                `;
            }
        }, animationDuration / totalPayments);
    }

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Display success message
            successMessage.style.display = 'block';

            // Clear form and hide message after a delay
            setTimeout(() => {
                contactForm.reset();
                successMessage.style.display = 'none';
            }, 5000);
        });
    }

    // --- FAQ Section Accordion ---
    if (typeof $ !== 'undefined') {
        $(document).ready(function () {
            // Accordion functionality
            $('.faq-question').click(function () {
                var $answer = $(this).next('.faq-answer');
                
                // Toggle visibility of the clicked answer
                $answer.slideToggle();
                
                // Optionally close other answers when a new question is clicked
                $('.faq-answer').not($answer).slideUp();
            });
        });
    }

});