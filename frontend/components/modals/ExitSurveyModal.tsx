import { useState } from 'react';

interface ExitSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function ExitSurveyModal({ isOpen, onClose, onSubmit }: ExitSurveyModalProps) {
  const [formData, setFormData] = useState({
    reason: '',
    feedback: '',
    rating: 5,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Exit Survey</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for leaving
            </label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a reason</option>
              <option value="too-expensive">Too expensive</option>
              <option value="missing-features">Missing features</option>
              <option value="found-better">Found a better alternative</option>
              <option value="not-useful">Not useful for my needs</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your feedback
            </label>
            <textarea
              value={formData.feedback}
              onChange={(e) => setFormData({...formData, feedback: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
              placeholder="What could we have done better?"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overall satisfaction
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({...formData, rating: star})}
                  className="text-2xl focus:outline-none"
                >
                  {star <= formData.rating ? '★' : '☆'}
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-500">
                {formData.rating} of 5
              </span>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
