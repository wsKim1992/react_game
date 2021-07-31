import React,{PureComponent} from 'react';

class Test extends PureComponent {
    state={
        counter:0,
        array:[],
    }

    // true 면 랜더링 발생 허용 false 이면 허용안함!
    /* shouldComponentUpdate(nextProps,nextState,nextContext){
        if(this.state.counter!==nextState.counter){
            return true;
        }
        return false;
    } */

    onClick=()=>{
        this.state.array.push(3);
        this.setState({
            array:[...this.state.array],
        });
    }
    render(){
        console.log('랜더링 : ',this.state);
        return (<h1>
            <button onClick={this.onClick}>클릭</button>
        </h1>)
    }
}

export default Test;