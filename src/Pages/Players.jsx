import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChallengeModal from '../Components/ChallengeModal';
import PlayersList from '../Components/PlayersList';
import GameRedirect from '../Components/GameRedirect';
import Loader from '../Components/Loader';
import { sendChallenge } from '../Firebase/SendChallenge';
import ChallengesQueue from '../Components/ChallengesQueue';
import { getChallenges } from '../Firebase/UpdateChallanges';
import { generateChallengeId } from '../Firebase/generateConversationId';
import plyersBgImage from '../assets/images/playersBg.jpg'
import Header from '../Components/Header';

const Players = () => {
    const { currentUser, currentUserLoading } = useSelector((state) => state.currentUser);
    const { users, userLoading } = useSelector((state) => state.users);
    const [challengedPlayer, setChallengedPlayer] = useState(null);
    const [status, setStatus] = useState('pending');
    const [redirectRoomId, setRedirectRoomId] = useState(null);

    const handleChallenge = async (player) => {
        setChallengedPlayer(player);
        await sendChallenge(currentUser.uid, player.id);
    };

    useEffect(() => {
        if (currentUser && challengedPlayer) {
            const unsubscribe = getChallenges(challengedPlayer.id, (data) => {
                const currentChallenge = data?.find((data) => data.id === currentUser.uid)
                setStatus(currentChallenge.status)
                if (currentChallenge.status === "accepted") {
                    const roomId = generateChallengeId(currentUser.uid, challengedPlayer.id);
                    setRedirectRoomId(roomId);
                  }
                currentChallenge.status !== "pending" ? setChallengedPlayer(null) : ''
            });

            return () => {
                unsubscribe();
            };
        }

    }, [currentUser, challengedPlayer]);

    if (currentUserLoading || userLoading) {
        return <Loader />
    }


    if (status === 'accepted' && redirectRoomId) {
        return <GameRedirect roomId={redirectRoomId} />;
    }

    return (
        <div style={{backgroundImage:`url(${plyersBgImage})`}} className={`bg-center bg-cover bg-no-repeat h-screen`}>
            <div className='h-screen w-full bg-[#00000010]'>

            <Header/>
            <div className='flex bg-[#00000080] backdrop-blur-[15px]'>

            <PlayersList onChallenge={handleChallenge} challengedPlayer={challengedPlayer} users={users} currentUser={currentUser} />
            {challengedPlayer && (
                <ChallengeModal
                challenger={currentUser}
                    opponent={challengedPlayer}
                    setChallengedPlayer={setChallengedPlayer}
                    status={status}
                    />
                )}
            <ChallengesQueue currentUser={currentUser} users={users} />
                </div>
                </div>
        </div>
    );
};

export default Players;
