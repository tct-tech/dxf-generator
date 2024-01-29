const findY = (array) => {
    const Y = array
        .filter(line => line.trim().startsWith('X'))
        .map(line => {
            const matchResult = line.match(/Y(-?\d+(\.\d+)?)/);
            return matchResult ? parseFloat(matchResult[1]) : null;
    });
    return Y;
}

export default findY;