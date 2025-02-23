const mapButtons = document.querySelectorAll(".map button");
const scroll = document.querySelector(".scroll")
const messageArea = document.querySelector(".messageArea");
const pirateArea = document.querySelector(".pirateArea");
const messageBox = document.querySelector(".messageBox");
const answerBoxes = document.querySelectorAll(".answer");
const answers = document.querySelectorAll(".answer p");
const checkmarks = document.querySelectorAll(".checkmark");
const placeName = document.querySelector(".placeName");
const delay = ms => new Promise(res => setTimeout(res, ms));

let messageContainer = document.querySelector(".messageArea div");
let messageText = messageContainer.querySelector("p");

let busy = false;
let readyToPick = false;
let explanation;
let correctAnswer;
let correctMessage;
let incorrectMessage;

let correctCount = 0;
let attempts = 0;
let currentQuestions;


const questions = {
    "Somalia": [
    [
      "What be lootin' Somalia’s forests?", 
      ["Charcoal makin’", "Scallywag farmin’", "Treasure huntin’", "Shipbuildin’"], 
      "Charcoal makin’", 
      "Charcoal trade be strippin’ the land o’ its trees!", 
      ["Aye! Ye know yer trees!", "Nay! The trees be fallin’ to charcoal, matey!"]
    ],
    [
      "Which cursed storm plagues Somalia most?", 
      ["Typhoons", "Hunger storms", "Droughts", "Kraken waves"], 
      "Droughts", 
      "Arrr, dry spells be makin’ water scarce and crops wither!", 
      ["Aye, ye be a weather wizard!", "Nay! The land be thirstier than a marooned sailor!"]
    ],
    [
      "What menace be plunderin’ Somalia’s seas?", 
      ["Overfishin’", "Ghost ships", "Oil spills", "Cannon fire"], 
      "Overfishin’", 
      "Too much fishin’ be leavin’ no booty for tomorrow!", 
      ["Aye! Ye savvy the sea!", "Nay! The fish be vanishin’ like a ghost ship!"]
    ],
    [
      "What be burnin’ up Somalia’s lands?", 
      ["Solar flares", "Volcanoes", "Charcoal makin’", "Cannon fire"], 
      "Charcoal makin’", 
      "Makin’ charcoal be leavin’ the land bare as a plundered chest!", 
      ["Aye! Ye know yer burnin’ loot!", "Nay! The land be blackened like a burnt map!"]
    ],
    [
      "What curse be turnin’ good land into sand?", 
      ["Desertification", "Sea shanties", "Kraken’s curse", "Lost treasure"], 
      "Desertification", 
      "The land be dryin’ up faster than rum at a pirate feast!", 
      ["Aye! Ye know land’s fate!", "Nay! The soil be slippin’ through our fingers!"]
    ],
    [
      "What dark tide be makin’ food scarce?", 
      ["Cursed crops", "Droughts", "Sailor’s scurvy", "Tsunamis"], 
      "Droughts", 
      "With no rain, the crops be dyin’ like a mutiny gone wrong!", 
      ["Aye! Ye got the hunger truth!", "Nay! The land be starvin’ worse than a ship with no rations!"]
    ],
    [
      "What trick be savin’ fresh water?", 
      ["Rainwater catchin’", "Cursed wells", "Shark wranglin’", "Drinkin’ seawater"], 
      "Rainwater catchin’", 
      "Catchin’ rain be fillin’ barrels fer the dry days ahead!", 
      ["Aye! Ye be a water wizard!", "Nay! Catch the rain ‘fore it be gone!"]
    ],
    [
      "What smart sailin’ can stop overgrazin’?", 
      ["Rotatin’ graze spots", "Tossin’ livestock overboard", "Makin’ ‘em run", "Feedin’ ‘em fish"], 
      "Rotatin’ graze spots", 
      "Givin’ land a rest keeps it greener than a mermaid’s tail!", 
      ["Aye! Ye be a wise landlubber!", "Nay! The land be needin’ a breather, matey!"]
    ],
    [
      "Which crew be hurt most by land woes?", 
      ["Farmers", "Mermaids", "Treasure hunters", "Sailors"], 
      "Farmers", 
      "No good land, no grub, no gold!", 
      ["Aye! Ye know who suffers!", "Nay! Without land, no farmer fills his belly!"]
    ],
    [
      "What be a greener power than charcoal?", 
      ["Solar energy", "Kraken oil", "Whale blubber", "Lightning"], 
      "Solar energy", 
      "The sun be givin’ power without burnin’ trees!", 
      ["Aye! Ye be a green pirate!", "Nay! The sun be a free treasure, use it!"]
    ]
  ]
};

