
let selectedTemplate = settings.readNumber("selectedTemplate") || 0;
let isRunning = false;
let isFilling = false;

let cursorX = 1;
let cursorY = 1;

const cursor = sprites.create(img`
    9 9 9 9
    9 . . 9
    9 . . 9
    9 9 9 9
`);
updateCursor();

bindControllerDirectionToCursorMovement(controller.up, 0, -1);
bindControllerDirectionToCursorMovement(controller.down, 0, 1);
bindControllerDirectionToCursorMovement(controller.left, -1, 0);
bindControllerDirectionToCursorMovement(controller.right, 1, 0);

controller.A.onEvent(ControllerButtonEvent.Pressed, toggleCell);
controller.B.onEvent(ControllerButtonEvent.Pressed, toggleIsRunning);

game.onUpdateInterval(100, function () {
    if (isRunning) {
        tickSimulation();
    }
});

initFromPreset(selectedTemplate);

function bindControllerDirectionToCursorMovement(button: controller.Button, xChange: number, yChange: number) {
    const moveCursor = () => {
        if (isRunning) {
            return;
        }

        cursorX = Math.clamp(0, columnCount - 1, cursorX + xChange);
        cursorY = Math.clamp(0, rowCount - 1, cursorY + yChange);
        updateCursor();

        if (controller.A.isPressed()) {
            fillCell(scene.backgroundImage(), cursorX, cursorY, isFilling ? undefined : 0);
        }
    }

    button.onEvent(ControllerButtonEvent.Pressed, moveCursor);
    button.onEvent(ControllerButtonEvent.Repeated, moveCursor);
}

function updateCursor() {
    cursor.top = cursorY * cellSize;
    cursor.left = cursorX * cellSize;
}

function toggleCell() {
    if (isRunning) {
        return;
    }

    const isCellAlive = !!score(cursorX, cursorY);
    isFilling = !isCellAlive;
    fillCell(scene.backgroundImage(), cursorX, cursorY, isFilling ? undefined : 0);
}

function toggleIsRunning() {
    setIsRunning(!isRunning);
}

function setIsRunning(newIsRunning: boolean) {
    isRunning = newIsRunning;
    cursor.setFlag(SpriteFlag.Invisible, isRunning);
}

