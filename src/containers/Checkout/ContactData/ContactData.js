import React, { Component } from 'react';

import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../UI/Input/Input';

class ContactData extends Component {
    state = {
        loading: false,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
            },
            coutry: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
            },
        }
    }

    // input入力された値をDBに保存する
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        // フォームに入力された内容を格納する
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false })
            });
    }

    // input値がかわったときに、値を更新する
    inputChangedHandler = (event, inputIdentify) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentify]
        }
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentify] = updatedFormElement;
        this.setState ({ orderForm: updatedOrderForm})
    }
    render () {
        const fromElementsArray = [];
        for (let key in this.state.orderForm) {
            fromElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        // inputの生成
        let form = (
            <form onSubmit={this.orderHandler}>
                {fromElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;