import { useState, useEffect } from 'react';

const useUsers = ({ firebase, user }) => {
  const [userData, setUserData] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    /* Retrieve User data */
    firebase.user(user.uid).on('value', (snapshot) => {
      const data = snapshot.val();
      setUserData({
        ...data,
        winRatio: Math.round((data.win / data.total) * 100) / 100 || 0,
      });
    });
    return () => firebase.user(user.uid).off();
  }, [firebase, user]);

  useEffect(() => {
    /* Retrieve User logs */
    firebase.log(user.uid).on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const logArr = Object.keys(data)
          .map(key => ({ id: key, ...data[key] }));
        setLogs(logArr);
      }
    });
    return () => firebase.logs(user.uid).off();
  }, [firebase, user]);
  return {
    userData,
    logs,
  };
};

export default useUsers;
