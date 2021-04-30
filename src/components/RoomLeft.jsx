import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useAuth } from '../state/authState';

const RoomLeft = ({ roomId, roomAdmin }) => {
  const [roomMates, setRoomMates] = useState([]);
  const currentUser = useAuth((state) => state.currentUser);
  // beleiving that this will work
  useEffect(() => {
    const unsub = db
      .collection('rooms')
      .doc(roomId)
      .onSnapshot((doc) => {
        setRoomMates(doc.data().roomMates);
      });
    return () => {
      unsub();
    };
  }, [roomId]);

  return (
    <div
      style={{
        height: '100%',
        borderRight: '1px solid lightgray',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '8%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: '1px solid lightgray',
        }}
      >
        <h5 className="m-0">Room Mates</h5>
      </div>
      <div
        style={{
          overflowY: 'scroll',
          height: '92%',
          paddingLeft: '20px',
        }}
      >
        {roomMates.length > 0 &&
          roomMates.map((mate) => {
            return (
              <div key={mate.uid}>
                <div
                  key={mate.uid}
                  style={{ display: 'flex', flexDirection: 'column' }}
                  className="py-2 px-3"
                >
                  <p className="text-center">
                    {mate.username}
                    {currentUser.username === roomAdmin ? ' - Admin' : ''}
                  </p>
                </div>
                <hr className="m-0" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RoomLeft;
