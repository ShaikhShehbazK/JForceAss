
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function AdminDashboard() {
  const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
  const navigate = useNavigate();

  const [feedbackList, setFeedbackList] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }

    loadFeedback();
  }, []);

  async function loadFeedback() {
    try {
      const response = await fetch(
        'http://localhost:8080/admin/feedback'
      );

      if (!response.ok) {
        throw new Error('Unable to load feedback');
      }

      const data = await response.json();
      setFeedbackList(data);

    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEdit(id, oldFeedback) {
    const updatedFeedback = prompt('Update feedback:', oldFeedback);

    if (!updatedFeedback || !updatedFeedback.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/admin/feedback/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ feedback: updatedFeedback })
        }
      );

      if (!response.ok) {
        throw new Error('Could not update feedback');
      }

      setMessage('Feedback updated successfully!');
      loadFeedback();

    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this feedback?')) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/admin/feedback/${id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Could not delete feedback');
      }

      setMessage('Feedback deleted successfully!');
      loadFeedback();

    } catch (err) {
      setError(err.message);
    }
  }

  if (!user || user.role !== 'ADMIN') return null;

  return (
    <>
      <Navbar title="Admin Dashboard" />

      <div className="container mt-4">
        <h3>Admin Dashboard</h3>
        <p className="text-muted">Manage customer feedback.</p>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">All Feedback</h5>

            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>ID</th>
                    <th>User Email</th>
                    <th>Feedback</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {feedbackList.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No feedback available.
                      </td>
                    </tr>
                  ) : (
                    feedbackList.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.user?.email}</td>
                        <td>{item.feedback}</td>
                        <td>{item.createdDate}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEdit(item.id, item.feedback)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
