import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ThreadView() {
  const { id } = useParams();
  const [thread, setThread] = useState<any>(null);

  useEffect(() => {
    fetchThread();
  }, []);

  const fetchThread = async () => {
    const res = await api.get(`/emails/threads/${id}`);
    setThread(res.data);
  };

  if (!thread) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        {thread.subject || "No Subject"}
      </h1>

      <div className="space-y-6">

        {thread.emails.map((email: any) => (
          <div key={email.id} className="border p-4 rounded">

            <div className="text-sm text-gray-600 mb-2">
              <p><strong>From:</strong> {email.from_email}</p>
              <p><strong>To:</strong> {email.to_email}</p>
            </div>

            <div className="text-gray-800">
              {email.body_text}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}