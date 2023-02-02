// -----
// color space funcs
import { srlab2rgb, rgb2srlab } from './srlab2.js';
import { oklab2rgb, rgb2oklab } from './oklab.js';
import { rgb2hex } from './rgb2hex.js';

// -----
// tui color
import { Chalk } from 'chalk';

// -----
// command line arguments
import { parse } from 'ts-command-line-args';

interface CliArgs {
    // tup: Number[][];
    hue: Number[];
    saturation: Number[];
    lightness: Number[];

    // per step changes
    hueShift?: Number;
    saturationShift?: Number;
    lightnessShift?: Number

    steps?: Number;

    // help
    help?: boolean;
}

export const args = parse<CliArgs>(
    {
        // tup: {
        //     type: Array[Array[]],
        //     alias: 't',
        //     description: "Hue, saturation, lightness tuple",
        //     multiple: true
        // },

        hue: {
            type: Number,
            alias: 'h',
            description: "Hue range. 0..360",
            multiple: true,
            defaultValue: [0]
        },
        saturation: {
            type: Number,
            alias: 's',
            description: "Initial saturation value. 0..1",
            multiple: true,
            defaultValue: [0.5]
        },
        lightness: {
            type: Number,
            alias: 'l',
            description: "Initial lightness value. 0..1",
            multiple: true,
            defaultValue: [0.5]
        },

        hueShift: {
            type: Number,
            // alias: "sh",
            description: "Hue value change per step. Signed integer.",
            optional: true
        },
        saturationShift: {
            type: Number,
            // alias: "ss",
            description: "Saturation value change per step. Signed integer.",
            optional: true
        },
        lightnessShift: {
            type: Number,
            // alias: "sl",
            description: "Lightness value change per step. Signed integer.",
            optional: true
        },
        steps: {
            type: Number,
            // alias: "st",
            description: "Number of steps to do",
            defaultValue: -1,
            optional: true
        },

        help: {
            type: Boolean,
            // alias: 'h',
            description: "Prints this help info.",
            optional: true
        },
    },
    {
        helpArg: 'help',
        headerContentSections: [{
            header: "glitter",
            content: "The jankiest color palette 'thing'"
        }]
    }
);


args.hue.map ( hue => console.log(hue) );

let chalk = new Chalk;

let output = "Example color";
let color = srlab2rgb(0.5, 0.5, 0.5);
console.log(`${color}`);
console.log(rgb2hex(color[0], color[1], color[2]));

console.log(chalk.bgRgb(color[0], color[1], color[2]).bold(output));