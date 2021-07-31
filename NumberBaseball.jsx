import React,{useState,memo} from 'react';
//import React,{Component} from 'react';
import Try from './Try';
/* const React = require("react");
const {Component} = React;
const Try = require("./Try");
 */
function getNumbers(){
    const candidate =[1,2,3,4,5,6,7,8,9];
    const array=[];
    for(let i =0;i<4;i+=1){
        const chosen = candidate.splice(Math.floor(Math.random()*(9-i)),1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball=memo(()=>{
    const [result,setResult]= useState('');
    const [value,setValue]=useState('');
    const [answer,setAnswer]=useState(getNumbers());
    const [tries,setTries]=useState([]);

    const onSubmitForm=(e)=>{
        e.preventDefault();
        if(value===answer.join('')){
            setResult('홈런');
            setTries((prevTries)=>{
                return [...prevTries,{try:value,result:'홈런!'}]
            })
            alert("restart game");
            setValue('');
            setAnswer(getNumbers());
            setTries([]);

        }else{
            const answerArray = value.split('').map((v)=>parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length>=9){
                
                alert("게임을 다시 시작합니다.");
                setResult("10번 넘게 틀려서 실패! 답은"+ answer.join(',')+"였습니다");
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            }else{
                for(let i =0;i<4;i+=1){
                    if(answerArray[i]===answer[i]){
                        strike+=1;
                    }else if(answer.includes(answerArray[i])){
                        ball+=1;
                    }
                }
                //이전 state 로 새 state 값을 이어줄때 
                //인자를 prevState 를 가지고 있는 함수형태로 만들어야함.
                setTries((prevTries)=>[...prevTries,{try:value,result:strike.toString()+ '스트라이크,'+ ball.toString() +'볼' }])
                setValue('');
            }
        }
        console.log(answer);
    };
    const onChangeInput=(e)=>{
        setValue(e.target.value);
    };

    return(
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput}></input>
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {tries.map((v,i)=>{
                    return (
                        <Try key={v.try+"_"+v.result} tryInfo={v}/>
                    )
                })}
            </ul>    
        </>
    );
})

/* class NumberBaseball extends Component{
    state={
        result:'',
        value:'',
        answer:getNumbers(),
        tries:[],
    }
    onSubmitForm=(e)=>{
        e.preventDefault();
        if(this.state.value===this.state.answer.join('')){
            this.setState((prevState)=>{
                return{
                    result:'홈런',
                    tries:[...prevState.tries,{try:prevState.value,result:'홈런!'}]
                }
            })
            alert("restart game");
            this.setState({
                value:'',
                answer:getNumbers(),
                tries:[]
            })
        }else{
            const answerArray = this.state.value.split('').map((v)=>parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length>=9){
                this.setState({
                    result:"10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다",
                });
                alert("게임을 다시 시작합니다.");
                this.setState({
                    value:'',
                    answer:getNumbers(),
                    tries:[]
                });
            }else{
                for(let i =0;i<4;i+=1){
                    if(answerArray[i]===this.state.answer[i]){
                        strike+=1;
                    }else if(this.state.answer.includes(answerArray[i])){
                        ball+=1;
                    }
                }
                //이전 state 로 새 state 값을 이어줄때 
                //인자를 prevState 를 가지고 있는 함수형태로 만들어야함.
                this.setState((prevState)=>{
                    return{
                        tries : [...prevState.tries,{try:this.state.value,result:strike.toString()+ '스트라이크,'+ ball.toString() +'볼' }],
                        value: '',
                    }
                })
            }
        }
        console.log(this.state.answer);
    };
    onChangeInput=(e)=>{
        this.setState({
            value:e.target.value
        })
    };
    
    render(){
        return(
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}></input>
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v,i)=>{
                        return (
                            <Try key={v.try+v.result} tryInfo={v}/>
                        )
                    })}
                </ul>    
            </>
        )
    }
} */
/* 
module.exports = NumberBaseball; */
export default NumberBaseball;