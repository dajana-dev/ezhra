import '../styles/JobCard.scss';
import { Link } from 'react-router-dom';
import { deleteJob } from '../helpers/appwriteJobData';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const JobCard = ({ data: { $id, jobTitle, employer, jobDetails, unemployed } }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobList'] });
    },
    onError: (error) => {
      console.error('Something went wrong:', error);
    },
  });

  const handleDeleteJob = (e) => {
    e.preventDefault(); //prevents the link from navigating

    deleteMutation.mutate($id);
  };

  return (
    <Link to={`/JobDetails/${$id}`} className="job-card">
      <div className="header">
        <h3>{jobTitle}</h3>
      <button onClick={handleDeleteJob}>X</button>
      </div>
      <section>
        <span>{employer}</span>
        <span>{jobDetails}</span>
        {unemployed && <span>Unemployed</span>}
      </section>
    </Link>
  );
};

export default JobCard;
