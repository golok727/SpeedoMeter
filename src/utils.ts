export const radians = (degrees: number) => {
	return (degrees * Math.PI) / 180;
};
export const lerp = (a: number, b: number, t: number) => {
	return a + (b - a) * t;
};
