const e = React.createElement;
class LikeButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return e('button',null,'Like')
                //<button>Like</button>
    }
}
ReactDOM.render(e(LikeButton),document.querySelector('#root'));