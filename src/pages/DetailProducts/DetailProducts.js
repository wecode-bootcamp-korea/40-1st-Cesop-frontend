import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MainDescription from './Description/MainDescription';
import SubDescription from './Description/SubDescription';
import './DetailProducts.scss';
import { API } from '../../config';

const DetailProducts = () => {
    const [itemData, setItemData] = useState({});
    const productParams = useParams();

    useEffect(() => {
        fetch(`${API.detail}/${productParams.id}`, { method: 'GET' })
            .then(response => response.json())
            .then(result => {
                setItemData(result[0]);
            });
    }, []);
    console.log(itemData);

    let token = localStorage.getItem('token');

    const addToCart = () => {
        console.log(token);
        fetch('http://10.58.52.204:8000/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                productName: itemData.product_name,
                quantity: 1,
                price: itemData.price,
                totalPrice: 1000,
                productId: 2,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    };
    console.log(typeof itemData.price);

    return (
        <div className="detailProducts">
            <div className="productDetailHeader">
                <Link to="/">
                    <img
                        className="cesopLogo"
                        src="/images/cesop-logo.png"
                        alt="cesop_logo"
                    />
                </Link>

                <div className="imageWrapper">
                    <img
                        className="productImage"
                        src={itemData.product_image}
                        alt={itemData.product_name}
                    />
                </div>

                <div className="productContent">
                    <nav className="productCategory">
                        {itemData.sub_category_id}
                    </nav>
                    <div className="productInfo">
                        <h1 className="productName">{itemData.product_name}</h1>
                        <p className="productDescription">
                            {itemData.productId}
                            {itemData.product_description}
                        </p>
                    </div>
                    <div className="productDetailBody">
                        <MainDescription itemData={itemData} />
                    </div>
                    <button onClick={addToCart} className="buttonAddToCart">
                        ????????? ???????????? - ???{itemData.price}???
                    </button>
                </div>
            </div>
            <section className="messageToCustomer">
                <aside className="message">
                    <div className="freeService">
                        <strong>?????? ?????? ?????? ?????????</strong>
                        <p className="serviceDescription">
                            ???????????? ?????? ????????? ?????? ?????? ?????? ???????????? ?????????
                            ????????????.
                        </p>
                    </div>
                    <div className="giftSample">
                        <strong>?????? & ?????? ??? ??????</strong>
                        <p className="giftDescription">
                            ?????? ?????? ?????? ?????? ????????? ???????????? ????????? ????????????.
                            <br />
                            (?????? ????????? ?????? ????????? ???????????????.)
                        </p>
                    </div>
                </aside>
            </section>

            <section class="howToUse">
                <div class="imageWrapper">
                    <img
                        className="textureImage"
                        src={itemData.texture_image}
                        alt={itemData.howtouse}
                    />
                </div>

                <div className="howToUseContent">
                    <p className="usageTitle">?????????</p>
                    <h2 className="usage">{itemData.howtouse}</h2>
                    <SubDescription itemData={itemData} />
                </div>
            </section>
        </div>
    );
};

export default DetailProducts;
