import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GameRedirect = ({ roomId }) => {
  const navigate = useNavigate();

  console.log("ok 1");
  useEffect(() => {
    console.log("ok 2");
    
    navigate(`/game/${roomId}`);
  }, [roomId, navigate]);

  return null;
};

export default GameRedirect;
