import React,{Component} from 'react';
import Ball from './Ball'

function getWinNumbers(){
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

class Rotto extends Component{
    state={
        winNumbers:getWinNumbers(),
        winBalls:[],
        bonus:null,
        redo:false,
    }
    timeouts=[];
    runTimeouts=()=>{
        for(let i=0;i<this.state.winNumbers.length-1;i++){
            this.timeouts[i]=setTimeout(()=>{
                this.setState((prevState)=>{
                    return{
                        winBalls:[...prevState.winBalls,this.state.winNumbers[i]]
                    }
                })
            },(i+1)*1000);
        }
        this.timeouts[6]=setTimeout(()=>{
            this.setState({
                bonus:this.state.winNumbers[6],
                redo:true
            })
        },7000)
        console.log(this.state.winNumbers);
    }
    
    componentDidMount(){
        this.runTimeouts();
    }

    componentDidUpdate(prevProps,prevState){
        console.log("component Did update");
        if(this.state.winBalls.length===0){
            this.runTimeouts();
        }
    }

    componentWillUnmount(){
        this.timeouts.forEach((v)=>{
            clearTimeout(v);
        })
    }
    onClickRedo=()=>{
        this.setState({
            winNumbers:getWinNumbers(),
            winBalls:[],
            bonus:null,
            redo:false
        })
        this.timeouts=[];
    };
    render(){
        const {winBalls,bonus,redo}=this.state;
        return(
            <>
                <div>당첨숫자</div>
                <div id="result">
                    {winBalls.map(v=><Ball key={v} number={v}/>)}
                </div>
                <div>보너스</div>
                {bonus && <Ball number={bonus}/>}
                {redo&&<button onClick={redo?this.onClickRedo:()=>{}}>한번더!</button>}
            </>
        )
    }
}

export default Rotto;