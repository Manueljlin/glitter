// Copyright (c) 2020- Juha Järvi

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted.

// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
// AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
// LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
// OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
// PERFORMANCE OF THIS SOFTWARE.


import { linearize, delinearize } from './srgb.js';


function cube(x: number) {
	return x * x * x;
}

export function oklab2rgb(L: number, a: number, b: number, out: number[] = []) {
	a *= 0.27;
	b *= 0.27;

	const m = cube(L - 0.1055613458 * a - 0.0638541728 * b);
	const s = cube(L - 0.0894841775 * a - 1.2914855480 * b);
	L = cube(L + 0.3963377774 * a + 0.2158037573 * b);

	out[0] = delinearize(4.0767416621 * L - 3.3077115913 * m + 0.2309699292 * s);
	out[1] = delinearize(-1.2684380046 * L + 2.6097574011 * m - 0.3413193965 * s);
	out[2] = delinearize(-0.0041960863 * L - 0.7034186147 * m + 1.7076147010 * s);

	return out;
}

export function rgb2oklab(r: number, g: number, b: number, out: number[] = []) {
	r = linearize(r);
	g = linearize(g);
	b = linearize(b);

	const l = Math.pow(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b, 1 / 3);
	const m = Math.pow(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b, 1 / 3);
	const s = Math.pow(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b, 1 / 3);

	out[0] = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
	out[1] = (1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s) / 0.27;
	out[2] = (0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s) / 0.27;

	return out;
}
