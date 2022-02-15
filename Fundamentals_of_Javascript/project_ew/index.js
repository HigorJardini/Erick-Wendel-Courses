
import Screen     from "./src/controller/screen.js";
import MemoryGame from "./src/controller/memory_game.js";
import Formation  from "./src/controller/formation.js";

function onLoad() {
    const dependencies = {
        screen:    Screen,
        formation: Formation
    };

    const memoryGame = new MemoryGame(dependencies);
    memoryGame.init();
}

window.onload = onLoad;