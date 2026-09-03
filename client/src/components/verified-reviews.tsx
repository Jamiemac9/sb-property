import { ExternalLink, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const verifiedReviews = [
  {
    title: "Remove rubbish from yard and garage",
    text: "Excellent friendly and reliable service.",
    location: "ST3",
  },
  {
    title: "Removal of sofa and garage items",
    text: "Great company. They were friendly, fast and easy to get hold of. Also one of the best offers from all the companies I looked at.",
    location: "WS15",
  },
  {
    title: "House clearance",
    text: "Amazing, Bryan and his team did a brilliant house clearance, would not hesitate to recommend them to anyone.",
    location: "ST15",
  },
];

export const checkatradeUrl =
  "https://www.checkatrade.com/trades/SBPropertyClearance/reviews";
export const googleReviewsUrl =
  "https://www.google.com/search?q=SB+Property+Clearance+Stafford+reviews";

export default function VerifiedReviews({ compact = false }: { compact?: boolean }) {
  const reviews = compact ? verifiedReviews.slice(0, 2) : verifiedReviews;

  return (
    <section aria-labelledby="verified-reviews-heading" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex justify-center gap-1 mb-3" aria-label="10 out of 10">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 id="verified-reviews-heading" className="text-3xl font-bold text-gray-900">
            Quality reviews from Checkatrade and Google
          </h2>
          <p className="mt-3 text-gray-600">Recent feedback from our public review profiles</p>
        </div>
        <div className={`grid gap-6 ${reviews.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 max-w-4xl mx-auto"}`}>
          {reviews.map((review) => (
            <Card key={review.title} className="border-brand-green/20 shadow-sm">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-gray-700 leading-relaxed">“{review.text}”</blockquote>
                <p className="mt-4 text-sm font-semibold text-gray-900">{review.title}</p>
                <p className="text-xs text-gray-500">Verified reviewer · Job area {review.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <Button asChild variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
            <a href={checkatradeUrl} target="_blank" rel="noopener noreferrer">
              Read Checkatrade reviews <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white">
            <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer">
              Read Google reviews <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
