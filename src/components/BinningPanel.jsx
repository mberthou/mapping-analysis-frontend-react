import React, { useState, useRef, useEffect } from 'react';


function BinningPanel({parameters, binings}) {
    return (
        <div className="grid-cols-2 gap-2">
            <div className='col-span-full'>Custom Bining</div>
            <div>bin name:</div><div><input id="inputBinName"/></div>
            <div>number of bins</div><div contentEditable="True"></div>
            <div>bin1</div><div><input id="inputBin1"/></div>
            <div>bin2</div><div><input id="inputBin2"/></div>
            <div>bin3</div><div><input id="inputBin3"/></div>
            <div>bin4</div><div><input id="inputBin4"/></div>
            <div>bin5</div><div><input id="inputBin5"/></div>
            <div>bin6</div><div><input id="inputBin6"/></div>
        </div>
    );    
}


export default BinningPanel;