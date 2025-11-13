import "../styles/jobDetails.scss"

const JobDetails = ({$id, jobTitle, employer, jobDetails, unemployed, $createdAt}) => {
    return ( 
        <div className="job-details-container">
            <header>
                <h3>{`${employer} ${jobTitle}`}</h3>
            </header>
        </div>
     );
}
 
export default JobDetails;