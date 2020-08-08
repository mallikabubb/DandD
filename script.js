"use strict";

// NOTE: in VSCode, install the "Live Server" extension
// To display the page, press Ctrl-Shift-P and choose "Open with Live Server"
// when googling questions, add "mozilla" to the query
// other sites may be outdated

// Global constants
const SKILLS_LIST = [
    'acrobatics',      // 0
    'animal_handling', // 1
    'arcana',          // 2
    'athletics',       // 3
    'deception',       // 4
    'history',         // 5
    'insight',         // 6
    'intimidation',    // 7
    'investigation',   // 8
    'medicine',        // 9
    'nature',          // 10
    'perception',      // 11
    'performance',     // 12
    'persuasion',      // 13
    'religion',        // 14
    'sleight_of_hand', // 15
    'stealth',         // 16
    'survival'         // 17
]

window.onload = () => {
    let player = new Player()
    let monster = new Monster()
    let diameter = 15
    let world = new Array(diameter)



    for (let i = 0; i < world.length; i++) {
        world[i] = new Array(diameter).fill(0)
        world[i][0] = 1
        world[i][diameter - 1] = 1
    }
    world[4][8] = 1
    world[5][8] = 1
    world[6][8] = 1
    world[6][9] = 1
    world[4][7] = 1
    world[4][6] = 1
    world[4][8] = 1
    world[10][2] = 1
    world[3][9] = 1
    world[10][3] = 1
    world[10][4] = 1
    world[10][5] = 1
    world[11][5] = 1
    world[1][1] = 1
    world[2][1] = 1
    world[3][1] = 1
    world[7][8] = 1
    world[4][7] = 1
    world[4][9] = 1
    world[4][10] = 1
    world[4][8] = 1
    world[11][3] = 1
    world[12][3] = 1
    world[13][3] = 1
    world[14][3] = 1
    world[14][4] = 1
    world[3][3] = 1
    world[3][2] = 1
    world[9][13] = 1
    world[9][14] = 1
    world[9][10] = 1
    world[9][11] = 1
    world[9][12] = 1
    world[14][3] = 1
    world[13][3] = 1
    world[10][3] = 1
    world[11][3] = 1
    world[10][4] = 1
    world[10][5] = 1
    world[10][6] = 1
    world[2][5] = 1
    world[3][5] = 1
    world[4][5] = 1
    world[4][6] = 1
    world[4][7] = 1
    world[4][8] = 1
    world[4][9] = 1
    world[5][9] = 1
    world[6][9] = 1
    world[3][7] = 1
    world[4][7] = 1
    world[2][7] = 1

    // set up perimeter
    world[0].fill(1)
    world[world.length - 1].fill(1)

    update_world(world, player, monster)


    setupArrowKeys(
        (e) => { // onUp
            //player.pos[0] = Math.max(player.pos[0] - 1, 0)
            if (world[player.pos[0] - 1][player.pos[1]] != 1) {
                world[player.pos[0]][player.pos[1]] = 0
                player.pos[0] = player.pos[0] - 1
                world[player.pos[0]][player.pos[1]] = 2
            }
            display_world()
        },
        (e) => { //onLeft
            //player.pos[1] = Math.max(player.pos[1] - 1, 0)
            if (world[player.pos[0]][player.pos[1] - 1] != 1) {
                world[player.pos[0]][player.pos[1]] = 0
                player.pos[1] = player.pos[1] - 1
                world[player.pos[0]][player.pos[1]] = 2
            }
            display_world()
        },
        (e) => { //onRight
            //player.pos[1] = Math.min(player.pos[1] + 1, world[0].length)
            if (world[player.pos[0]][player.pos[1] + 1] != 1) {
                world[player.pos[0]][player.pos[1]] = 0
                player.pos[1] = player.pos[1] + 1
                world[player.pos[0]][player.pos[1]] = 2
            }
            display_world()

        },
        (e) => { //onDown
            //player.pos[0] = Math.min(player.pos[0] + 1, world.length)
            if (world[player.pos[0] + 1][player.pos[1]] != 1) {
                world[player.pos[0]][player.pos[1]] = 0
                player.pos[0] = player.pos[0] + 1
                world[player.pos[0]][player.pos[1]] = 2
            }
            display_world()

        }
    )

    main_loop(world, player, monster)
    // test();
}

//main_loop()
