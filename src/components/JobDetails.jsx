import '../styles/JobDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSingleJob } from '../helpers/appwriteJobData';
import CandidateList from './CandidateList';
import JobForm from './JobForm';
import { useState } from 'react';
import Button from './Button'

const JobDetails = () => {
  const [isEditJob, setIsEditJob] = useState(false);

  const queryClient = useQueryClient();
  const { jobId } = useParams();
  const navigate = useNavigate();
  
  const isNewJob = jobId === 'new';

  // const cachedJob = queryClient.getQueryData(['jobList'])?.find((job) => job.$id === jobId);

  const {
    data: fetchedJob,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => fetchSingleJob(jobId),
    enabled: jobId !== 'new',
  });

  if(isNewJob) {
    return (
      <div className="job-details">
        <section className="job-details-container">
          <div className='job-data-container'>
            <JobForm onCancel={() => navigate('/')}/>
          </div>
        </section>
      </div>
    )
  }

  const job = fetchedJob;

  if (isPending && !job) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!job) return <p>Job not found.</p>;

  const { $createdAt, jobTitle, employer, jobDetails, unemployed } = job;
  const formattedCreatedAtDate = new Date($createdAt)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '.');

  return (
    <div className="job-details">

      <section className="job-details-container">
        <div className='job-data-container'>
          {isEditJob ? (<JobForm isEditJob={isEditJob} setIsEditJob={setIsEditJob} initialJob={job}/>) : (
            <>
            <header>
          <div>
          <h2>{employer}</h2>
          <Button onClick={()=> {setIsEditJob(true)}}>Edit</Button>
          </div>
          <p>{formattedCreatedAtDate}.</p>
        </header>
        <div>
          <h3>{jobTitle}</h3>
          <p>{jobDetails}</p>
        </div>
        </>
          )}
        
        </div>
      </section>
      <section className="candidates">
        <CandidateList jobId={jobId} />
      </section>
    </div>
  );
};

export default JobDetails;
