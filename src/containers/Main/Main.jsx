import React, { useState } from 'react'

import ProductListing from 'containers/ProductListing/ProductListing';
import useProduct from 'hooks/useProduct';
import testData from '../../testData';
import "./Main.css"
import InfiniteScroll from 'react-infinite-scroller';

function Main({companyId}) {

    const { isLoading: productLoading, products: fetchedProducts, hasNextPage, fetchNextPage, isFetchingNextPage } = useProduct({companyId: companyId});
    const [selectedProducts, setSelectedProducts] = useState([]);
    const products = companyId ? fetchedProducts : testData?.data;

    const selectProduct = (productId) => {
        if (selectedProducts.filter(sp => sp.id === productId)) //if the product is already selected we avoid this
            return;
        // add to the list
        setSelectedProducts(...selectedProducts, ...products.filter(p => p.id === productId));
    }

    const unselectProduct = (productId) => {
        if (selectedProducts.filter(sp => sp.id === productId)) //if the product is already unselected we avoid this
            return;
        // remove from the list
        setSelectedProducts(...selectedProducts.filter(p => p.id !== productId));
    }
    if (productLoading) {
        return <div>Product Loading...</div>
    }

    return (
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => { fetchNextPage() }} 
            className="Main">
            {products?.map(product => {
                return <ProductListing key={product.id} product={product} onSelect={() => selectProduct(product.id)} onUnselect={() => unselectProduct}/>
            })}
            { isFetchingNextPage ? <div>Loading...</div> : <div></div>}
        </InfiniteScroll>
    )
}

export default Main
