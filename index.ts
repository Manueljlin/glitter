import { Rgb } from './colorspaces/rgb.js';
import { Oklab } from './colorspaces/oklab.js';
import { Srlab } from './colorspaces/srlab2.js';

import { Chalk } from 'chalk';

import { parse } from 'ts-command-line-args';


interface CliArgs {
    // tup: Number[][];
    hue: Number[];
    saturation: Number[];
    lightness: Number[];

    // per step changes
    hueShift?: Number;
    saturationShift?: Number;
    lightnessShift?: Number;

    steps?: Number;

    // ""help""
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

        // colorspace: {
            
        // },

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


//_____________________________________________________________________________

let chalk = new Chalk;

// args.hue.map ( hue => console.log(hue) );

let colors: Oklab[] = [];

for (let i = -1; i <= 1; i += 0.005) {
    colors.push(new Oklab(0.5, i, i));
}

let vpad = 0;
let hpad = 6;

for (const color of colors) {
    if (color.asHex().length == 7 && !color.asHex().includes('-')) {
        let fgColor = (color.L >= 0.6) ? "#000" : "#FFF";
        let linesToOutput: string[] = [
            color.toString(),
            // color.asHex().toString()
        ];

        let targetLength: number = Math.max(...linesToOutput.map( (line) => line.length ))
        // console.log(targetLength.toString());

        for (let _ = 0; _ < vpad; _++) {
            linesToOutput.unshift(" ");
            linesToOutput.push(" ");
        }

        linesToOutput.forEach( (line, i) => {
            while (line.length < targetLength) {
                line += " ";
            }

            for (let _ = 0; _ < hpad; _++) {
                line = " " + line + " ";
            }

            linesToOutput[i] = line;
        });

        for (const line of linesToOutput) {
            console.log(
                chalk
                    .hex(fgColor)
                    .bgHex(color.asHex())
                    .bold(line)
            );
        }
    }
}