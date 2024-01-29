const adjustZC = (array, ZC) => {
    const resultArray = [];

    for (let i = 0; i < array.length; i++) {
      const subArray = array[i];
      const resultSubArray = [];
  
      for (let j = 0; j < subArray.length; j++) {
        const element = parseFloat(subArray[j]);
        const addition = i === 0 ? ZC[0] : ZC[1];
        const sum = element + addition;
        resultSubArray.push(sum);
      }
  
      resultArray.push(resultSubArray);
    }
  
    return resultArray;
}

export default adjustZC;