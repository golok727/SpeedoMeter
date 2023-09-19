import { lerp, radians } from "./utils";

export class SpeedoMeter {
	x: number;
	y: number;
	vRadius: number;
	private radius = 100;
	private angle = 0;
	constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
		this.x = x;
		this.y = y;
		this.vRadius = 0.3;

		this.radius =
			Math.min(ctx.canvas.offsetWidth, ctx.canvas.offsetHeight) * this.vRadius;
	}

	setXY(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	resize(ctx: CanvasRenderingContext2D) {
		this.radius =
			Math.min(ctx.canvas.offsetWidth, ctx.canvas.offsetHeight) * this.vRadius;
	}
	private speedDots(ctx: CanvasRenderingContext2D) {
		const nCircles = 20;
		const fullAngle = 180;
		const nCirclesFit = fullAngle / nCircles;

		for (let i = 0; i <= fullAngle; i += nCirclesFit) {
			console.log(i);
			ctx.beginPath();
			const angle = radians(i);
			ctx.fillStyle = "#aa0";
			const x = this.x + (this.radius - 20) * Math.cos(angle) * -1;
			const y = this.y + (this.radius - 20) * Math.sin(angle) * -1;

			const angleDiff = Math.abs(radians(this.angle) - angle);

			if (angleDiff < radians(4)) {
				ctx.fillStyle = "#f00"; // Color for dots near this.angle
			} else {
				ctx.fillStyle = "#e1000072"; // Default color for other dots
			}

			ctx.arc(x, y, 4, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
		}
	}

	private drawBg(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = "#0a0a0a";
		ctx.strokeStyle = "#f00";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
	private drawNeedle(ctx: CanvasRenderingContext2D) {
		const needleLength = this.radius - 50;
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#af0000";
		ctx.fillStyle = "#000";
		ctx.lineCap = "round";
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		const x = this.x + needleLength * Math.cos(radians(this.angle)) * -1;
		const y = this.y + needleLength * Math.sin(radians(this.angle)) * -1;
		ctx.lineTo(x, y);

		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.strokeStyle = "#f00";
		ctx.arc(x, y, 5, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.strokeStyle = "#f00";
		ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
		ctx.fillStyle = "#fff";
		ctx.fillText("R", this.x, this.y);
		ctx.font = "bold 20px system-ui";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";

		// ctx.beginPath();
		// ctx.arc();
	}

	draw(ctx: CanvasRenderingContext2D) {
		this.drawBg(ctx);
		this.drawNeedle(ctx);
		this.speedDots(ctx);
	}

	update() {
		let t = 0.008;
		this.angle = lerp(this.angle, 180, t);
		t += 0.01;
	}
}
