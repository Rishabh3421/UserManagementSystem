import React, { useEffect, useState } from 'react';
import { Alert, Modal, Button } from 'react-bootstrap';
import UserForm from './Form'; // Importing the UserForm component for adding/editing users
import Loader from './Loader'; // Importing the Loader component for showing loading state

const UserDetails = () => {
    // State variables for managing user data, form fields, modal state, loading state, and notifications
    const [data, setData] = useState([]); // User data fetched from API
    const [id, setId] = useState(null); // ID of the user being edited
    const [name, setName] = useState(''); // Name of the user
    const [email, setEmail] = useState(''); // Email of the user
    const [mobile, setMobile] = useState(''); // Mobile number of the user
    const [isUpdate, setIsUpdate] = useState(false); // Flag to indicate if the user is being updated
    const [showModal, setShowModal] = useState(false); // Flag to control the visibility of the modal
    const [loading, setLoading] = useState(true); // Flag to indicate if data is being loaded
    const [notification, setNotification] = useState(''); // Notification message to display

    // Fetch user data from the API when the component mounts
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                setData(res); // Set the fetched data
                setLoading(false); // Update loading state to false
            })
            .catch(error => {
                setNotification('Error fetching data.'); // Set error notification
                setLoading(false); // Update loading state to false
            });
    }, []);

    // Function to handle editing of a user
    const handleEdit = (id) => {
        const user = data.find(item => item.id === id);
        if (user) {
            setId(id);
            setName(user.name);
            setEmail(user.email);
            setMobile(user.phone);
            setIsUpdate(true);
            setShowModal(true);
        }
    };

    // Function to clear the form fields and notifications
    const handleClear = () => {
        setId(null);
        setName('');
        setEmail('');
        setMobile('');
        setIsUpdate(false);
        setShowModal(false);
        setNotification('');
    };

    // Function to handle saving a new user
    const handleSave = (e) => {
        e.preventDefault();
        if (!name || !email || !mobile) {
            setNotification('All fields are required.');
            return;
        }

        const newUser = {
            id: data.length ? Math.max(...data.map(d => d.id)) + 1 : 1,
            name,
            email,
            phone: mobile
        };

        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(res => {
                setData([...data, res]);
                setNotification('User added successfully!');
                handleClear();
            })
            .catch(error => setNotification('Error saving data.'));
    };

    // Function to handle updating an existing user
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!name || !email || !mobile) {
            setNotification('All fields are required.');
            return;
        }

        const updatedUser = {
            id,
            name,
            email,
            phone: mobile
        };

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(res => {
                setData(data.map(user => (user.id === id ? res : user)));
                setNotification('User updated successfully!');
                handleClear();
            })
            .catch(error => setNotification('Error updating data.'));
    };

    // Function to handle deleting a user
    const handleDelete = (id) => {
        if (id > 0 && window.confirm("Are you sure you want to delete this user?")) {
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'DELETE'
            })
                .then(res => {
                    if (res.ok) {
                        setData(data.filter(user => user.id !== id));
                        setNotification('User deleted successfully!');
                    } else {
                        setNotification('Error deleting data.');
                    }
                })
                .catch(error => setNotification('Error deleting data.'));
        }
    };

    // Function to show the modal for adding/editing a user
    const handleShowModal = () => setShowModal(true);

    return (
        <div className="container">
            {loading && <Loader />}
            {notification && <Alert variant="info">{notification}</Alert>}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Mobile</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    style={{ marginRight: '8px' }}
                                    onClick={() => handleEdit(user.id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showModal} onHide={handleClear}>
                <Modal.Header closeButton>
                    <Modal.Title>{isUpdate ? 'Update User' : 'Add User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserForm
                        isUpdate={isUpdate}
                        onSubmit={isUpdate ? handleUpdate : handleSave}
                        onClear={handleClear}
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        mobile={mobile}
                        setMobile={setMobile}
                    />
                </Modal.Body>
            </Modal>
            <div className="container" style={{ display: 'grid', placeItems: 'center' }}>
                <div className="mb-3">
                    <Button variant="primary" onClick={handleShowModal}>Add User</Button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
