const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const fireWidth = canvas.width;
const fireHeight = canvas.height;

const fireColors = [
    "#070707", "#1f0707", "#2f0f07", "#470f07", "#571707", "#671f07", "#771f07",
    "#8f2707", "#9f2f07", "#af3f07", "#bf4707", "#c74707", "#DF4F07", "#DF5707",
    "#DF5707", "#D75F07", "#D75F07", "#D7670F", "#cf6f0f", "#cf770f", "#cf7f0f",
    "#CF8717", "#C78717", "#C78F17", "#C7971F", "#BF9F1F", "#BF9F1F", "#BFA727",
    "#BFA727", "#BFAF2F", "#B7AF2F", "#B7B72F", "#B7B737", "#CFCF6F", "#DFDF9F",
    "#EFEFC7", "#FFFFFF"
];

// 火の強度を格納する配列（全画面サイズ）
let firePixels = new Array(fireWidth * fireHeight).fill(0);

function calculateFirePropagation() {
    for (let x = 0; x < fireWidth; x++) {
        for (let y = 1; y < fireHeight; y++) {
            const src = y * fireWidth + x;
            const dst = (y - 1) * fireWidth + (x + (Math.random() * 3 | 0) - 1);

            firePixels[dst] = Math.max(0, firePixels[src] - (Math.random() * 10 | 0));
        }
    }
}

function renderFire() {
    const imageData = ctx.createImageData(fireWidth, fireHeight);

    for (let i = 0; i < firePixels.length; i++) {
        const colorIndex = firePixels[i];
        const color = fireColors[colorIndex];

        const index = i * 4;
        imageData.data[index] = parseInt(color.slice(1, 3), 16); // R
        imageData.data[index + 1] = parseInt(color.slice(3, 5), 16); // G
        imageData.data[index + 2] = parseInt(color.slice(5, 7), 16); // B
        imageData.data[index + 3] = 255; // Alpha
    }

    ctx.putImageData(imageData, 0, 0);
}

function createFireSource() {
    for (let x = 0; x < fireWidth; x++) {
        firePixels[(fireHeight - 1) * fireWidth + x] = fireColors.length - 1;
    }
}

function gameLoop() {
    calculateFirePropagation();
    renderFire();
    requestAnimationFrame(gameLoop);
}

// 初期化する
createFireSource();
gameLoop();
