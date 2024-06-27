import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadList from '../components/ThreadList';
import { fetchThreads } from '../redux/slices/threadSlice';
import { fetchUser } from '../redux/slices/authSlice'; // Import fungsi fetchUser dari service API
import Header from '../components/Header';
import DataFetchingComponent from '../components/DataFetching';

function HomePage() {
  const dispatch = useDispatch();
  const { data, status, error: threadError } = useSelector((state) => state.threads);
  const [usersMap, setUsersMap] = useState({});

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  useEffect(() => {
    const fetchUsersData = async () => {
      if (data) {
        try {
          // Ambil setiap ownerId unik dari data thread
          const uniqueOwnerIds = Array.from(new Set(data.map((thread) => thread.ownerId)));

          // Untuk setiap ownerId, ambil informasi pengguna
          const fetchUserPromises = uniqueOwnerIds.map(async (ownerId) => {
            try {
              const user = await fetchUser(ownerId); // Ambil informasi pengguna dari API
              return { ownerId, name: user.name };
            } catch (fetchUserError) {
              console.error(`Failed to fetch user ${ownerId}:`, fetchUserError);
              return { ownerId, name: 'Unknown' }; // Jika gagal, atur sebagai "Unknown"
            }
          });

          // Eksekusi semua permintaan pengguna secara bersamaan
          const usersData = await Promise.all(fetchUserPromises);

          // Ubah array data pengguna menjadi map dengan ownerId sebagai kunci
          const usersMapData = usersData.reduce(
            (map, userData) => ({ ...map, [userData.ownerId]: userData.name }),
            {},
          );

          // Perbarui state usersMap
          setUsersMap(usersMapData);
        } catch (fetchUsersError) {
          console.error('Failed to fetch users data:', fetchUsersError);
        }
      }
    };

    fetchUsersData();
  }, [data]);

  return (
    <div className="home-page">
      <Header />
      {status === 'loading' && <DataFetchingComponent />}
      {status === 'success' && data && <ThreadList threads={data} usersMap={usersMap} />}
      {' '}
      {/* Kirim usersMap sebagai prop */}
      {status === 'failed' && <p>{threadError}</p>}
    </div>
  );
}

export default HomePage;
