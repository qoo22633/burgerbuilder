import React, { Component } from 'react';

import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Yamashita',
                address: {
                    street: 'test',
                    zipCode: '0000000',
                    coutry: 'Japan'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        // alert('You continue!');
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false })
            });
    }
    render () {
        let form = (
                <form>
                    <Input inputtype="input" type="text" name="name" placeholder="Your Name"/>
                    <Input inputtype="input" type="email" name="email" placeholder="Your Email"/>
                    <Input inputtype="input" type="text" name="street" placeholder="Street"/>
                    <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>
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