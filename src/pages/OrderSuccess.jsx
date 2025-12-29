import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiTruck, FiMapPin, FiCreditCard, FiShoppingBag } from 'react-icons/fi';
import orderAPI from '../api/orderAPI';
import { formatPrice, formatDate, getProductImage, resolveImageUrl, generateOrderNumber } from '../utils/helpers';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';


const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderAPI.getOrder(id);
        // Handle different response structures
        const orderData = response.data?.data?.order || response.data?.order || response.data;
        setOrder(orderData);
      } catch (err) {
        console.error('Failed to fetch order:', err);
        setError(err.response?.data?.message || 'Failed to load order details');
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiPackage className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The order you\'re looking for doesn\'t exist.'}</p>
          <Link
            to="/products"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const orderNumber = order._id ? generateOrderNumber(order._id) : 'ORD-XXXXXX';
  const totalItems = order.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <SEO
        title={`Order Confirmed - ${orderNumber} | Mobile Covers`}
        description="Your order has been successfully placed. View order details and track your shipment."
        url={`/order-success/${id}`}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Success Header */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-6 text-center">
            <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-xl font-bold text-gray-900">{orderNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FiPackage className="w-5 h-5" />
                  Order Items ({totalItems})
                </h2>
                <div className="space-y-4">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image ? resolveImageUrl(item.image) : getProductImage(item.productId)}
                          alt={item.title || item.productId?.title || 'Product'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-image.svg';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">
                          {item.title || item.designMeta?.title || item.designMeta?.name || item.productId?.title || 'Custom Product'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.brand} • {item.model}{item.material ? ` • ${item.material}` : ''}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-600">Qty: {item.quantity || 1}</span>
                          <span className="font-semibold">{formatPrice(item.price * (item.quantity || 1))}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FiTruck className="w-5 h-5" />
                  Order Status
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FiCheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Order Placed</p>
                      <p className="text-sm text-gray-600">{formatDate(order.createdAt || new Date())}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      ['confirmed', 'processing', 'shipped', 'delivered'].includes(order.status)
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                    }`}>
                      <FiPackage className={`w-4 h-4 ${
                        ['confirmed', 'processing', 'shipped', 'delivered'].includes(order.status)
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <p className={`font-semibold ${
                        ['confirmed', 'processing', 'shipped', 'delivered'].includes(order.status)
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}>
                        {order.status === 'pending' ? 'Order Confirmed' :
                         order.status === 'confirmed' ? 'Order Confirmed' :
                         order.status === 'processing' ? 'Processing' :
                         order.status === 'shipped' ? 'Shipped' :
                         order.status === 'delivered' ? 'Delivered' : 'Order Confirmed'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.status === 'delivered' ? 'Your order has been delivered' :
                         order.status === 'shipped' ? 'Your order is on the way' :
                         'We\'re preparing your order'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Order Summary Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number</span>
                    <span className="font-semibold">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date</span>
                    <span className="font-semibold">{formatDate(order.createdAt || new Date())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-semibold capitalize">{order.payment?.method || 'Online Payment'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-semibold capitalize ${
                      order.status === 'delivered' ? 'text-green-600' :
                      order.status === 'cancelled' ? 'text-red-600' :
                      'text-blue-600'
                    }`}>
                      {order.status || 'Pending'}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(order.total || 0)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FiMapPin className="w-5 h-5" />
                  Shipping Address
                </h2>
                {order.shippingAddress && (
                  <div className="text-gray-700">
                    <p className="font-semibold">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.phone}</p>
                    <p className="mt-2">
                      {order.shippingAddress.address1}
                      {order.shippingAddress.address2 && `, ${order.shippingAddress.address2}`}
                    </p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                )}
              </div>

              {/* Payment Info */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FiCreditCard className="w-5 h-5" />
                  Payment Information
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-semibold capitalize">{order.payment?.method || 'Online Payment'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid</span>
                    <span className="font-semibold">{formatPrice(order.total || 0)}</span>
                  </div>
                  {order.payment?.status && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status</span>
                      <span className={`font-semibold capitalize ${
                        order.payment?.status === 'paid' ? 'text-green-600' :
                        order.payment?.status === 'failed' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {order.payment?.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold mb-4">What's Next?</h2>
                <div className="space-y-3">
                  <Link
                    to="/orders"
                    className="w-full bg-primary-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiPackage className="w-5 h-5" />
                    View All Orders
                  </Link>
                  <Link
                    to="/products"
                    className="w-full bg-gray-100 text-gray-900 text-center py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiShoppingBag className="w-5 h-5" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
