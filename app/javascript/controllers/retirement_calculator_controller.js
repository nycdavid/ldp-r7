let calculateBtn = document.querySelector('.calculate');

calculateBtn.addEventListener('click', (event) => {
    let netWorth = document.querySelector('#networth').value;
    let goal = document.querySelector('#goal').value;
    let count = 0;
    do {
        count = count + 1;
        netWorth = netWorth * 1.05
    } while (netWorth <= goal);
    console.log(count);
    console.log(netWorth);

    let message = document.querySelector('.tagline');
    message.innerText = `It will take you ${count} years to retire.`
})
