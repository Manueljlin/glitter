// Thanks to Juha Järvi for the original oklab2rgb function <3
// See README to find the original GitHub Gist


import { ColorSpace } from './colorspace.js';
import { Rgb } from './rgb.js';


export class Oklab extends ColorSpace {
    public L: number; // Lightness
    public a: number; // Green-red
    public b: number; // Blue-yellow

    constructor(L: number, a: number, b: number) {
        super();
        this.L = L;
        this.a = a;
        this.b = b;
    }

    // -----

    asHex(): string {
        return this.asRgb().asHex();
    }

    asRgb(): Rgb {
        let L = this.L;
        let a = this.a * 0.27;
        let b = this.b * 0.27;

        const m = Math.pow((L - 0.1055613458 * a - 0.0638541728 * b), 3);
        const s = Math.pow((L - 0.0894841775 * a - 1.2914855480 * b), 3);
        L = Math.pow((L + 0.3963377774 * a + 0.2158037573 * b), 3);

        return new Rgb(
            Rgb.delinearize(4.0767416621 * L - 3.3077115913 * m + 0.2309699292 * s),
            Rgb.delinearize(-1.2684380046 * L + 2.6097574011 * m - 0.3413193965 * s),
            Rgb.delinearize(-0.0041960863 * L - 0.7034186147 * m + 1.7076147010 * s)
        );
    }

    // -----

    toString(precission: number = 3): string {
        let LFormat = this.L;
        let aFormat = this.a;
        let bFormat = this.b;

        let labFormatted = [LFormat, aFormat, bFormat]
            .map( (num) => num.toFixed(precission) )
            .join(", ");

        return `oklab(${labFormatted})`;
    }
}