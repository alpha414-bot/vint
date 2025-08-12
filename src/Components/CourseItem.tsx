// CourseItem: Components containing a visual display of the course metadata and add to cart feature
import { useCartProducts } from "@/Services/Hook";
import {
    addToCartQuery
} from "@/Services/Query";
import React, { useMemo } from "react";

const CourseItem: React.FC<{
    course: CourseItemType;
}> = ({ course }) => {
    const { data: inCartsProduct, isFetching: cartIsFetching } = useCartProducts();
    const inCart = useMemo(() => {
        if (cartIsFetching) {
            // While fetching, assume the item is in the cart
            return true;
        }
        return inCartsProduct?.some(item => item.productID === course.id.toString());
    }, [inCartsProduct, cartIsFetching])
    return (
        <div className="bg-[#1e293b] rounded-xl shadow-lg overflow-hidden flex flex-col">
            <img src={course.image} alt={course.title} className="h-48 w-full object-cover" />
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-rose-300 mb-2">{course.title}</h3>
                    <p className="text-gray-300 mb-4">{course.description}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-semibold">{course.price}</span>
                    <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-xs">{course.level}</span>
                </div>
                <button
                    className={`mt-6 bg-rose-500 hover:bg-rose-600 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-all duration-200 ${inCart ? 'opacity-60 cursor-not-allowed' : ''}`}
                    // onClick={() => !inCart && onAddToCart(course)}
                    onClick={() => addToCartQuery(course)}
                    disabled={inCart}
                >
                    {JSON.stringify(inCartsProduct)}
                    {JSON.stringify(cartIsFetching)}
                    {JSON.stringify(inCartsProduct?.some(item => item.productID === course.id.toString()))}
                    {inCart ? "Added to Cart" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default CourseItem;
