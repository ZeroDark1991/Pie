const request = superagent
const host = ''

class App extends React.Component{
    constructor(){
    	super()
    	this.state ={
    		telNum: '',
    		acomplished: false,
    		msg: '',
    		sucType: 0
    	}
    }

    handleInput(e){
    	this.setState({
    		telNum: e.target.value
    	})
    }

    clearMsg(){
    	this.setState({
    		msg: ''
    	})
    }

    submit(){
    	let tel = this.state.telNum
    	if(!/^1[0345789]\d{9}$/.test(tel)){
    		this.setState({msg: '*号码格式有误'})
    		return
    	}
    	let req = { sys: 'zhanghaopai', check: { mobile: this.state.telNum } }
    	console.log('提交' + tel)
    	request
            .post(host + '/app2/powerShop/AppChannelActivitySvr/join')
            .type('form')
            .send(JSON.stringify(req))
            .on('error',(error) => {
            	console.log(error)
            })
            .end((err, res) => {
            	let data = JSON.parse(res.text)
            	console.log(data)
            	if(data.result == 'success'){
            		this.setState({
            			acomplished: true,
            			msg: '恭喜，您已成功领取',
            			sucType: 1
            		})
            	}else{
            		if(data.errorCode = '102'){
            		    this.setState({
            			    acomplished: true,
            			    msg: '*您已经领取过了',
            			    sucType: 2
            		    })            			
            		}
            	}
            })
    }

    stySheet(){
    	return {
    		content: {
    			padding: '0 2rem',
    			height: '140px'
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

    successContent(){
    	switch(this.state.sucType){
    		case 0:
    		    return(<div>领取失败</div>)
    		    break
    		case 1:
    		    return(<div>领取成功</div>)
    		    break
    		case 2:
    		    return(<div>重复领取</div>)
    		    break
    	}
    }

    render(){
    	let css = this.stySheet()
    	let clientWidth = document.body.clientWidth - 45
    	return (
    		<div className="container">
    		    <div style={{marginTop: clientWidth + 'px'}} className='flex-center msg-box'>
                    { this.state.msg }
    		    </div>
                <div style={css.content}>
                    <div style={{ display : !this.state.acomplished ? 'block' : 'none' }}>
                        <div className="flex-center">
                            <input  
                                type="tel"  
                                style={css.input}
                                placeholder='输入手机号'
                                value={this.state.telNum}
                                onChange={this.handleInput.bind(this)}
                                onFocus={this.clearMsg.bind(this)}>
                            </input>
                        </div>
                        <div className="flex-center">
                            <div
                                style={ Object.assign({}, css.input, css.btn) }
                                onClick={this.submit.bind(this)}
                                placeholder='输入验证码'>
                                立即领取
                            </div>
                        </div>
                    </div>
                    <div style={{ display : this.state.acomplished ? 'block' : 'none'}}>
                        <div className="flex-center success-box">
                            {this.successContent()}
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