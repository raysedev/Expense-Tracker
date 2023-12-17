window.addEventListener("load", solve);

function solve() {
    const expenseInput = document.getElementById('expense');
    const amountInput = document.getElementById('amount');
    const dateInput = document.getElementById('date');
    const addBtn = document.getElementById('add-btn');

    const previewList = document.getElementById('preview-list');
    const expenseList = document.getElementById('expenses-list');
    addBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (expenseInput.value !== '' && amountInput.value !== '' && dateInput.value !== '') {
            const liElement = createPreview(
                expenseInput.value,
                amountInput.value,
                dateInput.value,
                'preview'
            );

            previewList.appendChild(liElement);

            expenseInput.value = '';
            amountInput.value = '';
            dateInput.value = '';

            addBtn.setAttribute('disabled', true);


            const editBtn = liElement.querySelector('button.edit');
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();

                expenseInput.value = liElement.querySelector('p.type-p').innerHTML.substring(6);
                amountInput.value = liElement.querySelector('p.amount-p').innerHTML.substring(8);
                dateInput.value = liElement.querySelector('p.date-p').innerHTML.substring(6);

                addBtn.removeAttribute('disabled');
                liElement.parentNode.removeChild(liElement);
            });

            const okBtn = liElement.querySelector('button.ok');
            okBtn.addEventListener('click', (e) => {
                e.preventDefault();

                const newElement = createPreview(
                    liElement.querySelector('p.type-p').innerHTML.substring(6),
                    liElement.querySelector('p.amount-p').innerHTML.substring(8),
                    liElement.querySelector('p.date-p').innerHTML.substring(6),
                    'expense'
                );

                expenseList.appendChild(newElement);

                liElement.parentNode.removeChild(liElement);
                addBtn.removeAttribute('disabled');

                document.querySelector('button.delete').addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    newElement.parentNode.removeChild(newElement);
                    location.reload();
                });
            });
        }
    });

    function createPreview(expense, amount, date, type) {
        const liElement = document.createElement('li');
        liElement.classList.add('expense-item');
    
        const articleElement = document.createElement('article');
    
        const expenseType = document.createElement('p');
        expenseType.innerHTML = `Type: ${expense}`;
        expenseType.classList.add('type-p');
        const expenseAmount = document.createElement('p');
        expenseAmount.innerHTML = `Amount: ${amount}$`;
        expenseAmount.classList.add('amount-p');
        const expenseDate = document.createElement('p');
        expenseDate.innerHTML = `Date: ${date}`;
        expenseDate.classList.add('date-p');
    
        const divElement = document.createElement('div');
        divElement.classList.add('buttons');
    
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'edit');
        editBtn.innerHTML = 'edit';
        const okBtn = document.createElement('button');
        okBtn.classList.add('btn', 'ok');
        okBtn.innerHTML = 'ok';
    
        articleElement.appendChild(expenseType);
        articleElement.appendChild(expenseAmount);
        articleElement.appendChild(expenseDate);
        divElement.appendChild(editBtn);
        divElement.appendChild(okBtn);
        liElement.appendChild(articleElement);
        if (type === 'preview') {
            liElement.appendChild(divElement);
        }
    
        return liElement;
    }
}