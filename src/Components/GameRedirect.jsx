import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GameRedirect = ({ roomId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/game/${roomId}`);
  }, [roomId, navigate]);

  return null;
};

export default GameRedirect;