function getQuestions(place) {
    const placeQuestions = questions[place];
    const shuffled = [...placeQuestions].sort(()=> 0.5 - Math.random());
    return shuffled;
}

async function typewrite(box, text) {
    box.textContent = ""
    for (let i = 0; i < text.length; i++) {
        box.textContent += text[i];
        await delay(10);
    }
}

async function reverseTypewrite(box) {
    while (box.textContent.length > 0) {
        box.textContent = box.textContent.slice(0, box.textContent.length-1);
        await delay(20);
    }
}

async function appearAndWrite(box, text) {
    box.parentElement.classList.add("visible")
    await delay(10);
    await typewrite(box, text)
}

async function writeQuestion(question) {
    await appearAndWrite(messageBox, question[0])

    
    await appearAndWrite(answers[0], question[1][0])
    await appearAndWrite(answers[1], question[1][1])
    await appearAndWrite(answers[2], question[1][2])
    await appearAndWrite(answers[3], question[1][3])

    correctAnswer = question[2];
    explanation = question[3];
    correctMessage = question[4][0];
    incorrectMessage = question[4][1];
    console.log(correctAnswer);
    readyToPick = true;
}

mapButtons.forEach(button => {
    button.addEventListener("click", () => {
        const name = button.id;
        const placeQuestions = getQuestions(name);
        scroll.classList.add("unscroll");
        
    })
});

async function finishAnswer(correct) {
    if (correct) {
        checkmarks[correctCount].classList.add("visible");
        correctCount++
    };
    typewrite(messageBox, explanation);
    await delay(2000);
    await reverseTypewrite(messageBox);

    if (correctCount >= 3 || attempts >= 9) {
        messageArea.classList.remove("visible");
        pirateArea.classList.remove("visible");
        checkmarks.forEach(mark => {
            mark.classList.remove("visible");
        })
        placeName.classList.remove("visible");
    } else {
        attempts++;
        writeQuestion(currentQuestions[attempts]);
    }
}



answerBoxes.forEach(box => {
    box.addEventListener("click", async ()=>{
        if (readyToPick) {
            let answer = box.childNodes[1].textContent;
            console.log(box.childNodes[1]);
            readyToPick = false;
            answerBoxes.forEach(tBox => {
                console.log(tBox);
                if (tBox != box) {
                    tBox.classList.remove("visible");
                    console.log('removed');
                }
                
            })
            //TODO: RIGHT OR WRONG
            if (answer != correctAnswer) {
                console.log(incorrectMessage);
                let correctBox;
                await delay(1000);
                box.classList.remove("visible");
                answers.forEach(tAnswer => {
                    if (tAnswer.textContent == correctAnswer) {
                        correctBox = tAnswer.parentElement;
                        return;
                    }
                })
                correctBox.classList.add("visible");
                await typewrite(messageBox, incorrectMessage);
                await delay(1000);
                correctBox.classList.remove("visible");
                finishAnswer(false)
                return;
            }
            console.log(correctMessage);
            await typewrite(messageBox, correctMessage);
            await delay(1000);
            finishAnswer(true)
            box.classList.remove("visible");
        }
    })
})

// function resizeText() {
//     let fontSize = 10;
//     messageText.style.fontSize = fontSize + "px";

//     console.log(messageText.scrollWidth < messageContainer.clientWidth)
//     while (messageText.scrollWidth < messageContainer.clientWidth && messageText.scrollHeight < messageContainer.clientHeight) {
//         console.log('hi');
//         fontSize++;
//         messageText.style.fontSize = fontSize + "px";
//     }
// }

// window.addEventListener("resize", resizeText);
// resizeText();

messageArea.classList.add("visible");
pirateArea.classList.add("visible");

currentQuestions = getQuestions("Somalia")

placeName.classList.add("visible");

writeQuestion(currentQuestions[0]);
// console.log(questionText);