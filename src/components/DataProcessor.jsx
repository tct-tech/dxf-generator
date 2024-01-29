import findZC from "../helpers/findZC";
import findDia from "../helpers/findDia";
import preProcess from "../helpers/preProcess";
import findX from "../helpers/findX";
import findY from "../helpers/findY";
import findSR from "../helpers/findSR";
import updateXY from "../helpers/updateXY";
import mergeArray from "../helpers/mergeArray";
import adjustZC from "../helpers/adjustZC";
import toProgram from "../helpers/toProgram";
import FileSaver from 'file-saver';


const DataProcessor = (props) => {
    
    const processFile = () => {
        if(!props.file){
            alert('Please select a txt file.');
            return;
        }

        // 0. Separate into multiple sections with M25s
        // Format: _file = [['XY', 'XY', 'M01', 'R3M02X0.2', 'M01', 'R4M02Y4'], [], [], []....]
        const _file = preProcess(props.file);

        // 1. ZC
        const ZC = findZC(props.file);

        // 2. Diameter
        const Diameter = findDia(props.file);

        // 3. Extract Data - XY Coordinates, and update with Step and Repeats
        // Format: XYCoordinate = [[[X1, X2, X3...], [Y1, Y2, Y3...]], [], []...]
        // Format: XYCoordinate = [[X1, X2, X3...], [Y1, Y2, Y3...]]
        let XYCoordinate = [];
        for(let i = 0; i < _file.length; i++){
            // 3-1. G93 Coordinates
            let G93Coordinate = [];
            if(_file[i][0][0].startsWith('G93')){
                const G93X = _file[i][0][0].match(/X(-?\d+(\.\d+)?)/);
                const G93Y = _file[i][0][0].match(/Y(-?\d+(\.\d+)?)/);
                G93Coordinate.push(parseFloat(G93X[1]), parseFloat(G93Y[1]));
            }
            
            for(let j = 1; j < _file[i].length; j++){
                // 3-2. XY Coordinates
                let X = findX(_file[i][j]);
                let Y = findY(_file[i][j]);
                if(X.length != Y.length){
                    alert('Coordinate is missing XY value. Make sure all lines of coordinate includes both X and Y.');
                    return;
                }
                
                // 3-3. Step and Repeat
                // Format: SR = [[R1, X or Y, Distance1], [R2, X or Y, Distance2], [...]...]
                const SR = findSR(_file[i][j]); 

                // 3-4. Update XY array with SR
                // Format: _updatedCoor = [[X1, X2, X3, X4...], [Y1, Y2, Y3, Y4...]]
                let _updatedCoor;
                if(SR.length !== 0){
                    _updatedCoor = updateXY(X, Y, SR, G93Coordinate);
                }else{
                    _updatedCoor = [X, Y];
                }
                XYCoordinate.push(_updatedCoor);
            }
        }
        XYCoordinate = mergeArray(XYCoordinate);
        // 3.5 Adjust the XY with ZC
        XYCoordinate = adjustZC(XYCoordinate, ZC);
        console.log(XYCoordinate);
        
        // 6. Create Program for QCAD
        const QCAD = toProgram(XYCoordinate, Diameter);

        // 7. Download Program for DXF
        let blob = new Blob([QCAD], {
            type: "text/plain;charset=utf-8"
        });
        
        FileSaver.saveAs(blob, 'program.js');

    }


    return(
        <>
            <button onClick={() => {processFile()}}>Generate</button>
        </>
    );
}

export default DataProcessor;