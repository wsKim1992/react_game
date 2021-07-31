import React,{useRef,useEffect,useState} from 'react';

const rspCoords={
    바위:'0',
    가위:'-142px',
    보:'-284px'
}

const scores={
    바위:1,
    가위:0,
    보:-1
}

const computerChoice=(imgCoord)=>{
    return Object.entries(rspCoords).find(function(v){
        return v[1]===imgCoord;
    })[0];
};

const RSP=()=>{
    const [result,setResult]=useState('');
    const [imgCoord,setImgCoord]=useState(rspCoords.바위);
    const [score,setScore]=useState(0);
    
    const interval=useRef();
    useEffect(()=>{//componentDidMount,componentDidUpdate 역할
        console.log('다시실행');
        interval.current = setInterval(changeHand,100);
        return()=>{//componentDidUnmount 역할
            clearInterval(interval.current);
            console.log("종료");
        }
    },[imgCoord])
    const changeHand=()=>{
        //const {imgCoord}=this.state;
        console.log(imgCoord);
        if(imgCoord==rspCoords.바위){
            setImgCoord(rspCoords.가위)
        }else if(imgCoord==rspCoords.가위){
            setImgCoord(rspCoords.보);
        }else if(imgCoord===rspCoords.보){
            setImgCoord(rspCoords.바위);
        }
    }
    
    //(부모에 의해서 제거되기 직전)component가 제거되기 직전 componentWillUnmount()가 실행됨..
    
    
    const onClickBtn=(choice)=>{
        clearInterval(interval.current);
        const myscore = scores[choice];
        const cpuscore= scores[computerChoice(imgCoord)];
        const diff = myscore-cpuscore;
        if(diff===0){
            setResult('draw');
        }else if([-1,2].includes(diff)){
            setResult('win');
            setScore((prevScore)=>{
                return prevScore+1;
            })
        }else{
            setResult('lose');
            setScore((prevScore)=>{
                return prevScore-1;
            })
        }
        setTimeout(()=>{interval.current=setInterval(changeHand,100)},2000);
    }

    return(
        <>
            <div id="computer" style={{background:'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0'}}/>
            
            <div>
                <button id="rock" className='btn' onClick={()=>{onClickBtn('바위')}}>바위</button>
                <button id="scissor" className='btn' onClick={()=>{onClickBtn('가위')}}>가위</button>
                <button id="papaer" className='btn' onClick={()=>{onClickBtn('보')}}>보</button>
            </div>
            <div>{result}</div>
            <div>현재{score}점</div>
        </>
    );
}

export default RSP;