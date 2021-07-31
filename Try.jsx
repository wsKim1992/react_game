import React,{PureComponent,memo,useState} from 'react';

/* const React = require("react");
const {Component} = React;
 */

class Try extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            result:this.props.result,
            try:this.props.try
        }
    }

    render(){
        const {tryInfo}=this.props;
        return(
            <li>
                <div>{try}</div>
                <div>{result}</div>
            </li>
        );
    }
}

/* const Try = memo(({tryInfo})=>{
    const [result,setResult]=useState(tryInfo.result);
    const onClick=()=>{
        resResult('1');
    };

    return(
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onClick}>{tryInfo.result}</div>  
        </li>
    )
}) */
/* 
class Try extends Component{
    render(){
        return(
            <li>
                <div>{this.props.tryInfo.try}</div>
                <div>{this.props.tryInfo.result}</div>  
            </li>

        )
    }
} */

/* module.export=Try; */
export default Try;
