import "../styles/JobCard.scss"
import { Link } from "react-router-dom";

const JobCard = ({data : {$id, jobTitle, employer, jobDetails, unemployed}}) => {
    return ( 
        <Link to={`/JobDetails/${$id}`} className="job-card">
            <h3>{jobTitle}</h3>
            <section>
                <span>{employer}</span>
                <span>{jobDetails}</span>
                {unemployed && (<span>Unemployed</span>)}
            </section>
        </Link>
     );
}
 
export default JobCard;