import React from 'react'
import Tr from './Tr'

const Table=({tableData,dispatch})=>{
    return(
        <table >
            {Array(tableData.length).fill().map((tr,i)=>(
            <Tr key={i} rowIndex={i} dispatch={dispatch} rowData={tableData[i]}/>))}
        </table>
    );
};

export default Table;