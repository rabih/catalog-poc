import ProductListing from 'containers/ProductListing/ProductListing';
import React, { useState } from 'react'

function Main(props) {

    const [products, setProducts] = useState(props.data);
    console.log(products.data)
    return (
        <div className="Main">
            {products.data.map(product => {
                return <ProductListing key={product.id} product={product}/>
            })}
        </div>
    )
}

export default Main
