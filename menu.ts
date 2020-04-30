const menuXPadding = 12;
const menuYPadding = 2;
const menuItemHeight = image.font8.charHeight + menuYPadding;

controller.menu.onEvent(ControllerButtonEvent.Pressed, showMenu);

function showMenu() {
    game.pushScene();

    const s = sprites.create(img`
        . . . . .
        1 1 . . .
        1 1 1 1 .
        1 1 1 1 1
        1 1 1 1 .
        1 1 . . .
        . . . . .
    `);
    s.left = 4;
    updateMenuCursorPosition(s, selectedTemplate);

    for (let presetIndex = 0; presetIndex < presets.length; presetIndex++) {
        const { name } = presets[presetIndex];
        scene.backgroundImage().print(name, menuXPadding, menuYPadding + presetIndex * menuItemHeight, 1, image.font8);
    }

    controller.down.onEvent(ControllerButtonEvent.Pressed, function() {
        selectedTemplate = Math.min(selectedTemplate + 1, presets.length - 1);
        updateMenuCursorPosition(s, selectedTemplate);
    });
    
    controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
        selectedTemplate = Math.max(selectedTemplate - 1, 0);
        updateMenuCursorPosition(s, selectedTemplate);
    });

    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        settings.writeNumber("selectedTemplate", selectedTemplate);
        setIsRunning(false);
        game.popScene();
        initFromPreset(selectedTemplate);
    });

    controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
        selectedTemplate = settings.readNumber("selectedTemplate") || 0;
        game.popScene();
    });

    // oddly couldn't get closure / captured variables to work here...
    function updateMenuCursorPosition(cursor: Sprite, index: number) {
        cursor.top = menuYPadding + index * menuItemHeight;
    }
}
