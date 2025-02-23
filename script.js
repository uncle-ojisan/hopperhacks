const mapButtons = document.querySelectorAll(".map button");
const scroll = document.querySelector(".scroll")
const messageArea = document.querySelector(".messageArea");
const pirateArea = document.querySelector(".pirateArea");
const messageBox = document.querySelector(".messageBox");
const answerBoxes = document.querySelectorAll(".answer");
const answers = document.querySelectorAll(".answer p");
const checkmarks = document.querySelectorAll(".checkmark");
const placeName = document.querySelector(".placeName");
const pirateship = document.querySelector(".PirateShip")
const map = document.querySelector(".map");
const delay = ms => new Promise(res => setTimeout(res, ms));

let messageContainer = document.querySelector(".messageArea div");
let messageText = messageContainer.querySelector("p");

let busy = true;
let readyToPick = false;
let explanation;
let correctAnswer;
let correctMessage;
let incorrectMessage;
let currentPlaceName;

let correctCount = 0;
let attempts = 0;
let currentQuestions;

let completed={};
let completedCount = 0;


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
  
],
    "Mexico": [
      [
        "What be choppin’ down Mexico’s forests?", 
        ["Lootin’ lumber", "Cursed crops", "Cannon fire", "Stormy winds"], 
        "Lootin’ lumber", 
        "Timber takin’ be leavin’ forests emptier than a plundered chest!", 
        ["Aye! Ye know yer trees!", "Nay! The forests be fallin’ to axes, matey!"]
      ],
      [
        "Which cursed storm be floodin’ Mexico’s shores?", 
        ["Hurricanes", "Ghost tides", "Kraken waves", "Fire storms"], 
        "Hurricanes", 
        "The wild winds be tearin’ through the land like a ship in a maelstrom!", 
        ["Aye! Ye be a storm chaser!", "Nay! The hurricanes be ragin’ like an angry sea god!"]
      ],
      [
        "What be poisonin’ Mexico’s seas?", 
        ["Plastic waste", "Kraken ink", "Cursed doubloons", "Shipwrecks"], 
        "Plastic waste", 
        "The seas be fillin’ with plastic faster than a pirate’s rum stash!", 
        ["Aye! Ye savvy the sea’s troubles!", "Nay! The ocean be chokin’ on plastic!"]
      ],
      [
        "What treasure in Mexico be dryin’ up?", 
        ["Freshwater", "Gold mines", "Coconut groves", "Rum barrels"], 
        "Freshwater", 
        "The rivers be dryin’ like a sailor’s throat on a windless voyage!", 
        ["Aye! Water be precious!", "Nay! The land be thirstier than a ship lost at sea!"]
      ],
      [
        "What be Mexico’s biggest desert?", 
        ["Chihuahuan Desert", "The Great Sand Dunes", "Cursed Sands", "The Golden Wastes"], 
        "Chihuahuan Desert", 
        "That desert be stretchin’ farther than a map to lost treasure!", 
        ["Aye! Ye know yer lands!", "Nay! The Chihuahuan be the grandest sea o’ sand!"]
      ],
      [
        "What be Mexico usin’ to harness the sun’s power?", 
        ["Solar panels", "Magic mirrors", "Golden compasses", "Flaming torches"], 
        "Solar panels", 
        "The sun’s fire be turned into power for the crew!", 
        ["Aye! Ye be a bright one!", "Nay! The sun be wasted if we not use its fire!"]
      ],
      [
        "What dark tide be threatenin’ Mexico’s crops?", 
        ["Drought", "Cursed rains", "Pirate raids", "Sea monsters"], 
        "Drought", 
        "No rain, no crops, no grub fer the hungry crew!", 
        ["Aye! Ye know the land’s troubles!", "Nay! The soil be drier than a desert bone!"]
      ],
      [
        "What sneaky trick be helpin’ Mexico save water?", 
        ["Rainwater catchin’", "Drinkin’ seawater", "Squeezin’ cacti", "Diggin’ deep wells"], 
        "Rainwater catchin’", 
        "Catchin’ rain be fillin’ barrels before the dry times!", 
        ["Aye! Ye be a wise sailor!", "Nay! Catch the rain ‘fore it vanishes like stolen treasure!"]
      ],
      [
        "Which beastie be a guardian of Mexico’s forests?", 
        ["Jaguar", "Kraken", "Ghost wolf", "Thunderbird"], 
        "Jaguar", 
        "That spotted devil be roamin’ the jungle like a true pirate king!", 
        ["Aye! Ye know the jungle’s ruler!", "Nay! The jaguar be the king o’ the wild!"]
      ],
      [
        "What ship be sailin’ to make Mexico greener?", 
        ["Reforestation", "Storm chasin’", "Treasure huntin’", "Rum running"], 
        "Reforestation", 
        "Plantin’ trees be makin’ the land lush as an untouched island!", 
        ["Aye! Ye be plantin’ the right course!", "Nay! More trees be needed, matey!"]
      ]
    ],
    "Chile": [
    [
      "What be strippin’ Chile’s forests o’ their green?", 
      ["Lumber lootin’", "Kraken’s curse", "Cannon fire", "Shipwrecks"], 
      "Lumber lootin’", 
      "Timber takin’ be leavin’ the land barer than a plundered chest!", 
      ["Aye! Ye know yer trees!", "Nay! The forests be fallin’ to greedy hands!"]
    ],
    [
      "What be rockin’ Chile’s lands too oft?", 
      ["Earthquakes", "Tsunamis", "Kraken stomps", "Volcanoes"], 
      "Earthquakes", 
      "The land be shakin’ like a ship in a storm!", 
      ["Aye! Ye be readin’ the ground well!", "Nay! The land quakes more than a drunken sailor!"]
    ],
    [
      "What dark tide be pollutin’ Chile’s seas?", 
      ["Plastic waste", "Ghost ships", "Oil spills", "Rum barrels"], 
      "Plastic waste", 
      "The seas be chokin’ on plastic faster than a sailor on bad grog!", 
      ["Aye! Ye savvy the sea’s troubles!", "Nay! The ocean be drownin’ in plastic!"]
    ],
    [
      "What be dryin’ up in Chile’s valleys?", 
      ["Freshwater", "Gold mines", "Coconut groves", "Rum supplies"], 
      "Freshwater", 
      "The rivers be dryin’ like a sailor’s throat on a windless voyage!", 
      ["Aye! Water be precious!", "Nay! The land be thirstier than a marooned pirate!"]
    ],
    [
      "What big ol’ dry patch be stretchin’ across Chile?", 
      ["Atacama Desert", "Sahara Sands", "Cursed Wasteland", "The Dunes o’ Doom"], 
      "Atacama Desert", 
      "That desert be drier than a pirate’s rum barrel after a feast!", 
      ["Aye! Ye know yer deserts!", "Nay! The Atacama be drier than a sailor’s jokes!"]
    ],
    [
      "What power be harnessed from Chile’s fiery mountains?", 
      ["Geothermal energy", "Dragon breath", "Cannon fire", "Volcanic magic"], 
      "Geothermal energy", 
      "The fiery depths be givin’ power to the people!", 
      ["Aye! Ye know the fire’s might!", "Nay! Volcanoes be more useful than just spewin’ lava!"]
    ],
    [
      "What be the greatest threat to Chile’s glaciers?", 
      ["Global heatin’", "Kraken attacks", "Sea shanties", "Pirate raids"], 
      "Global heatin’", 
      "The ice be meltin’ faster than a candle in a galley!", 
      ["Aye! Ye know the heat’s curse!", "Nay! The glaciers be meltin’ away like lost gold!"]
    ],
    [
      "What smart trick be helpin’ Chile save water?", 
      ["Fog catchin’", "Squeezin’ cacti", "Diggin’ deep wells", "Drinkin’ seawater"], 
      "Fog catchin’", 
      "Pullin’ water from the mist be cleverer than a pirate’s best scheme!", 
      ["Aye! Ye be a wise sailor!", "Nay! The fog be full o’ hidden treasure—water!"]
    ],
    [
      "Which beastie be roamin’ Chile’s wild lands?", 
      ["Puma", "Kraken", "Sea serpent", "Ghost wolf"], 
      "Puma", 
      "That big cat be prowlin’ like a captain guardin’ his loot!", 
      ["Aye! Ye know the wild ones!", "Nay! The puma be the true king o’ the land!"]
    ],
    [
      "What be a greener power than burnin’ coal?", 
      ["Wind energy", "Kraken oil", "Cannon steam", "Lightning"], 
      "Wind energy", 
      "The winds be turnin’ great wheels to power the land!", 
      ["Aye! Ye sail with the green winds!", "Nay! The air be full o’ power, use it!"]
    ]
  ],
