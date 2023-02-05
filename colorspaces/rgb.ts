// Thanks to Juha Järvi for the original rgb2oklab, rgb2srlab functions <3
// See README to find the original GitHub Gist


import { ColorSpace } from './colorspace.js';
import { Oklab } from './oklab.js';
import { Srlab } from './srlab2.js';


export class Rgb extends ColorSpace {
    public red: number;
    public green: number;
    public blue: number;

    constructor(red: number, green: number, blue: number) {
        super();
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    // -----

    asHex(): string {
        // from https://css-tricks.com/converting-color-spaces-in-javascript/
        let rHex: string = this.red.toString(16);
        let gHex: string = this.green.toString(16);
        let bHex: string = this.blue.toString(16);

        return "#" + [rHex, gHex, bHex]
            .map( (hex: string) => hex.length === 1 ? hex = "0" + hex : hex )
            .join("");
    }

    asOklab(): Oklab {
        let r = Rgb.linearize(this.red);
        let g = Rgb.linearize(this.green);
        let b = Rgb.linearize(this.blue);

        const l = Math.pow(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b, 1 / 3);
        const m = Math.pow(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b, 1 / 3);
        const s = Math.pow(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b, 1 / 3);

        return new Oklab(
            0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
            (1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s) / 0.27,
            (0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s) / 0.27
        );
    }

    asSrlab(): Srlab {
        let r = Rgb.linearize(this.red);
        let g = Rgb.linearize(this.green);
        let b = Rgb.linearize(this.blue);

        const x = Srlab.root(0.32053 * r + 0.63692 * g + 0.04256 * b);
        const y = Srlab.root(0.161987 * r + 0.756636 * g + 0.081376 * b);
        const z = Srlab.root(0.017228 * r + 0.10866 * g + 0.874112 * b);

        return new Srlab(
            0.37095 * x + 0.629054 * y - 0.000008 * z,
            6.634684 * x - 7.505078 * y + 0.870328 * z,
            0.639569 * x + 1.084576 * y - 1.724152 * z
        );
    }

    // -----

    toString(): string {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }

    // -----

    static fromHex(hex: string): Rgb | null {
        // from https://stackoverflow.com/a/5624139
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ? new Rgb(
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ) : null;
    }

    // -----

    static linearize(x: number) {
        x /= 255;

        return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    }

    static delinearize(x: number) {
        x = x <= 0.0031308 ? x * 12.92 : Math.pow(x, 1 / 2.4) * 1.055 - 0.055;

        return Math.round(x * 255);
    }
}