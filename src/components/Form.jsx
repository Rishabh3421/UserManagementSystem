import React from 'react';
import { Button } from 'react-bootstrap';

const UserForm = ({ isUpdate, onSubmit, onClear, name, setName, email, setEmail, mobile, setMobile }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    placeholder="Mobile"
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                />
            </div>
            <Button variant="primary" type="submit">
                {isUpdate ? 'Update' : 'Submit'}
            </Button>
            <Button variant="secondary" onClick={onClear} className="ml-2">
                Clear
            </Button>
        </form>
    );
};

export default UserForm;
