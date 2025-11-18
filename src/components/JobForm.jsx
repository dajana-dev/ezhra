import { useState } from 'react';
import '../styles/JobForm.scss';
import { postJobData, updateJobData } from '../helpers/appwriteJobData.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';

const JobForm = ({ setIsEditJob, isEditJob, initialJob, onCancel }) => {
  const inputFields = [
    { name: 'employer', label: 'Employer', type: 'text', required: true },
    { name: 'jobTitle', label: 'Job title', type: 'text', required: true },
    { name: 'jobDetails', label: 'Job details', type: 'textarea', required: true },
    { name: 'unemployed', label: 'Unemployed', type: 'checkbox' },
  ];

  const navigate = useNavigate();

  const [jobData, setJobData] = useState(
    initialJob
      ? {
          jobTitle: initialJob.jobTitle,
          employer: initialJob.employer,
          jobDetails: initialJob.jobDetails,
          unemployed: initialJob.unemployed,
        }
      : {
          jobTitle: '',
          employer: '',
          jobDetails: '',
          unemployed: false,
        }
  );

  const queryClient = useQueryClient();

  const {
    mutateAsync: postJobDataMutation,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: postJobData,
    onSuccess: (newJob) => {
      console.log(newJob);
      console.log(newJob.$id);
      queryClient.invalidateQueries({ queryKey: ['jobList'] });
      setTimeout(() => {
        if (newJob.$id) {
          navigate(`/JobDetails/${newJob.$id}`, { replace: true });
        }
      }, 1000);
    },
  });

  const { mutateAsync: updateJobMutation } = useMutation({
    mutationFn: updateJobData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job', initialJob.$id] });
      queryClient.invalidateQueries({ queryKey: ['jobList'] });
      if (isEditJob) {
        setIsEditJob(false);
      }
    },
    onError: (error) => {
      console.error(`Failed to update job: ${error.message}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialJob) {
      updateJobMutation({
        jobId: initialJob.$id,
        data: jobData,
      });
    } else {
      postJobDataMutation(jobData);
    }
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

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (setIsEditJob) {
      setIsEditJob(false);
    }
  };

  const renderInput = ({ label, name, type, required }) => {
    switch (type) {
      case 'textarea':
        return (
          <div key={label}>
            <label htmlFor={name}>{label}</label>
            <textarea name={name} id={name} value={jobData[name]} placeholder={`Enter ${label}`} onChange={handleChange} />
          </div>
        );
      case 'checkbox':
        return (
          <div key={label} className={name}>
            <input type={type} id={name} name={name} checked={jobData[name]} onChange={handleChange} />
            <label>{label}</label>
          </div>
        );
      default:
        return (
          <div key={label}>
            <label htmlFor={name}>{label}: </label>
            <input
              type={type}
              id={name}
              name={name}
              value={jobData[name]}
              placeholder={`Enter ${label}`}
              required={required}
              onChange={handleChange}
              onKeyDown={handlePressEnter}
            />
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
      {inputFields.map(renderInput)}

      <div className="form-buttons">
        <Button variant="primary" type="Submit" disabled={isPending}>
          {isPending ? 'Posting...' : 'Submit'}
        </Button>
        <Button variant="primary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
      {isSuccess && <p>Job posted!</p>}
      {isError && <p>Something went wrong: {error.message}</p>}
    </form>
  );
};

export default JobForm;
