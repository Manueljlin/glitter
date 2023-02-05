// Thanks to Juha Järvi for the original srlab2hex function <3
// See README to find the original GitHub Gist


import { ColorSpace } from './colorspace.js';
import { Rgb } from './rgb.js';


export class Srlab extends ColorSpace {
    public L: number; // Lightness   -- 0..1
    public a: number; // Green-red   -- -1..1
    public b: number; // Blue-yellow -- -1..1

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
        let L = this.L * 100;

        const x = Srlab.cube(L + 9.04127 * this.a + 4.56344 * this.b);
        const y = Srlab.cube(L - 5.33159 * this.a - 2.69178 * this.b);
        const z = Srlab.cube(L - 58 * this.b);

        return new Rgb(
            Rgb.delinearize(5.435679 * x - 4.599131 * y + 0.163593 * z),
            Rgb.delinearize(-1.16809 * x + 2.327977 * y - 0.159798 * z),
            Rgb.delinearize(0.03784 * x - 0.198564 * y + 1.160644 * z)
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

        return `srlab(${labFormatted})`;
    }

    // -----

    static cube(x: number): number {
        if(x <= 8) return x * 27 / 24389;

        x = (x + 16) / 116;
        return x * x * x;
    }

    static root(x: number): number {
        return x <= 216 / 24389 ? x * 24389 / 2700 : 1.16 * Math.pow(x, 1 / 3) - 0.16;
    }
}