import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import JobForm from "./components/JobForm";
import JobDetails from "./components/JobDetails";
import JobList from "./components/JobList";
JobList

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "/", element: <JobList />},
            {path: ":jobId/edit", element: <JobForm mode="edit"/>},
            {path: "JobDetails/:jobId", element: <JobDetails/>}
        ]
    }
])