"Angola": [
    [
    "What be strippin’ Angola’s forests faster than a pirate’s loot?", 
    ["Illegal loggin’", "Kraken’s curse", "Cannon fire", "Ghostly winds"], 
    "Illegal loggin’", 
    "The greedy hands be takin’ trees quicker than a pirate grabs gold!", 
    ["Aye! Ye know the tree thieves!", "Nay! The forests be fallin’ to thievin’ hands!"]
    ],
    [
    "What beastie roams Angola’s wild lands?", 
    ["Elephant", "Kraken", "Sea dragon", "Giant parrot"], 
    "Elephant", 
    "The mighty tusker be marchin’ through the jungles like a captain on deck!", 
    ["Aye! Ye know the jungle rulers!", "Nay! The elephants be stompin’ through Angola!"]
    ],
    [
    "What dark tide be poisonin’ Angola’s waters?", 
    ["Oil spills", "Kraken ink", "Cursed doubloons", "Ghost fog"], 
    "Oil spills", 
    "Black gold be spillin’ into the waters, foulin’ up the seas!", 
    ["Aye! Ye know the sea’s troubles!", "Nay! The ocean be blackened by spillin’ oil!"]
    ],
    [
    "What be dryin’ up Angola’s lands?", 
    ["Drought", "Cursed sands", "Mermaid magic", "Tidal waves"], 
    "Drought", 
    "No rain be leavin’ the land thirstier than a sailor after weeks at sea!", 
    ["Aye! Ye know the land’s struggles!", "Nay! The land be dryin’ like an old treasure map!"]
    ],
    [
    "What be eatin’ up Angola’s crops?", 
    ["Desert locusts", "Parrots", "Hungry ghosts", "Stormy winds"], 
    "Desert locusts", 
    "The little beasties be feastin’ like pirates at a victory feast!", 
    ["Aye! Ye know the crop thieves!", "Nay! The locusts be munchin’ all the grub!"]
    ],
    [
    "What treasure be Angola tryin’ to protect?", 
    ["Rainforests", "Kraken eggs", "Golden shores", "Cursed relics"], 
    "Rainforests", 
    "The green lands be home to many wild beasties and secret treasures!", 
    ["Aye! Ye be a landlubber with sense!", "Nay! The rainforests be needin’ protection!"]
    ],
    [
    "What be a smart way to grow crops in dry lands?", 
    ["Drip irrigation", "Bucket tossin’", "Rain dancin’", "Squeezin’ sea sponges"], 
    "Drip irrigation", 
    "Givin’ plants just the right drops keeps water safe for another voyage!", 
    ["Aye! Ye be a clever farmer!", "Nay! Waste not a drop, matey!"]
    ],
    [
    "What power be Angola harnessin’ from rivers?", 
    ["Hydropower", "Mermaid magic", "Ship sails", "Cannon blasts"], 
    "Hydropower", 
    "The rivers be turnin’ great wheels to light up the land!", 
    ["Aye! Ye know the river’s strength!", "Nay! The waters be holdin’ great power!"]
    ],
    [
    "What be threatenin’ Angola’s fishin’ waters?", 
    ["Overfishin’", "Sea monsters", "Cursed tides", "Sailor feasts"], 
    "Overfishin’", 
    "Too many fish be taken, leavin’ none for the next tide!", 
    ["Aye! Ye be a sea-wise pirate!", "Nay! The fish be disappearin’ like lost treasure!"]
    ],
    [
    "What be a greener power than burnin’ coal?", 
    ["Solar energy", "Kraken oil", "Lightning strikes", "Dragon breath"], 
    "Solar energy", 
    "The sun’s fire be free for takin’ without burnin’ the land!", 
    ["Aye! Ye sail with the green winds!", "Nay! The sun be givin’ free power, use it!"]
    ]
],
    "Japan": [
      [
        "What be threatenin’ Japan’s forests?", 
        ["Illegal logging", "Stormy seas", "Cursed spirits", "Pirate raids"], 
        "Illegal logging", 
        "Timber takin’ be leavin’ Japan’s forests bare as a plundered chest!", 
        ["Aye! Ye know the forest thieves!", "Nay! The forests be fallin’ to greedy axes!"]
      ],
      [
        "What mighty storm plagues Japan most?", 
        ["Typhoons", "Sea monsters", "Kraken attacks", "Cannon blasts"], 
        "Typhoons", 
        "The winds be roarin’ like a ship in a maelstrom!", 
        ["Aye! Ye know the storm’s wrath!", "Nay! The typhoons be ravagin’ the land!"]
      ],
      [
        "What be pollutin’ Japan’s waters?", 
        ["Plastic waste", "Kraken ink", "Shipwrecks", "Cursed treasure"], 
        "Plastic waste", 
        "The seas be chokin’ on plastic, as bad as a pirate’s rotten grog!", 
        ["Aye! Ye savvy the sea’s troubles!", "Nay! The ocean be drowning in plastic!"]
      ],
      [
        "What be dryin’ up in Japan?", 
        ["Freshwater", "Coconut groves", "Golden shores", "Rum barrels"], 
        "Freshwater", 
        "Water sources be shriveled up like a sailor without rum!", 
        ["Aye! Ye know the water’s worth!", "Nay! The land be thirstier than a marooned pirate!"]
      ],
      [
        "What beast be roamin’ Japan’s wild lands?", 
        ["Ursus bears", "Sea serpents", "Cursed wolves", "Wild boar"], 
        "Ursus bears", 
        "The mighty bears be marchin’ through Japan’s forests like kings of the land!", 
        ["Aye! Ye know the forest’s kings!", "Nay! The bears rule the wilds of Japan!"]
      ],
      [
        "What be Japan’s biggest green power?", 
        ["Wind energy", "Kraken oil", "Fire from volcanoes", "Solar energy"], 
        "Solar energy", 
        "Harnessin’ the sun’s fire be the cleanest power fer Japan’s ships and towns!", 
        ["Aye! Ye know the sun’s power!", "Nay! The sun be givin’ clean power fer all!"]
      ],
      [
        "What smart trick be savin’ Japan’s water?", 
        ["Rainwater catchin’", "Drinkin’ seawater", "Squeezin’ cacti", "Pirate bucket brigade"], 
        "Rainwater catchin’", 
        "Catchin’ water from the sky be keepin’ Japan’s land lush!", 
        ["Aye! Ye be a clever sailor!", "Nay! The rain be full o’ treasure, catch it!"]
      ],
      [
        "What be a greener power than coal?", 
        ["Hydropower", "Kraken energy", "Lightning strikes", "Dragon’s fire"], 
        "Hydropower", 
        "The rivers be givin’ power to Japan like a mighty ship on a strong current!", 
        ["Aye! Ye know the river’s strength!", "Nay! The river be full o’ untapped power!"]
      ],
      [
        "What be threatening Japan’s coastal waters?", 
        ["Overfishing", "Ghost ships", "Kraken attacks", "Cursed tides"], 
        "Overfishing", 
        "Too many fish be taken, leavin’ none fer the future!", 
        ["Aye! Ye know the sea’s troubles!", "Nay! The fish be disappearin’ faster than treasure!"]
      ],
      [
        "What be makin’ Japan’s land richer?", 
        ["Reforestation", "Magic potions", "Shipwrecks", "Pirate’s loot"], 
        "Reforestation", 
        "Plantin’ trees be helpin’ Japan’s soil stay rich and fertile!", 
        ["Aye! Ye be a green pirate!", "Nay! The land needs its trees to thrive!"]
      ]
    ],
