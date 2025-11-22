// minecraft_renderer.js

let blocks = [];
let blockSize = 10;
let canvas;
let ctx;

function initRenderer(canvasId) {
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext('2d');
}

function setBlockSize(size) {
    blockSize = size;
}

function clearBlocks() {
    blocks = [];
}

function drawBlock(x, y, color) {
    blocks.push({x, y, color});
}

function render() {
    if (blocks.length === 0) {
        canvas.width = 0;
        canvas.height = 0;
        return;
    }

    let min_x = Math.min(...blocks.map(b => b.x));
    let max_x = Math.max(...blocks.map(b => b.x));
    let min_y = Math.min(...blocks.map(b => b.y));
    let max_y = Math.max(...blocks.map(b => b.y));

    let width_blocks = max_x - min_x + 1;
    let height_blocks = max_y - min_y + 1;

    canvas.width = width_blocks * blockSize;
    canvas.height = height_blocks * blockSize;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw blocks
    for (let b of blocks) {
        let ix = b.x - min_x;
        let iy = b.y - min_y;
        let top = canvas.height - (iy + 1) * blockSize;
        ctx.fillStyle = b.color;
        ctx.fillRect(ix * blockSize, top, blockSize, blockSize);
    }

    // Draw grid
    ctx.strokeStyle = 'lightgray';
    ctx.lineWidth = 1;
    for (let i = 0; i <= width_blocks; i++) {
        ctx.beginPath();
        ctx.moveTo(i * blockSize + 0.5, 0);
        ctx.lineTo(i * blockSize + 0.5, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i <= height_blocks; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * blockSize + 0.5);
        ctx.lineTo(canvas.width, i * blockSize + 0.5);
        ctx.stroke();
    }
}