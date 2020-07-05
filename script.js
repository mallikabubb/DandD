"use strict";

// NOTE: in VSCode, install the "Live Server" extension
// To display the page, press Ctrl-Shift-P and choose "Open with Live Server"

window.onload = () => {

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    // Replace the index'th element of string s with string c
    function replaceAt(index, s, c){
        return s.substring(0, index) + c + s.substring(index + 1);
    }

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

    function playVideo(url) {
        write(`<video autoplay controls src='${url}'></video>`);
    }

    function playAudio(url) {
        write(`<audio autoplay controls src='${url}'></audio>`);
    }

    function showImage(url) {
        write(`<img src='${url}'>`);
    }

    function write(str) {
        var newParagraph = document.createElement('p');
        newParagraph.innerHTML = str;
        document.querySelector('#rpg-text').appendChild(newParagraph);
        document.querySelector('#rpg-text').scrollTop = document.querySelector('#rpg-text').scrollHeight;
        return newParagraph;
    }

    async function test() {
        write('Enter a video URL (for example, sample.mp4)');
        var videoUrl = await readStr();
        playVideo(videoUrl);
        
        write('Enter an audio URL (for example, sample.mp3)');
        var audioUrl = await readStr();
        playAudio(audioUrl);

        write('Enter an image URL (for example, sampleimg.jpg')
        var imgUrl = await readStr();
        showImage(imgUrl);

        var lastStr = 'got';
        for (var i = 0; i < 10; i++) {
            let justGot = await readStr();
            lastStr += ' ' + justGot;
            var newRowElem = write(lastStr);
            newRowElem.style.fontFamily = 'cursive';
            newRowElem.style.color = justGot;
            newRowElem.style.fontWeight = 'bold';
            newRowElem.style.fontStyle = 'italic';
        }

    }


    class Player {
        constructor(loc = 0, level = 0) {
            this.loc = loc;
            this.level = level
        }

        toString(){
            return `Player Stats:<br>
                    Level: ${this.level}`
        }

    }
    let player = new Player()
    let world = 'xxDxx'
    let status_update = ''

    async function initialize_player_and_world() {
        let satisfied = false
        while (!satisfied){
            write(`Your level: ${player.level}. Happy with your stats (y/n)?`)
            let yesno = await readStr()
            if (yesno == 'y'){
                satisfied = true
            }
            else{
                player.level = getRandomIntInclusive(1, 6) + getRandomIntInclusive(1, 6) + getRandomIntInclusive(1, 6)
            }
        }
        return
    }

    // Show the output for the current command (given the current state of player and world)
    function show_output(cmd) {
        switch (cmd){
        // status commmands: just print out the current state of the world or player
            case 'm':
                let world_copy = replaceAt(player.loc, world,  '*')
                write(world_copy)
                return
            case 'p':
                write(player)
                return
        }
        // action commands
        switch (world[player.loc]) {
            case 'x':
                write('meh. nothing here');
                break;
            case 'D':
                write('HERE BE DRAGONS');
                break;
        }
        write(status_update)
        status_update = ''
        if (player.loc == world.length) {
            write('you won!');
        }
        return
    }

    // Update player and world state. Currently, only player state changes.
    function update_world_and_player(cmd) {
        switch (cmd) {
            case ';': // move Right
                player.loc += 1
                player.level += 1
                break
            case 'k': // move Left
                player.loc -= 1
                player.level += 1
                break
            case 'a': // attack
                if (world[player.loc] == 'D'){
                    if (player.level > 5){
                        replaceAt(player.loc, world, 'd')
                        player.level += 10
                        status_update += 'You slayed the Dragon!\n'
                    }
                    else{
                        // note this dragon only attacks if attacked (may want to change)
                        player.level -= 10
                        status_update += 'The dragon clobbered you!\n'
                    }
                }
                else{
                    status_update('The dragon was already dead.\n')
                }
            // the next two are status read commands; no state update required.
            case 'm': 
            case 'p': 
                break;
            default:
                write(`unknown commmand ${cmd}`)
        }
        if (player.loc < 0) {
            player.loc = 0
        }
    }

    // The main loop that drives everything else
    async function main_loop() {
        await initialize_player_and_world()
        let cmd = 'play'
        write('Enter your command')
        while ((cmd != 'quit') && (player.loc != world.length)) {
            cmd = await readStr()
            update_world_and_player(cmd)
            show_output(cmd)
        }
    }

    main_loop()
    // test();
}

//main_loop()