"Spain": [
    [
    "What be ravagin' Spain's forests?", 
    ["Illegal logging", "Cursed winds", "Kraken’s wrath", "Pirate raids"], 
    "Illegal logging", 
    "Timber takin’ be leavin’ Spain’s forests bare like a shipwrecked vessel!", 
    ["Aye! Ye know the tree thieves!", "Nay! The axes be fallin’ on the forests!"]
    ],
    [
    "What beast be roammin’ Spain’s wild lands?", 
    ["Iberian lynx", "Kraken", "Sea monster", "Wild boar"], 
    "Iberian lynx", 
    "The lynx be a shadow stalkin' through Spain’s wild lands like a ghost!", 
    ["Aye! Ye know the king of the wild!", "Nay! The lynx be the silent hunter!"]
    ],
    [
    "What storm be hauntin’ Spain’s coasts?", 
    ["Hurricanes", "Typhoons", "Tempest winds", "Cursed tides"], 
    "Tempest winds", 
    "Winds be blowin’ hard, ravagin’ Spain’s shores like a pirate ship in battle!", 
    ["Aye! Ye feel the wind’s rage!", "Nay! The storms be fierce on the coasts!"]
    ],
    [
    "What be pollutin' Spain’s seas?", 
    ["Plastic waste", "Kraken ink", "Cannonballs", "Sunken treasure"], 
    "Plastic waste", 
    "The seas be fillin’ with plastic faster than a ship sinks in a storm!", 
    ["Aye! Ye know the sea’s troubles!", "Nay! The ocean be drownin’ in plastic!"]
    ],
    [
    "What power does Spain harness from the sun?", 
    ["Solar energy", "Kraken fire", "Pirate’s flame", "Thunder strikes"], 
    "Solar energy", 
    "The sun’s power be captured and used to fuel Spain’s cities and ships!", 
    ["Aye! Ye sail with the sun!", "Nay! The sun be a mighty power, use it!"]
    ],
    [
    "What be savin’ Spain’s water?", 
    ["Rainwater catchin'", "Drinking seawater", "Drought spells", "Squeezing cacti"], 
    "Rainwater catchin'", 
    "Catchin' the rain be the key to keepin' Spain’s lands lush and green!", 
    ["Aye! Ye know the treasure in the clouds!", "Nay! Water falls from the sky, catch it!"]
    ],
    [
    "What be threatenin’ Spain’s coastal ecosystems?", 
    ["Overfishing", "Pirate’s plunder", "Sea dragons", "Drought"], 
    "Overfishing", 
    "Too many fish be caught, leavin’ the seas empty like a plundered chest!", 
    ["Aye! Ye know the sea’s troubles!", "Nay! The fish be vanishing like gold in the wind!"]
    ],
    [
    "What desert be found in Spain?", 
    ["Tabernas Desert", "Sahara Sands", "Cursed Wastes", "Black Sands"], 
    "Tabernas Desert", 
    "A dry, barren land stretchin' further than a pirate’s map can show!", 
    ["Aye! Ye know the dry sands!", "Nay! The Tabernas be Spain’s own desert!"]
    ],
    [
    "What green power be Spain usin’ from the wind?", 
    ["Wind energy", "Kraken breath", "Dragon wings", "Pirate sails"], 
    "Wind energy", 
    "The winds blowin' through Spain’s hills be turnin' mighty turbines for power!", 
    ["Aye! Ye sail with the wind!", "Nay! The wind be blowin’ mighty for Spain!"]
    ],
    [
    "What mighty tree be Spain’s symbol of nature?", 
    ["Olive tree", "Cypress tree", "Pine tree", "Maple tree"], 
    "Olive tree", 
    "The olive tree be growin’ strong, givin’ Spain its bounty for many years!", 
    ["Aye! Ye know the land’s symbol!", "Nay! The olive be Spain’s heart and soul!"]
    ]
]
};

