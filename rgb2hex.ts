// from https://css-tricks.com/converting-color-spaces-in-javascript/

export function rgb2hex(r: Number, g: Number, b: Number) {
    let rHex = r.toString(16);
    let gHex = g.toString(16);
    let bHex = b.toString(16);

    [rHex, gHex, bHex]
        .map( hex => hex.length === 1 ? hex = "0" + hex : hex );

    return "#" + rHex + gHex + bHex;
}