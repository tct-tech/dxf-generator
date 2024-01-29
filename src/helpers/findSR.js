const findSR = (array) => {
    let SR = array.map(line => {
        const matchResult1 = line.match(/R(\d+)M02([XY])(-?\d+(\.\d+)?)/);
        const matchResult2 = line.match(/R(\d+)([XY])(-?\d+(\.\d+)?)/);
        if (matchResult1) {
          const rValue = parseInt(matchResult1[1]);
          const xyType = matchResult1[2];
          const numericValue = parseFloat(matchResult1[3]);
          return [rValue, xyType, numericValue];
        }else if(matchResult2){
          const rValue = parseInt(matchResult2[1]) + 1;
          const xyType = matchResult2[2];
          const numericValue = parseFloat(matchResult2[3]);
          return [rValue, xyType, numericValue];
        }
        return null;
    }).filter(Boolean);
    return SR;
}

export default findSR;