import React, {Component,useRef,useState} from 'react';

const ResponseCheck = ()=>{
    const [state,setState]=useState('waiting');
    const [message,setMessage]=useState('클릭해서 시작하세요');
    const [result,setResult]=useState([]);
    const timer = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen=()=>{
        if(state==='waiting'){
            setState('ready');
            setMessage('초록색 되면 click');
            timer.current=setTimeout(()=>{
                setState('now');
                setMessage('지금 click')
                startTime.current=new Date();
            },Math.floor(Math.random()*1000)+2000);
        }else if(state==='ready'){
            clearTimeout(timer.current);
            setState('waiting');
            setMessage('다시클릭해주세요');
        }else if(state==='now'){
            endTime.current=new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult)=>{
                return [...prevResult,endTime.current-startTime.current];
            })
        }
    };
    
    const onReset=()=>{
        setResult([]);
    }
    const renderAverage=()=>{
        //const {result}=state;
        return(
            result.length===0
            ?null:
            <>
                <div>평균 {result.reduce((a,c)=>a+c)/result.length} ms</div>
                <button onClick={onReset}>리셋</button>
            </>
        )
    }
    return(
        <>
            <div id = "screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            <div>
                {renderAverage()}
            </div>
        </>
    )
}

export default ResponseCheck;

/* class ResponseCheck extends Component{
    state ={
        state:'waiting',
        message:'클릭후 시작',
        result:[]
    }
    timer;
    startTime;
    endTime;
    onClickScreen=() =>{
        const {state,message,result}=this.state;
        if(state==='waiting'){
            this.setState({
                state:'ready',
                message:'초록색 되면 click'
            });
            this.timer=setTimeout(()=>{
                this.setState({
                    state:'now',
                    message:'지금 click'
                })
                this.startTime=new Date();
            },Math.floor(Math.random()*1000)+2000);
        }else if(state==='ready'){
            clearTimeout(this.timer);
            this.setState({
                state:'waiting',
                message:'급하네이새끼 ㅉㅉ 다시 클릭하샘'
            })
        }else if(state==='now'){
            this.endTime=new Date();
            this.setState((prevState)=>{
                return {
                    state:'waiting',
                    message:'클릭해서 시작하세요',
                    result:[...prevState.result,this.endTime-this.startTime],
                }
            })
        }
    }
    onReset=()=>{
        this.setState({
            result:[],
        })
    }
    renderAverage=()=>{
        const {result}=this.state;
        return(
            result.length===0
            ?null:
            <>
                <div>평균 {result.reduce((a,c)=>a+c)/result.length} ms</div>
                <button onClick={this.onReset}>리셋</button>
            </>
        )
    }
    render(){
        const {state,message} = this.state;
        return(
            <>
                <div id = "screen" className={state} onClick={this.onClickScreen}>
                    {message}
                </div>
                <div>
                    {this.renderAverage()}
                </div>
            </>
        )
    }
}
 */
