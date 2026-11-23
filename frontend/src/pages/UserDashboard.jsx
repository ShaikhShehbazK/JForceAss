
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function UserDashboard() {
  const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState('');
  const [myFeedback, setMyFeedback] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    loadFeedback();
  }, []);

  async function loadFeedback() {
    try {
      const response = await fetch(
        `http://localhost:8080/feedback/my/${user.id}`
      );

      if (!response.ok) {
        throw new Error('Unable to load feedback');
      }

      const data = await response.json();
      setMyFeedback(data);

    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch(
        `http://localhost:8080/feedback/add?userId=${user.id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ feedback })
        }
      );

      if (!response.ok) {
        throw new Error('Could not submit feedback');
      }

      setFeedback('');
      setMessage('Feedback submitted successfully!');
      loadFeedback();

    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEdit(id, oldFeedback) {
    const updatedFeedback = prompt('Update your feedback:', oldFeedback);

    if (!updatedFeedback || !updatedFeedback.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/feedback/update/${id}`,
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

  if (!user) return null;

  return (
    <>
      <Navbar title="User Dashboard" />

      <div className="container mt-4">
        <h3>Welcome, {user.username}</h3>
        <p className="text-muted">Share your feedback with us.</p>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="mb-3">Submit Feedback</h5>

            <form onSubmit={handleSubmit}>
              <textarea
                className="form-control mb-3"
                rows="4"
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />

              <button className="btn btn-primary">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>

        <h5 className="mb-3">My Feedback</h5>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Feedback</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {myFeedback.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No feedback submitted yet.
                  </td>
                </tr>
              ) : (
                myFeedback.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.feedback}</td>
                    <td>{item.createdDate}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEdit(item.id, item.feedback)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
