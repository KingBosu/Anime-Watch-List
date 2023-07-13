import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { auth } from '../../firebase';

interface Anime {
  id: string;
  title: string;
  status: string;
  type: string;
  episodes: number;
  synopsis: string;
}

function Profile() {
  const [watchlist, setWatchlist] = useState<Anime[]>([]);
  const [expandedSynopsisId, setExpandedSynopsisId] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const firestoreInstance = getFirestore();
        const user = auth.currentUser;
        const q = query(collection(firestoreInstance, 'users', user.uid, 'watchlist'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Anime[];
        setWatchlist(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWatchlist();
  }, []);

  const handleRemoveFromWatchlist = async (id: string) => {
    try {
      const firestoreInstance = getFirestore();
      const user = auth.currentUser;
      const docRef = doc(firestoreInstance, 'users', user.uid, 'watchlist', id);
      await deleteDoc(docRef);
      setWatchlist((prevWatchlist) => prevWatchlist.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSynopsisToggle = (id: string) => {
    setExpandedSynopsisId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
    
      <h3>CurrentWatchList</h3>
      <div className="row">
        {watchlist.length > 0 ? (
          watchlist.map((anime) => (
            <div key={anime.id} className="col-md-4 mb-4">
              <div className="card">
                <img className="card-img-top" src={anime.image} alt={anime.title} />
                <div className="card-body">
                  <h5 className="card-title">{anime.title}</h5>
                  <p className="card-text">Status: {anime.status}</p>
                  <p className="card-text">Type: {anime.type}</p>
                  <p className="card-text">Episodes: {anime.episodes}</p>
                  <p className="card-text">
                    {expandedSynopsisId === anime.id ? anime.synopsis : ''}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSynopsisToggle(anime.id)}
                  >
                    {expandedSynopsisId === anime.id ? 'Hide Summary' : 'Summary'}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromWatchlist(anime.id)}
                  >
                    Remove from Watchlist
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No items in watchlist</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
