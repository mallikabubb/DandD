class Monster {
    constructor() {
        this.pos = [1,1]
        this.ac = 12
        this.hitpoints = 10
        this.damage = getRandomIntInclusive(1, 4)+1  // 1d4 + 1 
    }
}

class Player {
    constructor(level = 1) {
        this.level = level;
        this.exp = 0
        this.gold = 100
        this.hp = `NA`
        this.ac = `NA`
        this.pos = [5,5]

        this.strength = getStat();
        this.intel = getStat();
        this.dexterity = getStat();
        this.cons = getStat();
        this.wisdom = getStat();
        this.charisma = getStat();

        this.race = "NA"
        this.clss = "NA"

        this.acrobatics= {skill: 0, value: 0}
        this.animal_handling= {skill: 0, value: 0}
        this.arcana={skill: 0, value: 0}
        this.athletics={skill: 0, value: 0}
        this.deception={skill: 0, value: 0}
        this.history={skill: 0, value: 0}
        this.insight={skill: 0, value: 0}
        this.intimidation={skill: 0, value: 0}
        this.investigation={skill: 0, value: 0}
        this.medicine={skill: 0, value: 0}
        this.nature={skill: 0, value: 0}
        this.perception={skill: 0, value: 0}
        this.performance={skill: 0, value: 0}
        this.persuasion={skill: 0, value: 0}
        this.religion={skill: 0, value: 0}
        this.slight_of_hand={skill: 0, value: 0}
        this.stealth={skill: 0, value: 0}
        this.survival={skill: 0, value: 0}

        // this.acrobatics= 0
        // this.animal_handling= 0
        // this.arcana=0
        // this.athletics=0
        // this.deception=0
        // this.history=0
        // this.insight=0
        // this.intimidation=0
        // this.investigation=0
        // this.medicine=0
        // this.nature=0
        // this.perception=0
        // this.performance=0
        // this.persuasion=0
        // this.religion=0
        // this.slight_of_hand=0
        // this.stealth=0
        // this.survival=0

        this.proficiencybonus = 2 + Math.floor((this.level - 1) / 4)
        this.hitpoints=0
        this.hitdice=0
        this.savingthrows = "NA"
        this.skills = "NA"
    }

    toString() {
        return `Player Stats:<br>
                Level: ${this.level}<br>
                Experience points: ${this.exp}<br>
                <br>
                Hit points: ${this.hp}<br>
                Armor class: ${this.ac}<br>
                <br>
                Strength: ${this.strength}<br>
                Dexterity: ${this.dexterity}<br>
                Constitution: ${this.cons}<br>
                Intelligence: ${this.intel}<br>
                Wisdom: ${this.wisdom}<br>
                Charisma: ${this.charisma}<br>
                <br>
                Gold: ${this.gold}<br>
                <br>
                Race: ${this.race}<br>
                Class: ${this.clss}<br>
                <br>
                Acrobatics: ${this.acrobatics.value}<br>
                Animal Handling: ${this.animal_handling.value}<br>
                Arcana: ${this.arcana.value}<br>
                Athletics: ${this.athletics.value}<br>
                Deception: ${this.deception.value}<br>
                History: ${this.history.value}<br>
                Insight: ${this.insight.value}<br>
                Intimidation: ${this.intimidation.value}<br>
                Investigation: ${this.investigation.value}<br>
                Medicine: ${this.medicine.value}<br>
                Nature: ${this.nature.value}<br>
                Perception: ${this.perception.value}<br>
                Performance: ${this.performance.value}<br>
                Persuasion: ${this.persuasion.value}<br>
                Religion: ${this.religion.value}<br>
                Slight of Hand: ${this.slight_of_hand.value}<br>
                Stealth: ${this.stealth.value}<br>
                Survival: ${this.survival.value}<br>                    
                `
    }

}


// Thanks, Appa!
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Thanks, Millan!
function readStr() {
    return new Promise((res, rej) => {
        document.querySelector('input[type=submit]').disabled = false;
        document.querySelector('form').onsubmit = (e) => {
            e.preventDefault();
            document.querySelector('input[type=submit]').disabled = true;
            let txt = document.querySelector('#textentry').value
            document.querySelector('#textentry').value = ''
            res(txt)
            return false;
        }
    });
}

// Thanks, Millan!
function playVideo(url) {
    return write(`<video autoplay controls src='${url}'></video>`);
}

