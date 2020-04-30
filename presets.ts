
interface IPreset {
    name: string,
    data?: {
        offset?: { x: number, y: number },
        source: Image
    },
    initFn?: (img: Image) => void,
}

const presets: IPreset[] = [
    {
        name: 'Gosper glider gun',
        data: {
            offset: { x: 0, y: 6 },
            source: img`
                . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . . . . . . . . . . 1 . 1 . . . . . . . . . . . . .
                . . . . . . . . . . . . . . 1 1 . . . . . . 1 1 . . . . . . . . . . . . 1 1 . .
                . . . . . . . . . . . . . 1 . . . 1 . . . . 1 1 . . . . . . . . . . . . 1 1 . .
                . . 1 1 . . . . . . . . 1 . . . . . 1 . . . 1 1 . . . . . . . . . . . . . . . .
                . . 1 1 . . . . . . . . 1 . . . 1 . 1 1 . . . . 1 . 1 . . . . . . . . . . . . .
                . . . . . . . . . . . . 1 . . . . . 1 . . . . . . . 1 . . . . . . . . . . . . .
                . . . . . . . . . . . . . 1 . . . 1 . . . . . . . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . 1 1 . . . . . . . . . . . . . . . . . . . . . . . .
            `,
        }
    },
    {
        name: 'R-pentomino',
        data: {
            offset: { x: 17, y: 15 },
            source: img`
                . 1 1
                1 1 .
                . 1 .
            `,
        }
    },
    {
        name: 'Oscillators',
        data: {
            offset: { x: 15, y: 10 },
            source: img`
                1 1 1 . . . . . . . . .
                . . . . . . . . . . . .
                . . . . . . . . . . . .
                . . . . . . . . 1 1 . .
                . . . . . . . . 1 1 . .
                . . . . . . . . . . 1 1
                . . . . . . . . . . 1 1
                . . . . . . . . . . . .
                . . . . . . . . . . . .
                . . 1 1 1 . . . . . . .
                . 1 1 1 . . . . . . . .
            `,
        }
    },
    {
        name: 'Bigger oscillators',
        data: {
            offset: { x: 4, y: 4 },
            source: img`
                . . . . . . . . . . . . . . . . . . . . . 1 . . . . . 1 .
                . . . . . . . . . . . . . . . . . . . . 1 . 1 . . . 1 . 1
                . . 1 1 1 . . . 1 1 1 . . . . . . . . . 1 . . 1 . 1 . . 1
                . . . . . . . . . . . . . . . . . . . . . . 1 . . . 1 . .
                1 . . . . 1 . 1 . . . . 1 . . . . . . . . . 1 1 . 1 1 . .
                1 . . . . 1 . 1 . . . . 1 . . . . . . . . . . . . . . . .
                1 . . . . 1 . 1 . . . . 1 . . . . . . . . . . . . . . . .
                . . 1 1 1 . . . 1 1 1 . . . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                . . 1 1 1 . . . 1 1 1 . . . . . . . . . . . . . . . . . .
                1 . . . . 1 . 1 . . . . 1 . . . . . . . . . . . . . . . .
                1 . . . . 1 . 1 . . . . 1 . . . . . . . . . . . . . . . .
                1 . . . . 1 . 1 . . . . 1 . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                . . 1 1 1 . . . 1 1 1 . . . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . . . . . . . 1 . . . . 1 . .
                . . . . . . . . . . . . . . . . . . . 1 1 . 1 1 1 1 . 1 1
                . . . . . . . . . . . . . . . . . . . . . 1 . . . . 1 . .
            `,
        }
    },
    {
        name: 'Spaceships',
        data: {
            offset: { x: 2, y: 2 },
            source: img`
                . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . 1
                . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . .
                . . 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . 1
                1 1 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 1 .
            `,
        }
    },
    {
        name: 'Random 30',
        initFn: (img) => {
            for (let y = 0; y < rowCount; y++) {
                for (let x = 0; x < columnCount; x++) {
                    if (Math.percentChance(30)) {
                        fillCell(img, x, y);
                    }
                }
            }
        }
    },
    {
        name: 'Blank',
        data: {
            source: image.create(0, 0)
        }
    }
];

function initFromPreset(presetIndex: number) {
    const { initFn, data } = presets[presetIndex];
    const fromPreset = image.create(scene.screenWidth(), scene.screenHeight());

    if (initFn) {
        initFn(fromPreset);
    } else if (data) {
        const { offset, source } = data;
        const offsetX = offset ? offset.x : 0;
        const offsetY = offset ? offset.y : 0;
        
        for (let y = 0; y < source.height; y++) {
            for (let x = 0; x < source.width; x++) {
                if (source.getPixel(x, y) === 1) {
                    fillCell(fromPreset, offsetX + x, offsetY + y);
                }
            }
        }
    }

    scene.setBackgroundImage(fromPreset);
}
