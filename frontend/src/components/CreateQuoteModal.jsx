import { useState } from "react";

export default function CreateQuoteModal({ onClose, onQuoteCreated, user }) {
  const [quote, setQuote] = useState("");

  const submitQuote = async (e) => {
    e.preventDefault();
    if (!quote.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/user_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: user?.name || "Guest", quote, author }),
      });

      if (!res.ok) throw new Error("Failed to post quote");
      await res.json();

      alert("Quote created!");
      setQuote("");
      onClose();
      onQuoteCreated();
    } catch (err) {
      console.error("Submit quote error:", err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Create a Quote</h2>
        <form onSubmit={submitQuote}>
          <textarea
            placeholder="Write your quote..."
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
          />
          <div className="modal-actions">
            <button className="btn" type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
