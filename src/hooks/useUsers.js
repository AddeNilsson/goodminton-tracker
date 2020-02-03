import { useState, useEffect } from 'react';

const useUsers = ({ firebase, setLoading }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    firebase.users().on('value', (snapshot) => {
      const data = snapshot.val();
      const usersData = data
        ? Object.keys(data)
          .map(key => ({
            uid: key,
            ...data[key],
          }))
          .map(u => ({
            ...u,
            ratio: Math.round((u.win / u.total) * 100) / 100 || 0,
          }))
          .sort((a, b) => (
            a.ratio > b.ratio ? -1 : b.ratio > a.ratio ? 1 : 0
          ))
        : [];
      setUsers(usersData);
      setLoading(false);
    });
    return () => firebase.users().off();
  }, [firebase, setLoading]);
  return {
    users,
  };
};

export default useUsers;
