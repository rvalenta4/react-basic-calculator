import React, {Component} from 'react'
import './App.css'
import { Button } from "./components/Button"
import { Input } from "./components/Input"
import { ClearButton } from "./components/ClearButton"
import * as math from 'mathjs'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: null,
            equalPressed: false,
            previousInput: null,
            operator: null
        }
    }
    
    componentDidMount() {
        this.App.focus()
    }

    handleKeypress = (e) => {
        
        e.preventDefault()
        
        switch (e.key) {
            case 'Enter': this.handleEqual()
                break
            case 'Delete': this.handleClear()
                break
            case 'Backspace': this.handleBackspace()
                break
            case ',': this.handleInput('.')
                break
            default: this.handleInput(e.key)
                break
        }
    }

    handleInput = value => {

        const exceptions = ['.', '/', '*', '+', '-']

        if(isNaN(parseInt(value)) && !exceptions.includes(value)) return

        const {input, equalPressed, previousInput} = this.state

        if(isNaN(value) && value !== '.') {
            this.setState({
                operator: value,
                input: value,
                previousInput: !isNaN(input) ? input : previousInput,
                equalPressed: false
            })

        } else if(!isNaN(value) && ((input && input.length < 25) || input === null)) {
            this.setState({
                input: !isNaN(input) 
                    ? `${input && !equalPressed ? input : ''}${value}` 
                    : input === '.'
                        ? `${input}${value}`
                        : value,
                equalPressed: false
            })

        } else if(value === '.') {

            this.setState({
                input: input && !input.includes('.') 
                    ? `${input && !equalPressed ? input : ''}${value}` : '.',
                equalPressed: false
            })
        }
    }

    handleEqual = () => {

        const {input, equalPressed, previousInput, operator} = this.state

        if(!input || input === operator || equalPressed) return

        try {
            const result = math.eval(`${previousInput ? previousInput : ''}${operator ? operator : ''}${input}`).toString()

            this.setState({
                input: result === 'Infinity'  ? 'Math error' : result,
                equalPressed: true,
                previousInput: null,
                operator: null
            }) 
        } catch {
            this.setState({
                input: input === '.' ? null : 'Math error', 
                equalPressed: true,
                previousInput: null,
                operator: null
            })
        }
    }

    handleClear = () => {
        this.setState({
            input: null,
            previousInput: null,
            equalPressed: false,
            operator: null
        })
    }

    handleBackspace = () => {

        const {input, equalPressed} = this.state

        if(equalPressed || !input) return

        const newInput = input.slice(0, input.length - 1).length > 0 
            ? input.slice(0, input.length - 1) : null

        this.setState({input: newInput})
    }

    render() {
        
        const {input} = this.state

        const buttonValues = [
            '7', '8', '9', '/', 
            '4', '5', '6', '*', 
            '1', '2', '3', '+', 
            '.', '0', '=', '-'
        ]

        const buttons = buttonValues.map((value, id) => {
            return value !== "=" 
                ? <Button key={id} handleClick={this.handleInput}>{value}</Button> 
                : <Button key={id} handleClick={this.handleEqual}>{value}</Button> 
        })

        return (
            <div className='app' tabIndex={1} onKeyDown={(e) => this.handleKeypress(e)} ref={(input) => {this.App = input}}>
                <div className='calc'>
                    <Input input={input}/>
                    <div className='rows'>
                        {buttons}
                    </div>
                    <div className='clear'>
                        <ClearButton handleClear={() => this.handleClear()} position={'left'}>AC</ClearButton>
                        <ClearButton handleClear={() => this.handleBackspace()} position={'right'}>←</ClearButton>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
