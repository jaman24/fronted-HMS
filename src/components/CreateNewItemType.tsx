import React, { useState } from 'react';

const CreateItemType: React.FC = () => {
  const [itemType, setItemType] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/item-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: itemType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create item type');
      }

      setSuccessMessage('Item type created successfully!');
      setItemType(''); // Clear the input field after successful request
    } catch (error) {
      setErrorMessage('Failed to create item type. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Item Type</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="form-group">
          <label htmlFor="itemType">Item Type</label>
          <input
            type="text"
            className="form-control"
            id="itemType"
            placeholder="Enter item type"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateItemType;
