import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }
    componentDidMount () {
        axios.get('/orders.json')
            .then(res => {
                const featchedOrders = [];
                for (let key in res.data) {
                    featchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log(res.data);
                this.setState({ loading: false, orders: featchedOrders })
            })
            .catch(err => {
                this.setState({ loading: false })
            });
    }

    render () {
        return (
            <div>
                <Order />
                <Order />
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);