import React from 'react'
import './ProductListing.css'

function ProductListing(props) {
    return (
        <div id={props.product.id} className="ProductListing">
            <img className="product-image" src={props.product.images[0].source} />
            <div className="ProductListing__product-text-wrapper">
            <h3 className="product-title">{props.product.title}</h3>
            <p className="product-description">{props.product.description}</p>
            <div className="ProductListing__pricing-wrapper">
                
            </div>
            </div>
        </div>
    )
}

export default ProductListing
