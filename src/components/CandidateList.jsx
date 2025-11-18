import { useQuery } from '@tanstack/react-query';
import { deleteCandidate, fetchCandidateData, postCandidateData, updateCandidateData } from '../helpers/appwriteCandidateData';
import CandidateListItem from './CandidateListItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useModal } from '../store/modalStore';
import Button from './Button'
import '../styles/CandidateList.scss';

const CandidateList = ({ jobId }) => {
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { openModal } = useModal();

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
    console.log('X button clicked, id:', candidateId);
    e.stopPropagation();
    openModal({
      itemId: candidateId,
      itemType: 'candidate',
      message: 'Are you sure you want to permanently delete this candidate?',
      onConfirm: (id) => deleteCandidateMutation.mutate(id),
    });
  };

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
    <div className='candidates-field'>
      {isFetchError && <div className="error-bubble">Failed to load candidates: {fetchError.message}</div>}
      {errorMessage && <div className="error-bubble">{errorMessage}</div>}

      <ol className='candidate-list'>
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
      <Button onClick={(e) => {
        e.stopPropagation();
        handleAddCandidate();
      }} disabled={isPostPending}>{isPostPending ? 'Adding...' : 'Add'}</Button>
    </div>
  );
};

export default CandidateList;
