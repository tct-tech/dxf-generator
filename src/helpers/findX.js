const findX = (array) => {
    const X = array
        .filter(line => line.trim().startsWith('X'))
        .map(line => {
            const matchResult = line.match(/X(-?\d+(\.\d+)?)/);
            return matchResult ? parseFloat(matchResult[1]) : null;
    });
    return X;
}

export default findX;