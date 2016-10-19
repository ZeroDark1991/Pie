const request = superagent

class App extends React.Component{
    constructor(){
    	super()
    	this.state ={
    		telNum: '',
    		acomplished: false
    	}
    }

    handleInput(e){
    	this.setState({
    		telNum: e.target.value
    	})
    }

    submit(){
    	let tel = this.state.telNum
    	if(!/^1[0345789]\d{9}$/.test(tel)){
    		alert('手机号不合法')
    	}
    	console.log('提交'+tel)
    	request
            .post('http:zero。sayogi.cn:8080/app2/powerShop/AppChannelActivitySvr/join')
            .send({ sys: 'zhanghaopai', check: { mobile: this.state.telNum } })
            .on('error',(error) => {
            	console.log(error)
            })
            .end(function(err, res){
            	console.log(res)
            	console.log(err)
            })
    }

    stySheet(){
    	let clientWidth = document.body.clientWidth - 15
    	return {
    		content: {
    			marginTop: clientWidth + 'px',
    			padding: '0 2rem',
    			height: '150px'
    		},
    		input: {
    			width: '100%',
    			borderRadius: '10px',
    			padding: '.4rem 1rem',
    			margin: '.5rem 0',
    			textAlign: 'center'
    		},
    		btn: {
    			backgroundColor: '#ffd061'
    		}
    	}
    }

    render(){
    	let css = this.stySheet()
    	return (
    		<div className="container">
                <div style={css.content}>
                    <div style={{ display : !this.state.acomplished ? 'block':'none' }}>
                        <div className="flex-center">
                            <input  
                                type="tel"  
                                style={css.input}
                                placeholder='输入手机号'
                                value={this.state.telNum}
                                onChange={this.handleInput.bind(this)}>
                            </input>
                        </div>
                        <div className="flex-center">
                            <div
                                style={ Object.assign({},css.input,css.btn) }
                                onClick={this.submit.bind(this)}
                                placeholder='输入验证码'>
                                立即领取
                            </div>
                        </div>
                    </div>
                    <div style={{ display : this.state.acomplished ? 'block':'none' }}>
                        <div className="flex-center">
                            <span>成功领取</span>
                        </div>
                    </div>                    
                </div>
                <div>
                	<img src="../imgs/share-des.png" alt=""/>
                </div>
    		</div>
    	)
    }
}
ReactDOM.render(<App/>, document.getElementById('app'))