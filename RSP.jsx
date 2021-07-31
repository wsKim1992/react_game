import React,{Component} from 'react';

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

class RSP extends Component{
    state={
        result:'',
        imgCoord:0,
        score:0
    };
    
    interval;

    changeHand=()=>{
        const {imgCoord}=this.state;
        console.log(imgCoord);
        if(imgCoord==rspCoords.바위){
            this.setState({
                imgCoord:rspCoords.가위,
            });
        }else if(imgCoord==rspCoords.가위){
            this.setState({
                imgCoord:rspCoords.보,
            });
        }else if(imgCoord===rspCoords.보){
            this.setState({
                imgCoord:rspCoords.바위,
            });
        }
    }
    //render() 가 '처음' 실행될 때 componentDidMount() 함수가 실행됨..
    componentDidMount(){
        this.interval=setInterval(this.changeHand,100);
    }
    //component 리렌더링 . state나 props 가 바뀔 때 발생.
    componentDidUpdate(){
        //this.interval=setInterval(this.changeHand,200);
    }
    
    //(부모에 의해서 제거되기 직전)component가 제거되기 직전 componentWillUnmount()가 실행됨..
    componentWillUnmount(){
        console.log('componentWillUnmount');
        clearInterval(this.interval);
    }
    
    onClickBtn=(choice)=>{
        const {imgCoord}=this.state;
        clearInterval(this.interval);
        const myscore = scores[choice];
        const cpuscore= scores[computerChoice(imgCoord)];
        const diff = myscore-cpuscore;
        if(diff===0){
            this.setState({
                result:'draw'
            })
        }else if([-1,2].includes(diff)){
            this.setState((prevState)=>{
                return{
                    result:'win',
                    score:prevState.score+1
                }
            })
        }else{
            this.setState((prevState)=>{
                return{
                    result:'lose',
                    score:prevState.score-1
                }
            })
        }
        setTimeout(this.interval=setInterval(this.changeHand,100),2000);
    }

    render(){
        const {result,score,imgCoord}=this.state;
        //console.log("imgCoord : ",imgCoord);
        return(
            <>
                <div id="computer" style={{background:'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0'}}/>
                
                <div>
                    <button id="rock" className='btn' onClick={()=>{this.onClickBtn('바위')}}>바위</button>
                    <button id="scissor" className='btn' onClick={()=>{this.onClickBtn('가위')}}>가위</button>
                    <button id="papaer" className='btn' onClick={()=>{this.onClickBtn('보')}}>보</button>
                </div>
                <div>{result}</div>
                <div>현재{score}점</div>
            </>
        );
    }
}

export default RSP;