const welcomeMessages = [
    "Ahoy, ye brave soul! Welcome to EcoPirates Quest!",
    "Ten long years ago, ye ship was shattered to pieces, cast into the seas.",
    "Now, the fragments of yer vessel lie scattered across distant lands and forgotten islands.",
    "Six mighty core fragments hold the key to repairin’ yer ship and reclaiming yer pirate glory.",
    "Ye must sail far and wide, braving storms, strange lands, and treacherous foes, to find each piece.",
    "Only then can ye restore yer ship to its former strength and set sail once more.",
    "The adventure awaits, matey!",
]

const endingMessages = [
[
    "Ahoy, brave pirate! Ye've reclaimed yer ship and conquered the seas!",
    "The ocean sings of yer legend, and the tides bow to yer command.",
    "But the world still needs heroes beyond gold and glory.",
    "The seas be troubled, filled with waste and plundered treasures.",
    "Join the fight to protect our oceans from pollution and destruction!",
    "Look into ocean cleanup projects and help keep the waters wild and free!"
],
[
    "Yer grand adventure comes to an end, but the journey never truly stops.",
    "Ye've pieced together the past and set sail for a bright future.",
    "Yet, the lands ye sailed be wounded, forests lost to greedy hands.",
    "The trees that once whispered to pirates now cry for help.",
    "Take action and fight against deforestation!",
    "Support tree-planting initiatives and help forests reclaim their strength!"
],
[
    "The ship be whole, the horizon be open, and the world be yers again!",
    "But ye've seen the cost of careless plunder, aye?",
    "The landfills grow, and the treasures of nature be wasted away.",
    "A pirate’s duty be not just to take, but to give back!",
    "Think twice before tossin’ what could be reused or recycled.",
    "Join the zero-waste movement and sail toward a cleaner future!"
],
[
    "With wind in yer sails and the stars as yer guide, ye be truly free!",
    "But even the stars seem dimmed by the smoke of industry.",
    "The air, once fresh, be thick with the spoils of human greed.",
    "A pirate respects the winds, for they carry his ship forward!",
    "Stand against air pollution and fight for clean energy!",
    "Support renewable energy initiatives and breathe easy once more!"
],
[
    "Yer ship be mighty once more, and the seas be callin’!",
    "Yet, the creatures of the deep be fewer than before.",
    "The bounty of the ocean be vanishing, stolen by overfishing.",
    "A true pirate knows to take only what be needed!",
    "Defend marine life by supporting sustainable fishing practices.",
    "Join ocean conservation groups and keep the deep alive!"
],
[
    "Victory be yers, and the horizon be endless!",
    "But as ye gaze upon the lands ye visited, ye see the scars.",
    "Oil spills and toxic waste poison the waters ye once called home.",
    "The ship sails best on clean seas, not blackened waters!",
    "Take a stand against water pollution and corporate greed!",
    "Support clean water initiatives and protect the blue heart of the world!"
],
[
    "Yer name be legend, sung by the waves and whispered by the winds!",
    "But what good be a legend if there be no world left to remember it?",
    "Rising tides threaten the lands ye once knew, swamping coasts and homes.",
    "A pirate knows the power of the sea, but even she must be respected!",
    "Join the fight against climate change before the waters rise too high!",
    "Support climate action and sail toward a sustainable future!"
],
[
    "The ship be sturdy, the sails be strong, and adventure be endless!",
    "Yet, even a pirate must leave a legacy beyond treasure and tales.",
    "Ye’ve seen islands turned barren, the soil turned to dust.",
    "The land, like the sea, must be protected for those who come next!",
    "Advocate for sustainable farming and protect the bounty of the earth!",
    "Support local farms and regenerative agriculture for a greener tomorrow!"
],
[
    "Yer voyage be done, and the map be complete!",
    "Yet, no map can lead to a future if the land itself be gone.",
    "Mining and drilling strip the earth bare, leaving only ruin behind.",
    "A pirate takes, aye, but the wise pirate also gives back!",
    "Push for sustainable resources and an end to reckless extraction!",
    "Support ethical companies and eco-friendly alternatives!"
],
[
    "The last treasure be found, and yer journey be at its end!",
    "But the greatest treasure be not gold, but the world itself!",
    "From the deepest sea to the highest peak, it be worth protectin’!",
    "A pirate's legacy should be one of adventure, not destruction!",
    "Spread the word about environmental protection and inspire others!",
    "Raise awareness, be a voice for the planet, and lead the way to change!"
]
];
  

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
    busy = true;

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
        scroll.classList.remove("folded");
        if (correctCount >= 3) {
            completed[currentPlaceName] = true;
            completedCount++;
            console.log(document.getElementById(currentPlaceName).childNodes);
            await delay(1000);
            document.getElementById(currentPlaceName).childNodes[1].classList.add("crossed");

            if (completed == 6) {
                end();
            }
        }
        busy = false;

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

