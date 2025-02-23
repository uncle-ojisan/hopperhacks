const mapButtons = document.querySelectorAll(".map button");
const scroll = document.querySelector(".scroll")
const questionText = document.querySelector(".question");
const answers = document.querySelectorAll(".answer");
const delay = ms => new Promise(res => setTimeout(res, ms));



const questions = {
    Somalia: [
        ["What be the biggest threat to Somalia’s land, arrr?", ["Deforestation", "Rising Seas", "Plastic Waste", "Volcanoes"], "Deforestation"],
        ["Which treasure of the sea be plundered too much off Somalia’s coast, ye scallywag?", ["Tuna", "Sharks", "Lobsters", "All of 'em"], "All of 'em"],
        ["What be the main reason for desertification in Somalia, aye?", ["Overgrazin’", "Black magic", "Too many pirates", "Earthquakes"], "Overgrazin’"],
        ["Which cursed thing pollutes Somalia’s waters, makin’ fish walk the plank?", ["Oil spills", "Toxic waste dumpin’", "Plastic bottles", "Mermaids' tears"], "Toxic waste dumpin’"],
        ["Which sea monster (storm) be hittin’ Somalia’s shores more due to climate change, matey?", ["Cyclones", "Kraken attacks", "Waterspouts", "Tsunamis"], "Cyclones"],
        ["Why do landlubbers be choppin’ down too many trees in Somalia?", ["For charcoal", "To build ships", "To find treasure", "To make peg legs"], "For charcoal"],
        ["What be the main reason Somalia be strugglin’ with fresh water, arrr?", ["Drought", "Too many wells", "Kraken drank it", "Magic curses"], "Drought"],
        ["Which country be accused of dumpin’ toxic waste in Somali waters, ye bilge rat?", ["Italy", "Spain", "China", "USA"], "Italy"],
        ["What be one way Somalia can fight deforestation, savvy?", ["Plant more trees", "Use more charcoal", "Summon Poseidon", "Ignore it"], "Plant more trees"],
        ["Which of these critters be disappearin’ from Somalia’s lands due to habitat loss?", ["Lions", "Elephants", "Cheetahs", "All of ‘em"], "All of ‘em"],
        ["What deadly weather curse be worsenin’ Somalia’s food shortages?", ["Drought", "Hurricanes", "Snowstorms", "Tidal waves"], "Drought"],
        ["What illegal act be drivin’ Somali fishermen into piracy, arrr?", ["Foreign overfishin’", "Sea monster attacks", "Shipwrecks", "Too much rum"], "Foreign overfishin’"],
        ["What be one way to save Somalia’s farmlands, ye greenhorn?", ["Use water wisely", "Plunder the soil", "Burn the crops", "Feed ‘em to the sharks"], "Use water wisely"],
        ["What energy source could keep Somalia from burnin’ all its trees?", ["Solar power", "Kraken breath", "Burnin’ old ships", "Pirate curses"], "Solar power"],
        ["What be the best way to protect Somali wildlife, arrr?", ["Stop poachin’", "Hunt ‘em more", "Ship ‘em overseas", "Keep ‘em in barrels"], "Stop poachin’"],
        ["What be a big reason for food shortages in Somalia, matey?", ["Drought", "Too many pirates", "Ghost ships", "Curse of Blackbeard"], "Drought"],
        ["What be the biggest danger to Somalia’s coral reefs, ye scurvy dog?", ["Illegal fishin’", "Mermaids", "Too many divers", "Volcanoes"], "Illegal fishin’"],
        ["What be one way Somalia can fight water shortages, savvy?", ["Build rainwater tanks", "Drink seawater", "Rely on the Kraken", "Steal water from ships"], "Build rainwater tanks"],
        ["Which landlubber trick be ruinin’ Somali soil, makin’ crops fail?", ["Overgrazin’", "Salt magic", "Too much treasure buried", "Dancin’ on it"], "Overgrazin’"]
    ]
};

function getQuestions(place) {
    const placeQuestions = questions[place];
    const shuffled = [...placeQuestions].sort(()=> 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

async function typewrite(box, text) {
    box.textContent = ""
    for (let i = 0; i < text.length; i++) {
        box.textContent += text[i];
        await delay(50);
        console.log(text[i]);
    }
}

async function writeQuestion(question) {
    await typewrite(questionText, question[0])
    await typewrite(answers[0], question[1][0])
    await typewrite(answers[1], question[1][1])
    await typewrite(answers[2], question[1][2])
    await typewrite(answers[3], question[1][3])
}

mapButtons.forEach(button => {
    button.addEventListener("click", () => {
        const name = button.id;
        const placeQuestions = getQuestions(name);
        scroll.classList.add("unscroll");
        
    })
});


writeQuestion(getQuestions("Somalia")[0]);
// console.log(questionText);