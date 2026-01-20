import { useState } from "react";
import Modal from "./Modal";

export default function CreateQuoteModal({ user, onClose, onCreated }) {
  const [quote, setQuote] = useState("");
  const name = user?.name || "";

  const submitQuote = async (e) => {
    e.preventDefault();
    if (!quote.trim()) return;

    await fetch("http://localhost:3000/user_profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quote }),
    });

    setQuote("");
    onClose();
    onCreated();
  };

  return (
    <Modal onClose={onClose}>
      <h2>Create a Quote</h2>
      <form onSubmit={submitQuote}>
        <textarea
          placeholder="Write your quote..."
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="primary">
            Post
          </button>
        </div>
      </form>
    </Modal>
  );
}
