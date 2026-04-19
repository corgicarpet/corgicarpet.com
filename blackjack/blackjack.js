let balance = 50;
let rankfilenames = [];
let suitfilenames = [];
let cardamount = 0;
let goal = 0;
let finalcheck = "false";
let betamt = 0;
let fulldeck = [];
function generatedeck(){
    //goes thru and generated standard deck sorted
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
    const suits = ["C", "D", "H", "S"];
    fulldeck = [];

    for(let rank of ranks){
        for(let suit of suits){
            fulldeck.push(`${rank}${suit}`);
        }
    }
}
function shuffledeck(){
    //shuffles deck using rand
    for(let i = fulldeck.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [fulldeck[i], fulldeck[j]] = [fulldeck[j], fulldeck[i]];
    }
}
function drawCard(){
    //draws card i..e "AC or 2H"
    return fulldeck.pop();
}

function startsgamehandler(){
    //get bet in
    const bet = document.getElementById("bet");
    betamt = Number(bet.value);
    //if bet is good
    if(betamt < (balance+1)){
        //deduct bal
        balance = balance - betamt;
        console.log("start!");
        updatebalance();
        cardamount = 1;
        finalcheck = "false";
        //reset arrays
        rankfilenames = [];
        suitfilenames = [];
        //reset all full content from prev game
        const playerhand = document.getElementById("playerhand");
        playerhand.innerHTML = "";

        const status = document.getElementById("status");
        status.textContent = "";

        const dealerhand = document.getElementById("dealerhand");
        dealerhand.innerHTML = "";
        //make and shuffle deck
        generatedeck();
        shuffledeck();
        //draw card and split into rank and suit
        let card = drawCard();
        let splitcard = card.split("");
        let rank = splitcard[0];
        rankfilenames[0] = rank;
        let suit = splitcard[1];
        suitfilenames[0] = suit;
        //get image file for card
        const filename = `${rank}${suit}`;
        console.log("Random card: ", filename);
        //create card img in html
        const cardImg = document.createElement("img");
        cardImg.src = `images/${filename}.svg`;
        playerhand.appendChild(cardImg);

    }else{
        //bet isnt good
        const status = document.getElementById("status");
        status.textContent = "Not enough balance to bet..";
    }

    
}
function startaddbalancehandler(){
    //add balance for testing (depositing)
    balance = balance + 50;
    console.log(balance);
    updatebalance();
}
function updatebalance(){
    //update balance text
    const bal = document.getElementById("balance");
    bal.textContent = balance;
}
function handlewin(){
    //game won, gains 2x chips put in (doubles chips)
    console.log("Win!");
    const status = document.getElementById("status");
    status.textContent = "You win! You get 2x balance back!";
    balance = balance + (betamt * 2);
    updatebalance();
}
function handleloss(){
    //lose, don't give back any chips
    console.log("Lose!");
    const status = document.getElementById("status");
    status.textContent = "You lose...";
}
function handlebust(){
    //bust, same as lose different message
    console.log("Bust!");
    const status = document.getElementById("status");
    status.textContent = "Bust! You went over 21...";
}
function handledraw(){
    //draw, give back bet
    console.log("Draw..");
    const status = document.getElementById("status");
    status.textContent = "Draw.. Dealer had same amount.. Your balance was returned";
    balance = balance + betamt;
    updatebalance();
}
function checkhand(){
    //makes sure hand isn't over / if win/lose
    let total = 0;
    for(let rank of rankfilenames){
        switch(rank){
            case "A"://translate card string into val
                if((total + 11) > 21){
                    total++;
                }else{
                    total = total + 11;
                }
                break;
            case "K":
                total = total + 10;
                break;
            case "Q":
                total = total + 10;
                break;
            case "J":
                total = total + 10;
                break;
            case "T":
                total = total + 10;
                break;  
            default:
                let val = Number(rank);
                total = total + val;  
        }
        console.log("Current value: ", total);
    }
    if(total > 21){
        handlebust();//bust
        finalcheck = "true";
    }else if(finalcheck === "true"){
        if(total < goal){
            handleloss();//below dealer; lose
        }else if(total > goal){
            handlewin();//above dealer and below 21; win
        }else{
            handledraw();//same as dealer; draw
        }
    }
    

}
function starthithandler(){
    if(cardamount > 0){//if you have a card
        if(finalcheck === "false"){//if game isn't marked as done
            //draw and split card
            let card = drawCard();
            let splitcard = card.split("");
            let rank = splitcard[0];
            rankfilenames[cardamount] = rank;//insert into player card array
            let suit = splitcard[1];
            suitfilenames[cardamount] = suit;
            //get card image file
            const filename = `${rank}${suit}`;
            console.log("Random card: ", filename);
            //make image in html
            const playerhand = document.getElementById("playerhand");
            const cardImg = document.createElement("img");
            cardImg.src = `images/${filename}.svg`;
            playerhand.appendChild(cardImg);
            cardamount++;//keep track of cards
            checkhand();
        }
        
    }
    
}
function startstandhandler(){
    if(cardamount > 0){
        if(finalcheck === "false"){//if game isnt done
            const dealerhand = document.getElementById("dealerhand");
            dealerhand.innerHTML = "";//clear array and html
            let dealerrankfilenames = [];
            let dealersuitfilenames = [];
            let dealertotal = 0;
            while(dealertotal < 17){//go until dealer hits 17
                let card = drawCard();
                let splitcard = card.split("");
                let rank = splitcard[0];
                let suit = splitcard[1];
                
                dealerrankfilenames.push(rank);//push instead, easier
               
                dealersuitfilenames.push(suit);
                const filename = `${rank}${suit}`;
                console.log("Random card: ", filename);

                //draw image and add to html
                const dealercardimg = document.createElement("img");
                dealercardimg.src = `images/${filename}.svg`
                dealerhand.appendChild(dealercardimg);
                switch(rank){
                    case "A"://translate rank
                        if((dealertotal + 11) > 21){
                            dealertotal++;
                        }else{
                            dealertotal = dealertotal + 11;
                        }
                        break;
                    case "K":
                        dealertotal = dealertotal + 10;
                        break;
                    case "Q":
                        dealertotal = dealertotal + 10;
                        break;
                    case "J":
                        dealertotal = dealertotal + 10;
                        break;
                    case "T":
                        dealertotal = dealertotal + 10;
                        break;  
                    default:
                        let val = Number(rank);
                        dealertotal = dealertotal + val;  
                }
                console.log("Dealer value: ", dealertotal);
                //after adding totals
            }
            //make goal dealer val
            goal = dealertotal;
            finalcheck = "true";//set game as done
            if(dealertotal > 21){//if dealer is bust you win
                handlewin();
            }else{
                checkhand();//check hand for win condition
            }
        }
    }
}
//setup buttons etc
const startgame = document.getElementById("startgame");
const hit = document.getElementById("hit");
const stand = document.getElementById("stand");
const addbalance = document.getElementById("addbalance");
startgame.onclick = startsgamehandler;
addbalance.onclick = startaddbalancehandler;
hit.onclick = starthithandler;
stand.onclick = startstandhandler;