
const cellSize = 4;
const columnCount = scene.screenWidth() / cellSize;
const rowCount = scene.screenHeight() / cellSize;

function tickSimulation() {
    const nextGeneration = image.create(scene.screenWidth(), scene.screenHeight());

    for (let y = 0; y < rowCount; y++) {
        for (let x = 0; x < columnCount; x++) {
            const neighborCount = 
                score(x - 1, y - 1) + score(x, y - 1) + score(x + 1, y - 1) +
                score(x - 1, y) + score(x + 1, y) +
                score(x - 1, y + 1) + score(x, y + 1) + score(x + 1, y + 1);

            const currentCell = score(x, y);
            const nextGenerationCellIsAlive =
                (currentCell && (neighborCount === 2 || neighborCount === 3)) ||
                (!currentCell && neighborCount === 3);
            
            if (nextGenerationCellIsAlive) {
                fillCell(nextGeneration, x, y);
            }
        }
    }

    scene.setBackgroundImage(nextGeneration);
}

function score(x: number, y: number) {
    // getPixel already does bounds checking and returns zero if the pixel is outside of image bounds
    return scene.backgroundImage().getPixel(x * cellSize, y * cellSize) !== 0 ? 1 : 0;
}

function fillCell(image: Image, x: number, y: number, color?: number) {
    const isOnBoundary = x === 0 || x === columnCount - 1 || y === 0 || y === rowCount - 1;
    const fillColor = color !== undefined ?
        color :
        isOnBoundary ?
            5 : 1;
    image.fillRect(x * cellSize, y * cellSize, cellSize, cellSize, fillColor);
}
