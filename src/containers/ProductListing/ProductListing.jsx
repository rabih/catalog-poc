import React from 'react'
import './ProductListing.css'

function ProductListing({product, onSelect, onUnselect}) {

    const marginCalculator = (cost, price) => {
        const diff = price - cost;
        const result = (diff/cost*100).toFixed(1);
        return result
    }

    // Deconstruct the prices from the Product Object
    // Dropship
    const dropshipCost = product.variants[0].basePrice;
    const dropshipPrice = product.variants[0].retailPrice;

    // Wholesale
    const wholesaleCost = product.variants[0].basePrice;
    const wholesalePrice = product.variants[0].retailPrice;

    return (
        <div id={product.id} className="ProductListing">
            <div className="ProductListing__image-wrapper">
            <img className="product-image" src={product.images[0].source} />
            </div>
            <div className="ProductListing__product-text-wrapper">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-variants">{product.variants.length} Variant(s)</p>
            <p className="product-description">{product.description}</p>
            <div className="ProductListing__pricing-wrapper">
                <div className="pricing-wrapper__price-line">
                    <p className="product-cost-label">Dropship Cost:</p>
                    <p className="product-cost">From: ${dropshipCost}</p>
                    <p className="product-cost-label">MSRP:</p>
                    <p className="product-cost">From: ${dropshipPrice}</p>
                    <p className="product-margin">{marginCalculator(dropshipCost, dropshipPrice)}%</p>
                </div>
                <div className="pricing-wrapper__price-line">
                <p className="product-cost-label">Wholesale Cost:</p>
                    <p className="product-cost">From: ${wholesaleCost}</p>
                    <p className="product-cost-label">MSRP:</p>
                    <p className="product-cost">From: ${wholesalePrice}</p>
                    <p className="product-margin">{marginCalculator(wholesaleCost, wholesalePrice)}%</p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ProductListing;
