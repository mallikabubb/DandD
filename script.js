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
            getRandomIntInclusive(2, 6),
            getRandomIntInclusive(2, 6)]
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

            this.race = "NA";
            this.clss = "NA"
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

        let races = ['human','elf','dwarf','halfling', 'dragonborn']
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
                        player.dexterity = player.dexterity + 1
                        player.charisma = player.charisma +1
                        player.strength = player.strength +1
                        player.wisdom = player.wisdom +1
                        player.intel = player.intel +1
                        player.cons = player.cons +1
                        break
                 case 'dragonborn':
                        player.charisma = player.charisma + 1
                        player.strength = player.strenght + 2
                        break
            }
    }

    async function update_character_sheet() {

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
        //await update_character_sheet()
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
