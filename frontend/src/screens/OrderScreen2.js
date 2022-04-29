import React, { useEffect, useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import PaystackPop from '@paystack/inline-js';

export default function OrderScreen2(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = false;

  useEffect(() => {
    const addPayStackScript = async () => {
      //const {data} = await Axios.get()
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://js.paystack.co/v1/inline.js`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order._id) {
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paystack) {
          addPayStackScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch,order, orderId, sdkReady]);

  //const publicKey = 'pk_test_bfe3a24ab156c170aab28f4a705c4ba46730718d';

  function payWithPaystack() {
    var handler = PaystackPop.setup({
      key: 'pk_test_bfe3a24ab156c170aab28f4a705c4ba46730718d',
      email: 'customer@email.com',
      amount: order.totalPrice * 100,
      //ref: '' + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: 'Mobile Number',
            variable_name: 'mobile_number',
            value: '+23324606113',
          },
        ],
      },
      callback: function (response) {
        alert('success. transaction ref is ' + response.reference);
      },
      onClose: function () {
        alert('window closed');
      },
    });
    handler.openIframe();
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x GH₵{item.price} = GH₵
                          {item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>GH₵{order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>{order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>{order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>GH₵{order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <div className="checkout">
                <form id="paymentForm">
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email-address" required />
                  </div>
                  <div class="form-group">
                    <label for="amount">Amount</label>
                    <input type="tel" id="amount" required />
                  </div>
                  <div class="form-group">
                    <label for="first-name">Name</label>
                    <input type="text" id="first-name" />
                  </div>
                  {!order.isPaid && (
                    <div class="form-submit">
                      <button type="submit" onclick={payWithPaystack()}>
                        {' '}
                        Pay{' '}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
//<script src="https://js.paystack.co/v1/inline.js"></script>;
