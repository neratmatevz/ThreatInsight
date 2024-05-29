import React, { useEffect, useState } from 'react';
import './EditModal.css';
import { auth } from '../../../../Firebase/firebase';
import { useAuth } from '../../../../context/AuthContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: { id: string, name: string, notes: string };
  title: string;
}

const EditModal: React.FC<ModalProps> = ({ isOpen, onClose, content, title }) => {
  const { user } = useAuth(); 
  const [name, setName] = useState<string>(content.name);
  const [notes, setNotes] = useState<string>(content.notes);
  const [statusOk, setStatusOk] = useState<string | null>(null);
  const [statusFail, setStatusFail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setName(content.name);
      setNotes(content.notes);
      setStatusFail(null);
      setStatusOk(null);
    }

    if (user) {
      auth.currentUser?.getIdToken(true).then((idToken) => {
          setToken(idToken);
      }).catch((error) => {
          console.error('Error getting token:', error);
      });
  }
  }, [isOpen, content]);

  const handleEditScan = () => {

    const editedScan = {
      userUID: user?.uid,
      searchUID: content.id,
      name: name,
      notes: notes
    }
    fetch(
      `${process.env.REACT_APP_API_URL}/search`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editedScan)
      }
    ).then(response => {

      if (response.ok) {
        setStatusOk("Scan updated successfully!");
      } else {
        setStatusFail("Failed updating scan!");
      }

    }).catch(err => {
      console.error(err.message);
    });
  }

  if (!isOpen) return null;


  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className='modal-content'>
          <div className="search-form-container">
            <div className="custom-form-group">
              <label htmlFor="name" className="custom-form-label">Name</label>
              <input
                type="name"
                id="name"
                className="custom-form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="custom-form-group">
              <label htmlFor="notes" className="custom-form-label">Notes</label>
              <textarea
                id="notes"
                className="custom-form-control"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={200}
                rows={4}
                required
              />
              <small className="custom-form-text">{notes.length}/200</small>
            </div>
            <p>
            {statusOk ? <span className="status-ok">{statusOk}</span> : <></>}
            {statusFail ? <span className="status-fail">{statusFail}</span> : <></>}
            </p>
            <div className="button-container">
              <button className="btn-edit" onClick={handleEditScan}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;