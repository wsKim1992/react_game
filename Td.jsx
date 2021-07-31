import React,{useCallback,memo} from 'react';
import {CLICK_CELL} from './TicTacToe';

const Td=memo(({dispatch,rowIndex,cellIndex,cellData})=>{
    console.log("td");
    const onClickTd=useCallback(()=>{
        if(cellData){return ;}

        console.log(rowIndex+" , "+cellIndex);
        dispatch({type:CLICK_CELL,row:rowIndex,cell:cellIndex});
    },[])

    return(
        <td onClick={onClickTd}>{cellData}</td>
    )
})

export default Td;