mapButtons.forEach(button=>{
    button.addEventListener("click", ()=>{
        if (!busy && completed[button.id] != true) {

            attempts = 0;
            correctCount = 0;

            currentPlaceName = button.id;
            placeName.textContent = currentPlaceName;
            scroll.classList.add("folded");
            messageArea.classList.add("visible");
            pirateArea.classList.add("visible");
            placeName.classList.add("visible");
            console.log(currentPlaceName);
            currentQuestions = getQuestions(currentPlaceName);
            writeQuestion(currentQuestions[0]);
        }
    });
});

async function end() {
    mapButtons.forEach(button=>{
        button.childNodes[1].classList.remove("crossed");
    })

    map.classList.add("done");
    await delay(250);
    pirateship.classList.add("done");
    await delay(2000);
    scroll.classList.add("folded");
    await delay(1000);

    messageArea.classList.add("visible");
    pirateArea.classList.add("visible");

    await delay(1000);

    const endingMessage = endingMessages[Math.floor(Math.random()*endingMessages.length)];
    for (let i = 0; i < endingMessage.length; i++) {
        await typewrite(messageBox, endingMessage[i]);
        await delay(2000);
    }

    messageArea.classList.remove("visible");
    pirateArea.classList.remove("visible");
    await delay(1000);
    scroll.classList.remove("folded");
}

async function start() {
    await delay(1000);
    messageArea.classList.add("visible");
    pirateArea.classList.add("visible");
    await delay(1000);

    for (let i = 0; i < welcomeMessages.length; i++) {
        await typewrite(messageBox, welcomeMessages[i]);
        await delay(2000);
    }
        
    messageArea.classList.remove("visible");
    pirateArea.classList.remove("visible");
    await delay(1000);
    scroll.classList.remove("folded");
    await delay(2000);
    busy = false;

    
}



start();




// console.log(questionText);