import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import JobForm from "./components/JobForm";
import JobDetails from "./components/JobDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "new", element: <JobForm mode="create"/>},
            {path: ":jobId/edit", element: <JobForm mode="edit"/>},
            {path: "JobDetails/:jobId", element: <JobDetails/>}
        ]
    }
])