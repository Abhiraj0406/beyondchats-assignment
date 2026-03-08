import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Chats() {
  const [threads, setThreads] = useState([]);
    const navigate = useNavigate();     

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    const res = await api.get("/emails/threads");
    setThreads(res.data);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Chats</h1>

      <div className="space-y-4">
        {threads.map((thread: any) => (
          <div
            key={thread.id}
            onClick={() => navigate(`/thread/${thread.id}`)}
            className="border p-4 rounded hover:bg-gray-50 cursor-pointer"
          >
            <h2 className="font-semibold">
              {thread.subject || "No Subject"}
            </h2>

            <p className="text-sm text-gray-600">
              {thread.snippet}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {thread.emails.length} messages
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}