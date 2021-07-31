import React,{useEffect,useReducer,useCallback} from 'react'
import Table from './Table'

export const SET_WINNER ='SET_WINNER';
export const CLICK_CELL='CLICK_CELL';
export const SET_TURN='SET_TRUN';
export const RESET ='RESET'
const initialState={ 
    winner:'',
    turn:'o',
    tableData:[
        ['','',''],
        ['','',''],
        ['','','']],
    recentCell:[-1,-1]
};

const reducer=(state,action)=>{
    console.log(action.type)
    switch(action.type){
        case SET_WINNER:
            //state.winner = action.winner 이렇게 하면 안됨
            return {
                ...state,
                winner:action.winner
            }//state 객체를 얕은 복사를 해주고 winner 요소만 바꿔줌
        case CLICK_CELL:{
            let tableData = [...state.tableData];
            tableData[action.row]=[...tableData[action.row]];
            tableData[action.row][action.cell]=state.turn;
            return{
                ...state,
                tableData,
                recentCell:[action.row,action.cell],
            };
        }
        case SET_TURN:{
            const row = state.row;
            return{
                ...state,
                turn:state.turn==='o'?'x':'o',
            };
        }
        case RESET:{
            return{
                ...state,
                turn:'o',
                tableData:[
                    ['','',''],
                    ['','',''],
                    ['','',''],
                ],
                recentCell:[-1,-1],
            }
        }
        default:
            return state;
    }
}

const TicTacToe=()=>{
    const [state,dispatch] = useReducer(reducer,initialState) 
    const {tableData,turn,winner,recentCell} = state;

    const onClickTable = useCallback(()=>{
        //dispatch 내부엔 action 객체가 들어감
        dispatch({type:SET_WINNER,winner:'o'})
    },[])

    useEffect(()=>{
        console.log('useEffect');
        const [row,cell]=recentCell;
        console.log(recentCell);
        if(row<0){
            //dispatch({type:SET_WINNER,winner:''});
            return;
        }
        let win =false;
        if(tableData[row][0]===turn && tableData[row][1]==turn && tableData[row][2]===turn){
            win=true;            
        }
        if(tableData[0][cell]===turn && tableData[1][cell]==turn && tableData[2][cell]===turn){
            win=true;            
        }
        if(tableData[0][0]===turn && tableData[1][1]==turn && tableData[2][2]===turn){
            win=true;            
        }
        if(tableData[0][2]===turn && tableData[1][1]==turn && tableData[2][0]===turn){
            win=true;            
        }
        if(win){
            dispatch({type:SET_WINNER,winner:turn});
            dispatch({type:RESET});
        }else{
            let all=true;
            tableData.forEach((row)=>{
                row.forEach((cell)=>{
                    if(!cell){all=false;}
                })
            })
            if(!all){
                dispatch({type:SET_TURN});
            }else {
                dispatch({type:RESET});
            }
        }
    },[recentCell]);

    return(
        <>
            <Table dispatch={dispatch} tableData={tableData}/>
            {state.winner &&<div>{winner}의 승리</div>}
        </>
    )
}

export default TicTacToe;