import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimit from "../components/RateLimit";
import toast from "react-hot-toast";
import Ncards from "../components/Ncards";
import api from "../lib/axios";
import NoNote from "../components/NoNote";

const Home = () => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/post");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimit(false);
      } catch (error) {
        console.error("Error Fething Notes", error);
        if (error.response.status === 429) {
          setIsRateLimit(true);
        } else {
          toast.error("Error Fetching Notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimit && <RateLimit />}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        {loading && (
          <div className="text-center text-primary py-18">Loading Notes...</div>
        )}

        {notes.length === 0 && !isRateLimit && <NoNote />}
        {notes.length > 0 && !isRateLimit && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Ncards key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
