import '../styles/JobList.scss';
import { fetchJobsList } from '../helpers/appwriteJobData';
import { useQuery } from '@tanstack/react-query';
import JobCard from './JobCard';

const JobList = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['jobList'],
    queryFn: fetchJobsList,
  });

  console.log(data);
  return (
    <div className="wrapper">
      {isPending && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {data && (
        <>
          {data.map((job) => (
            <JobCard key={job.$id} data={job} />
          ))}
        </>
      )}
    </div>
  );
};

export default JobList;
