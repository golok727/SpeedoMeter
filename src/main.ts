import "./style.css";
import { SpeedoMeter } from "./speedoMeter";
SpeedoMeter;
const canvas = document.querySelector("[data-canvas]") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let cWidth = canvas.offsetWidth;
let cHeight = canvas.offsetHeight;

canvas.width = cWidth;
canvas.height = cHeight;

function drawBackground(ctx: CanvasRenderingContext2D) {
	ctx.clearRect(0, 0, cWidth, cHeight);
	ctx.fillStyle = "#1a1a1a";
	ctx.fillRect(0, 0, cWidth, cHeight);
	const GRID_SIZE = 20;

	for (let i = 0; i < cHeight; i += GRID_SIZE) {
		for (let j = 0; j < cWidth; j += GRID_SIZE) {
			ctx.beginPath();
			ctx.fillStyle = "#0a0a0a";
			ctx.arc(j, i, 10, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
		}
	}
}

const speedometer = new SpeedoMeter(cWidth / 2, cHeight / 2, ctx);
speedometer.draw(ctx);

function animate() {
	drawBackground(ctx);
	speedometer.update();
	speedometer.draw(ctx);
	requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
	cWidth = canvas.offsetWidth;
	cHeight = canvas.offsetHeight;

	ctx.canvas.width = cWidth;
	ctx.canvas.height = cHeight;

	drawBackground(ctx);
	speedometer.resize(ctx);
	speedometer.setXY(cWidth / 2, cHeight / 2);
	speedometer.draw(ctx);
});
