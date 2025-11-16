import { useQuery } from '@tanstack/react-query';
import { deleteCandidate, fetchCandidateData, postCandidateData, updateCandidateData } from '../helpers/appwriteCandidateData';
import CandidateListItem from './CandidateListItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Modal from './Modal';

const CandidateList = ({ jobId }) => {
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);

  const initialCandidate = {
    shiftID: jobId, //shiftId comes from the initial idea (that was later suspended) to group candidates by shifts. I decided to keep it rather than replace it for the sake of possible future updates
    serial: '',
    name: '',
    phone: '',
  };

  const queryClient = useQueryClient();

  const { mutateAsync: postCandidateDataMutation, isPending: isPostPending } = useMutation({
    mutationFn: postCandidateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidatesList'] });
      setErrorMessage('');
    },
    onError: (error) => setErrorMessage(`Failed to add candidate: ${error.message}`),
  });

  const {
    data: candidates = [],
    isError: isFetchError,
    error: fetchError,
  } = useQuery({
    queryKey: ['candidatesList', jobId],
    queryFn: () => fetchCandidateData(jobId),
  });

  const { mutateAsync: updateCandidateMutation } = useMutation({
    mutationFn: updateCandidateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidatesList'] });
      setErrorMessage('');
    },
    onError: (error) => setErrorMessage(`Failed to update candidate: ${error.message}`),
  });

  const deleteCandidateMutation = useMutation({
    mutationFn: deleteCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidatesList'] });
      setErrorMessage('');
    },
    onError: (error) => {
      setErrorMessage(`Failed to delete candidate: ${error.message}`);
    },
  });

  const handleAddCandidate = () => {
    setEditingId('new');
    setErrorMessage('');
  };

  const handleOpenModal = (e, candidateId) => {
    e.stopPropagation();
    setIsModalOpen(true);
    setCandidateToDelete(candidateId);
  }

  const handleDeleteCandidate = (candidateToDelete) => {
    deleteCandidateMutation.mutate(candidateToDelete);
    handleCancelDelete();
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setCandidateToDelete(null);
  }

  const handleSave = (candidate) => {
    if (candidate.$id) {
      const { $id, ...data } = candidate;
      updateCandidateMutation({
        candidateId: $id,
        data,
      });
    } else {
      postCandidateDataMutation(candidate);
    }
    setEditingId(null);
  };

  return (
    <>
      {isFetchError && <div className="error-bubble">Failed to load candidates: {fetchError.message}</div>}
      {errorMessage && <div className="error-bubble">{errorMessage}</div>}

    <Modal
    handleOpenModal={handleOpenModal}
    isModalOpen={isModalOpen}
    handleCancelDelete={handleCancelDelete}
    handleDelete={()=>handleDeleteCandidate(candidateToDelete)}
    message="Are you sure you want to permanently delete this candidate?"
    />

      <ol>
        {candidates.map((candidate) => (
          <CandidateListItem
            key={candidate.$id}
            initialCandidate={candidate}
            setEditingId={setEditingId}
            editingId={editingId === candidate.$id}
            handleSave={handleSave}
            handleOpenModal={handleOpenModal}
          />
        ))}
        {editingId === 'new' && (
          <CandidateListItem key="new-candidate" initialCandidate={initialCandidate} setEditingId={setEditingId} editingId={true} handleSave={handleSave} />
        )}
      </ol>
      <button onClick={(e) => {
        e.stopPropagation();
        handleAddCandidate();
      }} disabled={isPostPending}>
        {isPostPending ? 'Adding...' : 'Add'}
      </button>
    </>
  );
};

export default CandidateList;
