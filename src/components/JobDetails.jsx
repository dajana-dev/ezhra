import '../styles/jobDetails.scss';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSingleJob } from '../helpers/appwriteJobData';
import CandidateList from './CandidateList';

const JobDetails = () => {
  const queryClient = useQueryClient();
  const { jobId } = useParams();
  const cachedJob = queryClient.getQueryData(['jobList'])?.find((job) => job.$id === jobId);

  const {
    data: fetchedJob,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => fetchSingleJob(jobId),
    enabled: !cachedJob,
  });

  const job = !cachedJob ? fetchedJob : cachedJob;
  console.log(job);

  if (isPending && !job) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!job) return <p>Job not found.</p>;

  const { $createdAt, $updatedAt, jobTitle, employer, jobDetails, unemployed } = job;
  const formattedCreatedAtDate = new Date($createdAt)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '.');

  const formattedUpdatedAtDate = new Date($updatedAt).toLocaleDateString();

  return (
    <div className="job-details-container">
      <section className="job-details">
        <header>
          <h2>{employer}</h2>
          <p>{formattedCreatedAtDate}.</p>
        </header>
        <section>
          <h3>{jobTitle}</h3>
          <p>{jobDetails}</p>
        </section>
      </section>
      <section className="candidates">
        <CandidateList jobId={jobId} />
      </section>
    </div>
  );
};

export default JobDetails;
