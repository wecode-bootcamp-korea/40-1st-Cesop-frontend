import React from 'react';
import './Preview.scss';

function Preview(props) {
    const { product } = props;

    return (
        <div className="preview">
            <picture className="imageSection">
                <img
                    className="productImage"
                    alt="preview"
                    src="/images/DetailList/product1.png"
                />
            </picture>
            <div className="productInfo">
                <a>
                    <h5 className="productName">{product.name}</h5>
                    <div>
                        <span>{product.volume}</span>
                        <span> / </span>
                        <span>￦{product.price.toLocaleString()}</span>
                    </div>
                </a>
            </div>
            <div className="productDetails">
                <ul className="listOfDetails">
                    <li className="detailsInfo">
                        <div className="productInfoTitle">피부 타입</div>
                        <div className="productInfoContent">
                            {product.skin_type}
                        </div>
                    </li>
                    <li className="detailsInfo">
                        <div className="productInfoTitle">사용감</div>
                        <div className="productInfoContent">
                            {product.texture}
                        </div>
                    </li>
                </ul>
            </div>
            <button className="addCartButton">카트에 추가</button>
        </div>
    );
}

export default Preview;