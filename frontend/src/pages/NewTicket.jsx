import React from 'react';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket } from '../features/ticket/ticketSlice';

import BackButton from '../components/BackButton';

function NewTicket() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const ticketData = {
      product,
      description,
    };
    dispatch(createTicket(ticketData))
      .unwrap()
      .then(() => {
        navigate('/tickets');
        toast.success('New ticket created!');
      })
      .catch(toast.error);
  };

  return (
    <div className="container">
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
      </section>

      <section className="form" id="newTicketForm">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="MacBook Pro">MacBook Pro</option>
              <option value="iPad">iPad</option>
              <option value="iMac">iMac</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block btn-newTicket-submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default NewTicket;
