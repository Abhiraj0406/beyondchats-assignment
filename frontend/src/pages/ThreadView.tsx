import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ThreadView() {
  const { id } = useParams();
  const [thread, setThread] = useState<any>(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetchThread();
  }, []);

  const fetchThread = async () => {
    const res = await api.get(`/emails/threads/${id}`);
    setThread(res.data);
  };

  const sendReply = async () => {
    try {
      await api.post("/emails/reply", {
        thread_id: thread.id,
        message: reply
      });

      alert("Reply sent!");
      setReply("");
    } catch (err) {
      alert("Failed to send reply");
    }
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

      <div className="mt-8 border-t pt-6">

        <h2 className="font-semibold mb-2">Reply</h2>

        <textarea
          className="w-full border p-3 rounded"
          rows={4}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write your reply..."
        />

        <button
          onClick={sendReply}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send Reply
        </button>

      </div>

    </div>
  );
}