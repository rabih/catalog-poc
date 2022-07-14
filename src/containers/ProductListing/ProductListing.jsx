import React from 'react'

function ProductListing(props) {
    return (
        <div id={props.product.id} className="ProductListing">
            <h3>{props.product.title}</h3>
        </div>
    )
}

export default ProductListing
