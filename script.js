"use strict";

// NOTE: in VSCode, install the "Live Server" extension
// To display the page, press Ctrl-Shift-P and choose "Open with Live Server"
// when googling questions, add "mozilla" to the query
// other sites may be outdated

window.onload = () => {
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

    class Player {
        constructor(level = 1) {
            this.level = level;
            this.exp = 0
            this.gold = 100
            this.hp = `NA`
            this.ac = `NA`

            this.strength = getStat();
            this.intel = getStat();
            this.dexterity = getStat();
            this.cons = getStat();
            this.wisdom = getStat();
            this.charisma = getStat();

            this.race = "NA"
            this.clss = "NA"

            this.acrobatics= 0
            this.animal_handling= 0
            this.arcana=0
            this.athletics=0
            this.deception=0
            this.history=0
            this.insight=0
            this.intimidation=0
            this.investigation=0
            this.medicine=0
            this.nature=0
            this.perception=0
            this.performance=0
            this.persuasion=0
            this.religion=0
            this.slight_of_hand=0
            this.stealth=0
            this.survival=0

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
                    <br>
                    Acrobatics: ${this.acrobatics}<br>
                    Animal Handling: ${this.animal_handling}<br>
                    Arcana: ${this.arcana}<br>
                    Athletics: ${this.athletics}<br>
                    Deception: ${this.deception}<br>
                    History: ${this.history}<br>
                    Insight: ${this.insight}<br>
                    Intimidation: ${this.intimidation}<br>
                    Investigation: ${this.investigation}<br>
                    Medicine: ${this.medicine}<br>
                    Nature: ${this.nature}<br>
                    Perception: ${this.perception}<br>
                    Performance: ${this.performance}<br>
                    Persuasion: ${this.persuasion}<br>
                    Religion: ${this.religion}<br>
                    Slight of Hand: ${this.slight_of_hand}<br>
                    Stealth: ${this.stealth}<br>
                    Survival: ${this.survival}<br>                    
                    `
        }

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

    async function assign_stats(statarr) {

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

    async function initialize_stats() {

        var statarr = await roll_stats();
        await assign_stats(statarr)
    }

    async function initialize_race() {

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

    async function update_character_sheet() {

        write(`Updating character sheet`)

        let strmod = await getModifier(player.strength)
        let dexmod = await getModifier(player.dexterity)
        let conmod = await getModifier(player.cons)
        let intmod = await getModifier(player.intel)
        let wismod = await getModifier(player.wisdom)
        let chamod = await getModifier(player.charisma)

        write(strmod)

        player.acrobatics= dexmod
        player.animal_handling= wismod
        player.athletics= strmod
        player.arcana= intmod
        player.deception= chamod
        player.history= intmod
        player.insight= wismod
        player.intimidation= chamod
        player.investigation= intmod
        player.medicine= wismod
        player.nature= intmod
        player.perception= wismod
        player.performance= chamod
        player.persuasion= chamod
        player.religion= intmod
        player.slight_of_hand= dexmod
        player.stealth= dexmod
        player.survival= wismod

        // player.race = race
        // switch (race){
        //         case 'elf':
        //             player.dexterity = player.dexterity + 2
        //             break
        //         case 'dwarf':
        //             player.cons = player.cons + 2
        //             break
        //     }
        // player.clss = cls
        //     switch (cls){
        //             case 'fighter':
        //                 player.hp = 12
        //                 break
        //             case 'wizard':
        //                 player.hp = 8
        //                 break
        //             case 'rogue':
        //                 player.hp = 10
        //                 break
        //             }
    
    }

    async function initialize_player_and_world() {
        await initialize_stats()
        await initialize_race()
        //await initialize_class()
        //await initialize_weapons()
        //await initialize_armor()
        await update_character_sheet()
        var newStatCheck = write(player);
        newStatCheck.style.fontSize = "12px";
        return
    }


    // The main loop that drives everything else
    async function main_loop() {
        await initialize_player_and_world()
        //await play_game()
    }


    let player = new Player()
    main_loop()
    // test();
}

//main_loop()
