import React, { useState, useEffect } from 'react';
import CartProductList from './CartProductList';
import './Cart.scss';
import '../../styles/mixin.scss';
import { Link } from 'react-router-dom';

const Cart = ({ switchCartModal }) => {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        fetch('http://10.58.52.204:8000/cart/', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => setCarts(data));
    }, []);

    const total = carts.reduce((a, b) => a + b.price * b.quantity, 0);

    const onRemove = id => {
        setCarts(carts.filter(list => list.id !== id));
        fetch('http://10.58.52.204:8000/cart/' + id, {
            method: 'DELETE',
        });
    };

    const onChangeAmount = (id, quantity) => {
        setCarts(
            carts.map(cart => {
                if (cart.id === id) {
                    cart.quantity = quantity;
                }
                return cart;
            })
        );
        fetch('http://10.58.52.204:8000/cart/' + id, {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ quantity }),
        }).then(response => response.json());
    };

    return (
        <div className="cart">
            <div className="cartBox">
                <div className="cartInner">
                    <div className="cartOrganize">
                        <CartProductList
                            carts={carts}
                            onRemove={onRemove}
                            onChangeAmount={onChangeAmount}
                            switchCartModal={switchCartModal}
                        />
                        <div className="cartOrganizeWrapper">
                            <div className="cartOrganizeInner">
                                <div className="cartOrganizeNoticeTop">
                                    <p className="cartOfferMessage">
                                        ??? ?????? ?????? ?????? ????????? ???????????????.
                                    </p>
                                </div>
                                <div className="totalComment">
                                    <div className="totalLabel">
                                        ??????(?????? ??????)
                                    </div>
                                    <div className="OrganizeTotalAmount">
                                        {total.toLocaleString('ko-KR', {
                                            style: 'currency',
                                            currency: 'KRW',
                                        })}
                                    </div>
                                </div>
                                <div className="cartOrganizeButtonBottom">
                                    <Link to="/payment">
                                        <button
                                            className="cartPayButton"
                                            onClick={switchCartModal}
                                        >
                                            ????????????
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