// Thanks, Millan!
async function playAudio(url) {
    return write(`<audio autoplay controls src='${url}'></audio>`);
}

// Thanks, Millan!
function showImage(url) {
    return write(`<img src='${url}'>`);
}

// Thanks, Millan!
function write(str) {
    var newParagraph = document.createElement('p');
    newParagraph.innerHTML = str;
    document.querySelector('#rpg-text').appendChild(newParagraph);
    document.querySelector('#rpg-text').scrollTop = document.querySelector('#rpg-text').scrollHeight;
    return newParagraph;
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
    
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function getStat() {
    //var y = 5
    //var x = [3,4,5,6];
    var x = [
        getRandomIntInclusive(2, 6),
        getRandomIntInclusive(2, 6),
        getRandomIntInclusive(1, 6),
        getRandomIntInclusive(1, 6)]
    //return x.reduce(x)
    var min = x.reduce(function (a, b) {
        return Math.min(a, b);
    });
    var sum = x.reduce(function (a, b) {
        return a + b;
    });
    return sum - min
    //return x.reduce((a,b) => a + b, 0) - Math.min(x)
    //return x
}

function getMultStats(num) {
    var x = getStat()
    let stats = [x]
    for (var i = 1; i < num; i++) {
        x = getStat()
        stats.push(x)
    }
    // let x = stats[0]
    // write(`x`)
    return (stats)
}



async function roll_stats() {

    var numstats = 6
    write(`Here are your rolls:`)
    await playAudio('assets/audio/dice_rolling.wav')
    let statarr = getMultStats(numstats)
    let txt = ''
    for (let stat of statarr) {
        txt += (' ' + stat)
    }
    write(txt)

    // write('Do you want to re-roll? (y/n)')
    // let answer = await readStr()

    // while (answer.match(`y`)) {
    //     write(`Here are your rolls:`)
    //     await playAudio('assets/audio/dice_rolling.wav')
    //     let statarr = getMultStats(numstats)
    //     let txt = ''
    //     for (let stat of statarr) {
    //         txt += (' ' + stat)
    //     }
    //     write(txt)                
    //     write('Do you want to re-roll? (y/n)')
    //     let answer = await readStr()    
    // }
    return (statarr)
}

async function assign_stats(player, statarr) {

    let numstats = statarr.length
    let allowedstats = ['str', 'int', 'con', 'dex', 'wis', 'cha' ]
    let txt = ''
    for (let astat of allowedstats) {
        txt += (' ' + astat)
    }

    write(`>>>Which stats (of ${txt}) do you want 
    to assign them to (in order)?`)

    let satisfied = false
    while (!satisfied) {

        let neworder = await readStr()
        write(neworder)
        neworder = neworder.toLowerCase()
        let statorder = neworder.split(' ')
        while (statorder.length != numstats) {
            write(`Enter exactly ${numstats} stats`)
            neworder = await readStr()
            statorder = neworder.split(' ')
        }

        for (var i = 0; i < numstats; i++) {
            if (!(allowedstats.includes(statorder[i]))) {
                write(`Invalid stat! Must be one of ${txt}`)
                satisfied = false
            }
            switch (statorder[i]) {
                case 'str':
                    player.strength = statarr[i]
                    break
                case 'int':
                    player.intel = statarr[i]
                    break
                case 'con':
                    player.cons = statarr[i]
                    break
                case 'wis':
                    player.wisdom = statarr[i]
                    break
                case 'cha':
                    player.charisma = statarr[i]
                    break
                case 'dex':
                    player.dexterity = statarr[i]
                    break
            }
        }
        satisfied = true
        var newStatCheck = write(player);
        newStatCheck.style.fontSize = "12px";
    }
}

async function initialize_stats(player) {

    var statarr = await roll_stats();
    await assign_stats(player, statarr)
}

async function initialize_background() {

    let bkgds = [
        'acolyte',
        'charlatan',
        'criminal',
        'entertainer',
        'folk_hero',
        'guild_artisan',
        'hermit',
        'noble',
        'outlander',
        'sage',
        'sailor',
        'soldier',
        'urchin'
    ]
    let txt =''
    for (let bkgd of bkgds) {
        txt += (' ' + bkgd)
    }
    // write(`>>>Choose class: {${txt} }`)

    // let SKILLS_LIST = [
    //     'acrobatics',      // 0
    //     'animal_handling', // 1
    //     'arcana',          // 2
    //     'athletics',       // 3
    //     'deception',       // 4
    //     'history',         // 5
    //     'insight',         // 6
    //     'intimidation',    // 7
    //     'investigation',   // 8
    //     'medicine',        // 9
    //     'nature',          // 10
    //     'perception',      // 11
    //     'performance',     // 12
    //     'persuasion',      // 13
    //     'religion',        // 14
    //     'sleight_of_hand', // 15
    //     'stealth',         // 16
    //     'survival'         // 17
    // ]

    // let clss = await readStr()
    // clsses = clss.toLowerCase()
    // while (!(clsses.includes(clss))){
    //      write(`You must choose one of the given clsses`)
    //      clss = await readStr()
    //      clss = clss.toLowerCase()
    // }
    // player.clss = clss
    // let invals = ""
    // let skillchoices = ""
    // switch (clss){
    //     case 'barbarian':
    //         player.hitpoints = 12 + await getModifier(player.cons)
    //         player.hitdice = 12
    //         player.savingthrows = {
    //             strength: 1,
    //             constitution: 1
    //         }
    //         //player.skills
    //         write(`Choose 2 skills from (enter numbers separated by spaces):`)
    //         write(`(1) ${SKILLS_LIST[1]}`)
    //         write(`(3) ${SKILLS_LIST[3]}`)
    //         write(`(7) ${SKILLS_LIST[7]}`)
    //         write(`(10) ${SKILLS_LIST[10]}`)
    //         write(`(11) ${SKILLS_LIST[11]}`)
    //         write(`(17) ${SKILLS_LIST[17]}`)

    //         // write(`Choose 2 skills from (enter numbers separated by spaces):\n
    //         //     ${SKILLS_LIST[1]} (1), ${SKILLS_LIST[3]} (3),
    //         //     ${SKILLS_LIST[7]} (7), ${SKILLS_LIST[10]} (10),
    //         //     ${SKILLS_LIST[11]} (11), ${SKILLS_LIST[17]} (17)`)
    //         invals = await readStr()
    //         skillchoices = invals.split(' ')            
    //         for (var i = 0; i < 2; i++) {
    //             player[SKILLS_LIST[skillchoices[i]]].skill=1
    //         }
    //         break
    //     case 'bard':
    //         player.hitpoints = 8 + await getModifier(player.cons)
    //         player.hitdice = 8
    //         player.savingthrows = {
    //             dexterity: 1,
    //             charisma: 1
    //         }
    //         //player.skills
    //         write(`Choose 3 skills from (enter numbers separated by spaces):`)
    //         for (var i = 0; i < SKILLS_LIST.length; i++){
    //             write(`(${i}) ${SKILLS_LIST[i]}`)
    //         }
    //         invals = await readStr()
    //         skillchoices = invals.split(' ')  
    //         write(invals)          
    //         for (var i = 0; i < 3; i++) {
    //             player[SKILLS_LIST[skillchoices[i]]].skill=1
    //         }
    //         write(`foo`)
    //         break
    //     }
}

async function choose_skills(player, allowedskills,numallowed){

    write(`Choose ${numallowed} skills from (enter numbers separated by spaces):`)        
    let txt = '';
    for (var i = 0; i < allowedskills.length; i++) {
        txt += (`(${i}) ${SKILLS_LIST[allowedskills[i]]}<br>`)
    }
    write(txt)

    let invals = await readStr()
    let skillchoices = invals.split(' ')            
    for (var i = 0; i < 2; i++) {
        player[SKILLS_LIST[skillchoices[i]]].skill=1
    }
}

async function initialize_class(player) {

    let clsses = ['barbarian','bard','cleric','druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard']
    let txt =''
    for (let clss of clsses) {
        txt += (' ' + clss)
    }
    write(`>>>Choose class: {${txt} }`)
    let clss = await readStr()
    clsses = clss.toLowerCase()
    while (!(clsses.includes(clss))){
            write(`You must choose one of the given clsses`)
            clss = await readStr()
            clss = clss.toLowerCase()
    }
    player.clss = clss
    let invals = ""
    let skillchoices = ""
    switch (clss){
        case 'barbarian':
            player.hitpoints = 12 + await getModifier(player.cons)
            player.hitdice = 12
            player.savingthrows = {
                strength: 1,
                constitution: 1
            }
            //player.skills
            await choose_skills(
                player,
                [1,3,7,10,11,17], // allowed skills
                2     // num allowed
            )
            break
        case 'bard':
            player.hitpoints = 8 + await getModifier(player.cons)
            player.hitdice = 8
            player.savingthrows = {
                dexterity: 1,
                charisma: 1
            }
            //player.skills
            write(`Choose 3 skills from (enter numbers separated by spaces):`)
            txt=''
            for (var i = 0; i < SKILLS_LIST.length; i++) {
                txt += (`(${i}) ${SKILLS_LIST[i]}<br>`)
            }
            write(txt)
    
            // for (var i = 0; i < SKILLS_LIST.length; i++){
            //     write(`(${i}) ${SKILLS_LIST[i]}`)
            // }
            invals = await readStr()
            skillchoices = invals.split(' ') 
            for (var i = 0; i < 3; i++) {
                player[SKILLS_LIST[skillchoices[i]]].skill=1
            }
            break
        // case 'cleric':
        //     player.hitpoints = 8 + await getModifier(player.cons)
        //     player.hitdice = 8
        //     player.savingthrows = {
        //         wisdom: 1,
        //         charisma: 1
        //     }
        //     //player.skills
        //     write(`Choose 2 skills from (enter numbers separated by spaces):`)
        //     write(`(5) ${SKILLS_LIST[5]}`)
        //     write(`(6) ${SKILLS_LIST[6]}`)
        //     write(`(9) ${SKILLS_LIST[9]}`)
        //     write(`(13) ${SKILLS_LIST[13]}`)
        //     write(`(14) ${SKILLS_LIST[14]}`)
        //     break
        // case 'druid':
        //     player.hitpoints = 8 + await getModifier(player.cons)
        //     player.hitdice = 8
        //     player.savingthrows = {
        //         intelligence: 1,
        //         wisdom: 1
        //     }
        //     //player.skills
        //     write(`Choose 2 skills from (enter numbers separated by spaces):`)
        //     write(`(1) ${SKILLS_LIST[1]}`)
        //     write(`(2) ${SKILLS_LIST[2]}`)
        //     write(`(6) ${SKILLS_LIST[6]}`)
        //     write(`(9) ${SKILLS_LIST[9]}`)
        //     write(`(10) ${SKILLS_LIST[10]}`)
        //     write(`(11) ${SKILLS_LIST[11]}`)
        //     write(`(14) ${SKILLS_LIST[14]}`)
        //     write(`(17) ${SKILLS_LIST[17]}`)
        //     break
        // case 'fighter':
        //     player.hitpoints = 10 + await getModifier(player.cons)
        //     player.hitdice = 10
        //     player.savingthrows = {
        //         strength: 1,
        //         constitution: 1
        //     }
        //     //player.skills
        //     write(`(0) ${SKILLS_LIST[0]}`)
        //     write(`(1) ${SKILLS_LIST[1]}`)
        //     write(`(3) ${SKILLS_LIST[3]}`)
        //     write(`(5) ${SKILLS_LIST[5]}`)
        //     write(`(6) ${SKILLS_LIST[6]}`)
        //     write(`(7) ${SKILLS_LIST[7]}`)
        //     write(`(11) ${SKILLS_LIST[11]}`)
        //     write(`(17) ${SKILLS_LIST[17]}`)

        //     break
        // case 'monk':
        //     player.hitpoints = 8 + await getModifier(player.cons)
        //     player.hitdice = 8
        //     player.savingthrows = {
        //         dexterity: 1,
        //         strength: 1
        //     }
        //     //player.skills
        //     write(`(0) ${SKILLS_LIST[0]}`)
        //     write(`(3) ${SKILLS_LIST[3]}`)
        //     write(`(5) ${SKILLS_LIST[5]}`)
        //     write(`(6) ${SKILLS_LIST[6]}`)
        //     write(`(14) ${SKILLS_LIST[14]}`)
        //     write(`(16) ${SKILLS_LIST[16]}`)
        //     break
        // case 'paladin':
        //     player.hitpoints = 10 + await getModifier(player.cons)
        //     player.hitdice = 10
        //     player.savingthrows = {
        //         wisdom: 1,
        //         charisma: 1
        //     }
        //     //player.skills
        //     write(`(3) ${SKILLS_LIST[3]}`)
        //     write(`(6) ${SKILLS_LIST[6]}`)
        //     write(`(7) ${SKILLS_LIST[7]}`)
        //     write(`(9) ${SKILLS_LIST[9]}`)
        //     write(`(13) ${SKILLS_LIST[13]}`)
        //     write(`(14) ${SKILLS_LIST[14]}`)
            
        //     break
        // case 'ranger':
        //     player.hitpoints = 10 + await getModifier(player.cons)
        //     player.hitdice = 10
        //     player.savingthrows = {
        //         dexterity: 1,
        //         strength: 1
        //     }
        //     //player.skills
        //     write(`(3) ${SKILLS_LIST[3]}`)
        //     write(`(6) ${SKILLS_LIST[6]}`)
        //     write(`(7) ${SKILLS_LIST[7]}`)
        //     write(`(13) ${SKILLS_LIST[13]}`)
        //     write(`(14) ${SKILLS_LIST[14]}`)
        //     break
        // case 'rogue':
        //     player.hitpoints = 8 + await getModifier(player.cons)
        //     player.hitdice = 8
        //     player.savingthrows = {
        //         dexterity: 1,
        //         intelligence: 1
        //     }
        //     //player.skills
        //     break
        // case 'sorcerer':
        //     player.hitpoints = 6 + await getModifier(player.cons)
        //     player.hitdice = 6
        //     player.savingthrows = {
        //         constitution: 1,
        //         charisma: 1
        //     }
        //     //player.skills
        //     break
        // case 'warlock':
        //     player.hitpoints = 8 + await getModifier(player.cons)
        //     player.hitdice = 8
        //     player.savingthrows = {
        //         wisdom: 1,
        //         charisma: 1
        //     }
        //     //player.skills
        //     break
        // case 'wizard':
        //     player.hitpoints = 6 + await getModifier(player.cons)
        //     player.hitdice = 6
        //     player.savingthrows = {
        //         intelligence: 1,
        //         wisdom: 1
        //     }
        //     //player.skills
        //     break
        }
}

async function initialize_race(player) {

    let races = ['human','elf','dwarf','halfling', 'dragonborn', 'gnome', 'half-orc', 'tiefling']
    let txt =''
    for (let race of races) {
        txt += (' ' + race)
    }
    write(`>>>Choose race: {${txt} }`)

    let race = await readStr()
    race = race.toLowerCase()
    while (!(races.includes(race))){
        write(`You must choose one of the given races`)
        race = await readStr()
        race = race.toLowerCase()
    }
    player.race = race
    switch (race){
            case 'elf':
                player.dexterity = player.dexterity + 2
                player.perception.skill = 1
                break
            case 'dwarf':
                player.cons = player.cons + 2
                break
            case 'halfling':
                player.dexterity = player.dexterity + 2
                break
            case 'human':
                player.dexterity += 1
                player.charisma = player.charisma +1
                player.strength = player.strength +1
                player.wisdom = player.wisdom +1
                player.intel = player.intel +1
                player.cons = player.cons +1
                break
                case 'dragonborn':
                player.charisma = player.charisma + 1
                player.strength = player.strength + 2
                break
                case 'gnome':
                player.intel = player.intel + 2
                player.cons = player.cons + 1
                break
            case 'half-orc':
                player.strength = player.strength + 2
                player.cons = player.cons + 1
                break
            case 'tiefling':
                player.charisma = player.charisma + 2
                player.intel = player.intel + 1
                break
        }
}

async function getModifier(x) {
    //if(x >= 10){
    //return((x-10)/2)
    return(Math.floor((x-10)/2))
    //}else{
    //  return(floor((x-10)/2))
    //}
}
//setupmodifiers/skills
async function update_character_sheet(player) {

    write(`Updating character sheet`)

    let strmod = await getModifier(player.strength)
    let dexmod = await getModifier(player.dexterity)
    let conmod = await getModifier(player.cons)
    let intmod = await getModifier(player.intel)
    let wismod = await getModifier(player.wisdom)
    let chamod = await getModifier(player.charisma)

    write(strmod)
//skills
    player.acrobatics.value = 
        dexmod + (player.acrobatics.skill * player.proficiencybonus) 
    player.animal_handling.value = 
        wismod + (player.animal_handling.skill * player.proficiencybonus)
    player.athletics.value = 
        strmod + (player.athletics.skill * player.proficiencybonus)
    player.arcana.value = 
        intmod + (player.arcana.skill * player.proficiencybonus)
    player.deception.value = 
        chamod + (player.deception.skill * player.proficiencybonus)
    player.history.value = 
        intmod + (player.history.skill * player.proficiencybonus)
    player.insight.value = 
        wismod + (player.insight.skill * player.proficiencybonus)
    player.intimidation.value = 
        chamod + (player.intimidation.skill * player.proficiencybonus)
    player.investigation.value = 
        intmod + (player.investigation.skill * player.proficiencybonus)
    player.medicine.value = 
        wismod + (player.medicine.skill * player.proficiencybonus)
    player.nature.value = 
        intmod + (player.nature.skill * player.proficiencybonus)
    player.perception.value = 
        wismod + (player.perception.skill * player.proficiencybonus)
    player.performance.value = 
        chamod + (player.performance.skill * player.proficiencybonus)
    player.persuasion.value = 
        chamod + (player.persuasion.skill * player.proficiencybonus)
    player.religion.value = 
        intmod + (player.religion.skill * player.proficiencybonus)
    player.slight_of_hand.value = 
        dexmod + (player.slight_of_hand.skill * player.proficiencybonus)
    player.stealth.value = 
        dexmod + (player.stealth.skill * player.proficiencybonus)
    player.survival.value = 
        wismod + (player.survival.skill * player.proficiencybonus)

}

async function initialize_player_and_world(player) {
    await initialize_stats(player)
    await initialize_race(player)
    await initialize_class(player)
    write('foo')
    //await initialize_background()
    //await initialize_weapons()
    //await initialize_armor()
    await update_character_sheet(player)
    var newStatCheck = write(player);
    newStatCheck.style.fontSize = "12px";
    return
}

// set interval
function move_monster(world, player, monster){

    // remove old position of monster from the world map
    world[monster.pos[0]][monster.pos[1]] = 0

    let direction = getRandomIntInclusive(1, 4)
    switch (direction){
        case 1:  // up
            if (world[monster.pos[0]-1][monster.pos[1]] != 1) {
                monster.pos[0] = monster.pos[0] - 1
            } 
            break;
        case 2:  //left
            if (world[monster.pos[0]][monster.pos[1] - 1] != 1) {
                monster.pos[1] = monster.pos[1] - 1
            } 
            break;
        case 3:  // down
            if (world[monster.pos[0]+1][monster.pos[1]] != 1) {
                monster.pos[0] = monster.pos[0] + 1
            } 
            break;
        case 4:  //right
            if (world[monster.pos[0]][monster.pos[1] + 1] != 1) {
                    monster.pos[1] = monster.pos[1] + 1
            } 
            break;
    }

    // place monster back on world
    world[monster.pos[0]][monster.pos[1]] = 3
    display_world(world, player, monster)
}

// The main loop that drives everything else
async function main_loop(world, player, monster) {
    display_world(world, player, monster)
    setInterval(() => {
        move_monster(world, player, monster)
    }, 1000)
    //move_monster()
    await initialize_player_and_world(player)
    //display_world()
    // let cmd = 'play'
    // update_world_and_player(cmd)
    // //await play_game()
}

function update_world(world, player, monster){
    // place player
    world[player.pos[0]][player.pos[1]] = 2

    // place monster
    world[monster.pos[0]][monster.pos[1]] = 3
}

async function display_world(world, player, monster) {
    update_world(world, player, monster)
    if(arraysEqual(player.pos,monster.pos)){
        write(`you met the monster!!!`)
    }else{
        writeToPlayfield(
            world.map(rowArray => rowArray.map(x => `<span class="world-block">${x}</span>`).join(' '))
                .join('<br>')
                .replace(/0/g, '<span class="blank">▢</span>')
                .replace(/1/g, '<span class="wall">▦</span>')
                .replace(/2/g, '<span class="me">◎</span>')
                .replace(/3/g, '<span class="monster">◎</span>')
        )
    }
}

function writeToPlayfield(str) {
    document.querySelector('#playfield').innerHTML = str;
}

function setupArrowKeys(onUp, onLeft, onRight, onDown) {
    document.onkeydown = e => {
        switch (e.key) {
            case "ArrowUp":
                onUp(e);
                break;
            case "ArrowLeft":
                onLeft(e);
                break;
            case "ArrowRight":
                onRight(e);
                break;
            case "ArrowDown":
                onDown(e);
                break;
        }
    }
}