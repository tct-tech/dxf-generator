import removeEmptyElements from "./removeEmptyElements";
import groupG93 from "./groupG93";

const preProcess = (array) => {
    // Remove '\r' from each element and filter out empty elements
    let modifiedArray1 = array.filter(element => element !== '\r').map(element => element.replace('\r', ''));
    
    // Add M25s after M08
    const _modifiedArray2 = modifiedArray1.map((element) => {
      if (element === 'M08') {
        return [element, 'M25'];
      } else {
        return element;
      }
    });
    // Flatten the Array to get a single-dimensional array
    const modifiedArray2 = _modifiedArray2.flat();

    // Add M25s 2 elements before R1X123
    for (let i = 0; i < modifiedArray2.length; i++) {
      if (modifiedArray2[i].startsWith('R') && !modifiedArray2[i].includes('M02')) {
        modifiedArray2.splice(i-1, 0, 'M25');
        i++; // Increment i to skip the next element, as we have just added 'M25' before the current element
      }
    }

    // Separate the Program into segments using M25
    let result = [];
    let currentContent = [];
    let startPoint = false;

    for (const line of modifiedArray2) {
      if(line.startsWith('G93')){
        result.push(currentContent);
        startPoint = false;
        currentContent = [];
        result.push([line]);
      }
      if (line === 'M25') {
        result.push(currentContent);
        startPoint = true;
        currentContent = [];
      } else if (line === 'M30'){
        result.push(currentContent);
      } else if (startPoint) {
        currentContent.push(line.trim());
      }
    }
    result = removeEmptyElements(result);
    result = groupG93(result);

    return result;
}

export default preProcess;