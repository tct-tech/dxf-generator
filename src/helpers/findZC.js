const findZC = (array) => {
    const lineZC = array.find(line => line.includes('ZC'));
    const matchX = lineZC.match(/X(-?\d+(\.\d+)?)/);
    const matchY = lineZC.match(/Y(-?\d+(\.\d+)?)/);
    const xValue = matchX ? parseFloat(matchX[1]) : 0;
    const yValue = matchY ? parseFloat(matchY[1]) : 0;
    return [xValue, yValue];
}

export default findZC;