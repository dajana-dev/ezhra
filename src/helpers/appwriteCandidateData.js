import { Query } from "appwrite";
import { databases, DATABASE_ID } from "./appwrite";

const COLLECTION_ID = 'employeedata';

export const postCandidateData = async (candidate) => {
    const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        "unique()",
        candidate,
    );
    return response;
}

export const fetchCandidateData = async (jobId) => {
    const response = await databases.listDocuments({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID,
        queries: [
            Query.equal('shiftID', jobId)
        ],
    });
    return response.documents;
}

export const updateCandidateData = async ({candidateId, data}) => {
    const response = await databases.updateDocument({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID,
        documentId: candidateId,
        data: data,
    })
}

export const deleteCandidate = async (candidateId) => {
    const response = await databases.deleteDocument({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID,
        documentId: candidateId,
    })
}