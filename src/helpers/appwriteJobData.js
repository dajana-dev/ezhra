import { databases, DATABASE_ID } from "./appwrite";

const COLLECTION_ID = "jobdata";

export const postJobData = async (jobData) => {
        const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            "unique()",
            jobData
        );
        return response;
};

export const fetchJobsList = async () => {
    const response = await databases.listDocuments({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID});
    return response.documents;
}

export const deleteJob = async (jobId) => {
    const response = await databases.deleteDocument({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID,
        documentId: jobId,
    })
}