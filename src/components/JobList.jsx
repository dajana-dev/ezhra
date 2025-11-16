import '../styles/JobList.scss';
import { fetchJobsList } from '../helpers/appwriteJobData';
import { useQuery } from '@tanstack/react-query';
import JobCard from './JobCard';
import { useSearch } from '../store/searchStore';

const JobList = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['jobList'],
    queryFn: fetchJobsList,
  });

  const { searchTerm } = useSearch();

const filteredData = (searchTerm !== '') ? data?.filter((job) => 
  job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
  job.employer.toLowerCase().includes(searchTerm.toLowerCase())
) : data;

  return (
    <div className="job-list">
      {isPending && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {filteredData && filteredData.length > 0 ? (filteredData.map((job) => <JobCard key={job.$id} data={job} />)) : (searchTerm && <p>No jobs found</p>)}
      {/*if there no filtered data but there is a search term, it means tehre are no results for that search term */}
    </div>
  );
};

export default JobList;
