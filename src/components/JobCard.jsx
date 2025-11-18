import '../styles/JobCard.scss';
import { Link } from 'react-router-dom';
import { deleteJob } from '../helpers/appwriteJobData';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useModal } from '../store/modalStore';
import Button from './Button'
import deleteIcon from '../assets/delete.svg';

const JobCard = ({ data: { $id, jobTitle, employer, jobDetails, unemployed } }) => {
  const queryClient = useQueryClient();

  const {openModal} = useModal();

  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobList'] });
    },
    onError: (error) => {
      console.error('Something went wrong:', error);
    },
  });

  const handleDeleteJob = (e, $id) => {
    e.preventDefault(); //prevents the link from navigating
    e.stopPropagation();
    openModal({
      itemId: $id,
      itemType: 'job',
      message: 'Are you sure you want to permanently delete this job?',
      onConfirm: ($id) => deleteMutation.mutate($id),
    });
  };

  return (
    <Link to={`/JobDetails/${$id}`} className="job-card">
      <div className="header">
        <h3>{jobTitle}</h3>
        <Button variant="delete" className='delete-button' onClick={(e)=>handleDeleteJob(e, $id)}><img src={deleteIcon} alt="Delete" /></Button>
      </div>
      <section className='job-card-details'>
        <span>{employer} - </span>
        <span>{jobDetails} </span>
        {/* {unemployed && <span>Unemployed</span>} */}
      </section>
    </Link>
  );
};

export default JobCard;
