import React,{useState,useRef,useCallback,useMemo,useEffect} from 'react';
import Ball from './Ball'

function getWinNumbers(){
    console.log("getWinNumbers");
    const candidate = Array(45).fill().map((v,i)=>{return i+1;});
    const shuffle= [];
    while(candidate.length>0){
        shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length-1];
    const winNumbers=shuffle.slice(0,6).sort((p,c)=>p-c);
    console.log(winNumbers);
    return [...winNumbers,bonusNumber]
}

const Rotto =()=>{
    let rottoNums=useMemo(()=>getWinNumbers(),[]);
    let [winNumbers,setWinNumbers]=useState(rottoNums);
    let [winBalls,setWinBalls]=useState([]);
    let [bonus,setBonus]=useState(null);
    let [redo,setRedo]=useState(false);

    let timeouts = useRef([]);

    useEffect(()=>{
        for(let i=0;i<winNumbers.length-1;i++){
            timeouts.current[i]=setTimeout(()=>{
                setWinBalls((prevWinBalls)=>[...prevWinBalls,winNumbers[i]])
            },(i+1)*1000);
        }
        timeouts.current[6]=setTimeout(()=>{
            setBonus(winNumbers[6]);
            setRedo(true)
        },7000)
        console.log("useEffect");
    },[timeouts.current])
    
    const onClickRedo=useCallback(()=>{
        console.log("useCallBack");
        setWinNumbers(getWinNumbers());
        console.log(winNumbers);
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current=[];
    },[winNumbers])
    
    return(
        <>
            <div>당첨숫자</div>
            <div id="result">
                {winBalls.map(v=><Ball key={v} number={v}/>)}
            </div>
            <div>보너스</div>
            {bonus && <Ball number={bonus}/>}
            {redo&&<button onClick={redo?onClickRedo:()=>{}}>한번더!</button>}
        </>
    );
}



export default Rotto;