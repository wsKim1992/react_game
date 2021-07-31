const React = require("react");
const {Component} = React;

class WordRelay extends Component{
    state={
        word:'김우석',
        value:'',
        result:''
    };
    onSubmitForm=(e)=>{
        e.preventDefault();
        if(this.state.word[this.state.word.length-1]===this.state.value[0]){
            this.setState({
                result:"good",
                word:this.state.value,
                value:'',
            })
            this.input.focus();
        }else{
            this.setState({
                result:'not',
                value:'',
            })
            this.input.focus();
        }
    }
    input;
    onRefInput=(c)=>{
        this.input=c;
    }
    
    onChangeInput=(e)=>{
        this.setState({
            value:e.target.value
        })
    }

    render(){
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
                    <button>입력</button>
                </form>
                <div>{this.state.result}</div>
            </>
        )
    }
}

module.exports = WordRelay;