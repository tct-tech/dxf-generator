const groupG93 = (inputArray) => {
    const resultArray = [];
    let currentGroup = [];
  
    for (const elementArray of inputArray) {
      if (elementArray[0] && elementArray[0].startsWith('G93')) {
        if (currentGroup.length > 0) {
          resultArray.push(currentGroup);
        }
        currentGroup = [elementArray];
      } else {
        currentGroup.push(elementArray);
      }
    }
  
    if (currentGroup.length > 0) {
      resultArray.push(currentGroup);
    }
  
    return resultArray;
  };

export default groupG93;