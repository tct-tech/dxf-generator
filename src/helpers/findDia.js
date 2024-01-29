const findDia = (array) => {
    const lineDia = array.find(line => line.startsWith('T'));
    const matchResult = lineDia.match(/C(-?\d+(\.\d+)?)/);
    const numericValue = matchResult ? parseFloat(matchResult[1]) : null;
    return numericValue;
}

export default findDia;