import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false,
        totalPrice: 4
    }

    componentDidMount () {
        // axios.get('https://react-my-burger-3e1fd.firebaseio.com/ingredients.json')
        //     .then( response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch (error => {
        //         this.setState ({ error: true })
        //     });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => { return sum + el;
            }, 0);

        return sum > 0;
    }

    PurchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler =  () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push( {
            pathname:'/checkout',
            search: '?' + queryString
        });
    }

    render () {

        const disabledInfo = {
            ...this.props.ings
        };

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredentAdded={this.props.onIngredientAdded}
                        ingredentRemoved={this.props.onIngredientRemoved}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.PurchaseHandler}
                        disabled={disabledInfo}
                        price={this.props.price} />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));