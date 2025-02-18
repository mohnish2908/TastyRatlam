import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../services/operations/orderAPI';
import { toast } from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderDetails = await getOrderById(id);
                setOrder(orderDetails.order);
            } catch (error) {
                console.error('Error fetching order details:', error);
                toast.error('Error fetching order details');
            }
        };
        fetchData();
    }, [id]);

    console.log("order", order);

    if (!order) {
        return <div className="flex justify-center items-center h-screen bg-gray-100">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Shipping Information</h2>
                <div className="mb-4">
                    <p className="font-semibold text-gray-600">Name:</p>
                    <p className="text-gray-800">{order.firstName} {order.lastName}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold text-gray-600">Contact Number:</p>
                    <p className="text-gray-800">{order.contactNumber}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold text-gray-600">Address:</p>
                    <p className="text-gray-800">{order.address}, {order.city}, {order.state}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold text-gray-600">Pin Code:</p>
                    <p className="text-gray-800">{order.pincode}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold text-gray-600">Email:</p>
                    <p className="text-gray-800">{order.email}</p>
                </div>
                {order.trackingNumber && (
                    <div className="mb-4">
                        <p className="font-semibold text-gray-600">Tracking Number:</p>
                        <p className="text-gray-800">{order.trackingNumber}</p>
                        <p className="font-semibold text-gray-600 mt-2">Shipping Carrier:</p>
                        <p className="text-gray-800">{order.shippingCarrier}</p>
                    </div>
                )}
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Items</h2>
                {order.products && order.products.length > 0 ? (
                    order.products.map((p) => (
                        <div key={p._id} className="flex justify-between items-center gap-3 w-full p-4 border-b border-gray-200 last:border-b-0">
                            <div className="w-1/6">
                                <img src={p.product.images[0]} alt={p.product.name} className="w-full rounded-lg" />
                            </div>
                            <div className="w-1/3">
                                <p className="font-semibold text-gray-800">{p.product.name}</p>
                                <p className="text-gray-500">{p.weightInGrams} gm</p>
                            </div>
                            <div className="w-1/4 flex flex-row justify-center items-center">
                                <span className="mr-1 text-gray-800">Rs.{p.price}</span>
                                <RxCross2 size={15} className="text-gray-500" />
                                <span className="ml-1 text-gray-800">{p.quantity}</span>
                            </div>
                            <div className="w-1/6 text-right text-gray-800">
                                Rs.{p.price * p.quantity}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No products found in this order.</p>
                )}
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Summary</h2>
                <div className="mb-4">
                    <p className="font-semibold text-gray-600">Subtotal:</p>
                    <p className="text-gray-800">Rs.{order.price}</p>
                </div>
                {order.coupon && (
                    <div className="mb-4">
                        <p className="font-semibold text-gray-600">Discount:</p>
                        <p className="text-red-600">-Rs.{order.price * (order.coupon.discountPercentage) / 100} ({order.coupon.code})</p>
                    </div>
                )}
                <div className="mb-4">
                    <p className="font-semibold text-gray-600">Shipping:</p>
                    <p className="text-gray-800">Rs.{order.shippingCost}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="font-bold text-xl text-gray-800">Total:</p>
                    <p className="font-bold text-xl text-green-600">Rs.{order.totalPrice}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;