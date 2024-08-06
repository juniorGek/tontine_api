const generateAccountNumber = () => {
    const prefix = '178945';
    let accountNumber = prefix;
    for (let i = 0; i < 14 - prefix.length; i++) {
        accountNumber += Math.floor(Math.random() * 10); // Append a random digit (0-9)
    }
    return accountNumber;
}

module.exports = generateAccountNumber;