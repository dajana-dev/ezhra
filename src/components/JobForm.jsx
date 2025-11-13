import { useState } from 'react';
import '../styles/JobForm.scss';
import { postJobData } from '../helpers/appwriteJobData.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const JobForm = ({ closeForm }) => {
  const inputFields = [
    { name: 'jobTitle', label: 'Job title', type: 'text', required: true },
    { name: 'employer', label: 'Employer', type: 'text', required: true },
    { name: 'jobDetails', label: 'Job details', type: 'textarea', required: true },
    { name: 'unemployed', label: 'Unemployed', type: 'checkbox' },
  ];

  const [jobData, setJobData] = useState({
    jobTitle: '',
    employer: '',
    jobDetails: '',
    unemployed: false,
  });

  const queryClient = useQueryClient();

  const {
    mutateAsync: postJobDataMutation,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: postJobData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobList'] });
      setTimeout(() => {
        closeForm();
      }, 1000);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    postJobDataMutation(jobData);
  };

  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      const nextElement = form.elements[index + 1];
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const renderInput = ({ label, name, type, required }) => {
    switch (type) {
      case 'textarea':
        return (
          <div key={label}>
            <label htmlFor={name}>{label}</label>
            <textarea name={name} id={name} placeholder={`Enter ${label}`} onChange={handleChange} />
          </div>
        );
      case 'checkbox':
        return (
          <div key={label}>
            <input type={type} id={name} name={name} checked={jobData[name]} onChange={handleChange} />
            <label>{label}</label>
          </div>
        );
      default:
        return (
          <div key={label}>
            <label htmlFor={name}>{label}: </label>
            <input type={type} id={name} name={name} placeholder={`Enter ${label}`} required={required} onChange={handleChange} onKeyDown={handlePressEnter} />
          </div>
        );
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setJobData({
      ...jobData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <button onClick={closeForm}>Close</button>
      {inputFields.map(renderInput)}

      <button type="Submit" disabled={isPending}>
        {isPending ? 'Posting...' : 'Submit'}
      </button>

      {isSuccess && <p>Job posted!</p>}
      {isError && <p>Something went wrong: {error.message}</p>}
    </form>
  );
};

export default JobForm;
