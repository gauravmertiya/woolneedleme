import { useState, useEffect } from "react";

interface Review {
  name: string;
  rating: number;
  comment: string;
}

const ReviewSection = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  // Load reviews
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reviews") || "{}");
    setReviews(data[productId] || []);
  }, [productId]);

  // Save review
  const handleSubmit = () => {
    if (!name || !comment) return;

    const newReview = { name, comment, rating };

    const allReviews = JSON.parse(localStorage.getItem("reviews") || "{}");

    const updated = {
      ...allReviews,
      [productId]: [...(allReviews[productId] || []), newReview],
    };

    localStorage.setItem("reviews", JSON.stringify(updated));

    setReviews(updated[productId]);
    setName("");
    setComment("");
    setRating(5);
  };

  // Average rating
  const avg =
    reviews.length > 0
      ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)
      : "No ratings";

  return (
    <div className="mt-16">

      <h2 className="text-xl font-semibold mb-4">
        ⭐ Reviews ({reviews.length}) - {avg}
      </h2>

      {/* Review List */}
      <div className="space-y-4 mb-6">
        {reviews.map((r, i) => (
          <div key={i} className="border p-4 rounded-lg">
            <div className="flex justify-between">
              <p className="font-medium">{r.name}</p>
              <span className="text-yellow-500">
                {"★".repeat(r.rating)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {r.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Add Review */}
      <div className="border p-4 rounded-lg space-y-3">
        <h3 className="font-medium">Write a Review</h3>

        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          placeholder="Your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border px-3 py-2 rounded"
        >
          {[5,4,3,2,1].map((r) => (
            <option key={r} value={r}>
              {r} Stars
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-primary text-primary-foreground px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;