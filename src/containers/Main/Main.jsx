import ProductListing from 'containers/ProductListing/ProductListing';
import React, { useState } from 'react'
import "./Main.css"

function Main(props) {

    const [products, setProducts] = useState(props.data);

    return (
        <div className="Main">
            {products.data.map(product => {
                return <ProductListing key={product.id} product={product}/>
            })}
        </div>
    )
}

export default Main
