//  1.Deposit some money
//  2.Determine number of lines to bet on
//  3.Collect a bet amount
//  4.spin the slot machine
//  5.check if the user won
//  6.Give the user their winnings
//  7.paly again 

const prompt = require("prompt-sync")();
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT =
{
    "A":2,
    "B":4,
    "C":6,
    "D":8

}

const SYMBOLS_VALUES =
{
    "A":5,
    "B":4,
    "C":3,
    "D":2

}
















const deposit = () =>
{
    while(true)
    {
        const depositAmount = prompt("Enter a deposit amount : ");
        const numberDepositAmount = parseFloat(depositAmount);
        if(isNaN(numberDepositAmount)||numberDepositAmount<=0)
    {
        console.log("Invalid deposit amount ,try agian ");
    }
    else
    {
        return numberDepositAmount;

    }
        
    }
  
}

const depositAmount = deposit();
console.log(depositAmount)

const getNumberOfLines = ()=>
{
    while(true)
    {
        const lines = prompt("Enter number of lines to bet on(1-3) :  ");
        const numberOfLines = parseFloat(lines);
        if(isNaN(numberOfLines)||numberOfLines<=0||numberOfLines>3)
    {
        console.log("Invalid number of lines ,try again ");
    }
    else
    {
        return numberOfLines;

    }
        
    }

}

const lineNumbers = getNumberOfLines();
console.log(lineNumbers);

let balance = deposit();

const getBet= (balance,lines) =>
{
    while(true)
    {
        const bet = prompt("Enter Total bet per line: ");
        const numberBet = parseFloat(bet);
        if(isNaN(numberBet)||numberBet<=0||numberBet >balance/lines)
    {
        console.log("Invalid bet ,try again ");
    }
    else
    {
        return numberBet;

    }

}
}

const bet = getBet(balance,lineNumbers);

const spin =()=>
{
    const symbols =[];
    const reels =[];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT))
    {
        for(let i =0;i< count ;i++)
        {
            symbols.push(symbol);
        }
        
        for(let i =0;i<COLS;i++)
        {
            reels.push([]);
            const reelSymbol = [...symbols]; 
            for(let j =0;j<ROWS;j++)
            {
                const randomIndex = Math.floor(Math.random()*reelSymbol.length);
                const selectedSymbol = reelSymbol[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbol.splice(randomIndex,1);

            }
        }

        

    }

    return reels;

}
const transpose =(reels) =>
{
    const rows =[];
    for(let i =0;i<ROWS;i++)
    {
        rows.push([]);
        for(let j =0;j< COLS;j++)
{
    rows[i].push(reels[j][i])
}
return rows;
    }


}

const reels = spin();

const rows = transpose(reels);

const printRows = (rows)=>
{
    for(const row of rows)
    {
        let rowString = "";
        for(const[i,symbol] of row.entries())
        {
            rowString += symbol
            if(i != row.length -1)
            {
                rowString +=" | "
            }

        }

        console.log(rowString);

    }
}

printRows(rows);
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];

        // Check if symbols is an array and has elements
        if (Array.isArray(symbols) && symbols.length > 0) {
            let allSame = true;

            for (const symbol of symbols) {
                if (symbol !== symbols[0]) {
                    allSame = false;
                    break;
                }
            }

            if (allSame) {
                // Assuming SYMBOLS_VALUES is a predefined object
                winnings += bet * SYMBOLS_VALUES[symbols[0]];
            }
        } else {
            console.error(`Invalid symbols in row ${row}`);
        }
    }

    return winnings;
};


const winnings = getWinnings(rows,bet,lineNumbers) 
console.log("You Won ,$"+winnings.toString())

const game = () =>
{
    let balance = deposit();

    while(true)
    {
        console.log("You have a balance of $"+balance);
        
    const lineNumbers = getNumberOfLines();
    const bet = getBet(balance,lineNumbers);
    balance -= bet * lineNumbers ; 
    const reels = spin();

    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows,bet,lineNumbers) 
    balance += winnings;
    console.log("You Won ,$"+winnings.toString())

    if(balance <=0)
    {
        console.log("You ran out of money !");
        break;
    }

    const playAgain = prompt("Do you want to play again (y/n) ?")
    if(playAgain!="y")break;

    }

    

}
game()

