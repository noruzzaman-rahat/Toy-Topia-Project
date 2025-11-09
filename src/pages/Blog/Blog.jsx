import React, { useEffect, useMemo, useState } from "react";

// ✅ ToyTopia Blog Page (TailwindCSS + DaisyUI)
// Paste this component inside your `pages` folder and link it via router

const MOCK_POSTS = [
  {
    id: 1,
    title: "Top 10 STEM Toys That Spark Curiosity",
    excerpt:
      "এক ঝলকে দেখুন—কোন STEM খেলনাগুলো বাচ্চাদের কৌতূহল ও সমস্যা সমাধানের দক্ষতা সবচেয়ে বেশি বাড়ায়।",
    category: "STEM",
    tags: ["science", "math", "engineering"],
    author: "Raiyan",
    date: "2025-10-12",
    cover:
      "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?q=80&w=1400&auto=format&fit=crop",
    readTime: 6,
  },
  {
    id: 2,
    title: "Montessori Toys: কেন এগুলো এত জনপ্রিয়?",
    excerpt:
      "Montessori খেলনাগুলো কীভাবে স্বাধীন শেখাকে উৎসাহ দেয় এবং কোন বয়সে কোন ধরনের খেলনা উপযোগী—জানুন।",
    category: "Montessori",
    tags: ["early-learning", "wooden", "motor-skills"],
    author: "Anika",
    date: "2025-09-05",
    cover:
      "https://images.unsplash.com/photo-1594240974614-37efc9e3aa3d?q=80&w=1400&auto=format&fit=crop",
    readTime: 5,
  },
  {
    id: 3,
    title: "Budget Toys Under ৳1000: Parents' Guide",
    excerpt:
      "কম বাজেটে সেরা খেলনা—শিশুর বয়স, নিরাপত্তা এবং টেকসই হওয়ার উপর ভিত্তি করে একটি হ্যান্ডপিকড তালিকা।",
    category: "Budget",
    tags: ["deals", "gift", "affordable"],
    author: "Mehedi",
    date: "2025-08-22",
    cover:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1400&auto=format&fit=crop",
    readTime: 4,
  },
  {
    id: 4,
    title: "Wooden vs. Plastic Toys: কোনটা ভালো?",
    excerpt:
      "উডেন খেলনা বনাম প্লাস্টিক—নিরাপত্তা, টেকসই ও পরিবেশগত প্রভাব নিয়ে বাস্তব বিশ্লেষণ।",
    category: "Guide",
    tags: ["eco", "safety", "materials"],
    author: "Sadia",
    date: "2025-08-01",
    cover:
      "https://images.unsplash.com/photo-1604882357861-1c12d21c28f6?q=80&w=1400&auto=format&fit=crop",
    readTime: 7,
  },
  {
    id: 5,
    title: "How to Pick Age-Appropriate Toys",
    excerpt:
      "০-২, ৩-৫, ৬-৮, ৯+—প্রতিটি বয়সগ্রুপের জন্য কোন খেলনা সঠিক এবং কেন, জানতে পড়ুন।",
    category: "Parenting",
    tags: ["age", "development", "skills"],
    author: "Nusrat",
    date: "2025-07-10",
    cover:
      "https://images.unsplash.com/photo-1517957754645-7085a86a783f?q=80&w=1400&auto=format&fit=crop",
    readTime: 8,
  },
  {
    id: 6,
    title: "Toy Safety Checklist for New Parents",
    excerpt:
      "শিশুর খেলনা কেনার আগে অবশ্যই যে নিরাপত্তা চেকগুলো করবেন—একটি প্রিন্টেবল চেকলিস্টসহ।",
    category: "Safety",
    tags: ["checklist", "quality", "standards"],
    author: "Irfan",
    date: "2025-06-18",
    cover:
      "https://images.unsplash.com/photo-1580674285050-2089d83d1fcd?q=80&w=1400&auto=format&fit=crop",
    readTime: 5,
  },
];

const CATEGORIES = ["All", "STEM", "Montessori", "Budget", "Guide", "Parenting", "Safety"];

export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey] = useState("newest");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    document.title = "ToyTopia | Blog";
  }, []);

  const filtered = useMemo(() => {
    let list = [...MOCK_POSTS];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== "All") list = list.filter((p) => p.category === category);

    if (sortKey === "newest") list.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sortKey === "oldest") list.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (sortKey === "readTime") list.sort((a, b) => a.readTime - b.readTime);

    return list;
  }, [query, category, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => setPage(1), [query, category, sortKey]);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero */}
      <section className="w-11/12 mx-auto pt-10">
        <div className="hero rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <div className="hero-content flex-col lg:flex-row gap-8 lg:gap-12">
            <img
              src="https://i.ibb.co.com/GQPBGYx5/hero-toys.jpg"
              className="w-full max-w-md rounded-2xl shadow-2xl"
            />
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">ToyTopia Blog</h1>
              <p className="py-6 text-base-content/80">
                টিপস, গাইড, এবং রিভিউ—আপনার শিশুর জন্য সঠিক খেলনা বাছাইয়ে সাহায্য করবে।
              </p>
              <div className="join w-full">
                <input
                  className="input input-bordered join-item w-full"
                  placeholder="Search articles, tags..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-primary join-item">Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="w-11/12 mx-auto mt-8 grid grid-cols-1 gap-4 lg:grid-cols-6">
        <div className="lg:col-span-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`btn btn-sm rounded-full ${
                  category === c ? "btn-primary" : "btn-ghost"
                }`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 flex items-center justify-start lg:justify-end gap-2">
          <span className="text-sm opacity-70">Sort by</span>
          <select
            className="select select-bordered select-sm"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="readTime">Shortest read</option>
          </select>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="w-11/12 mx-auto mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Posts */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {pageItems.map((p) => (
            <article key={p.id} className="card bg-base-100 shadow hover:shadow-lg transition">
              <figure>
                <img src={p.cover} alt={p.title} className="h-48 w-full object-cover" />
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-primary badge-sm">{p.category}</span>
                  <span className="text-xs opacity-70">
                    {new Date(p.date).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="card-title line-clamp-2">{p.title}</h2>
                <p className="text-sm opacity-80 line-clamp-3">{p.excerpt}</p>
                <div className="flex items-center justify-between text-sm mt-2">
                  <div className="flex items-center gap-2">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content w-7 rounded-full text-xs">
                        <span>{p.author.slice(0, 1)}</span>
                      </div>
                    </div>
                    <span className="opacity-80">{p.author}</span>
                  </div>
                  <span className="opacity-70">{p.readTime} min read</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="badge badge-outline">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="card-actions justify-end mt-3">
                  <button className="btn btn-sm btn-outline btn-primary">Read More</button>
                </div>
              </div>
            </article>
          ))}

          {pageItems.length === 0 && (
            <div className="col-span-full">
              <div className="alert alert-info">
                <span>No posts matched your filters. Try clearing search or switching category.</span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Featured Post</h3>
              <p className="opacity-80">
                শিশুদের জন্য সর্বশেষ STEM ট্রেন্ড—রোবট কিট, ম্যাগনেটিক ব্লক এবং আরও অনেক কিছু।
              </p>
              <button className="btn btn-primary btn-sm w-fit">Explore</button>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Subscribe to newsletter</h3>
              <p className="text-sm opacity-80">
                নতুন রিভিউ, ডিল এবং গাইড আপনার ইনবক্সে। সপ্তাহে ১ বার, স্প্যাম নয়।
              </p>
              <div className="join w-full">
                <input
                  type="email"
                  className="input input-bordered join-item w-full"
                  placeholder="you@example.com"
                />
                <button className="btn btn-secondary join-item">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">FAQ</h3>
              <div className="join join-vertical w-full">
                <div className="collapse collapse-arrow join-item border border-base-300">
                  <input type="checkbox" />
                  <div className="collapse-title text-base font-medium">
                    ToyTopia ব্লগের কনটেন্ট কি রিভিউড?
                  </div>
                  <div className="collapse-content">
                    <p>হ্যাঁ, প্রতিটি আর্টিকেল প্যারেন্টিং ও প্লে এক্সপার্টরা রিভিউ করে।</p>
                  </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                  <input type="checkbox" />
                  <div className="collapse-title text-base font-medium">
                    আমি কি গেস্ট পোস্ট জমা দিতে পারবো?
                  </div>
                  <div className="collapse-content">
                    <p>অবশ্যই! কন্টাক্ট পেজে ফর্ম পূরণ করে আপনার আইডিয়া পাঠান।</p>
                  </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                  <input type="checkbox" />
                  <div className="collapse-title text-base font-medium">
                    পোস্টে থাকা প্রোডাক্ট কোথায় পাবো?
                  </div>
                  <div className="collapse-content">
                    <p>প্রতিটি পোস্টে উল্লেখিত লিঙ্ক বা ToyTopia শপ সেকশনে খুঁজে পাবেন।</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Pagination */}
      <section className="w-11/12 mx-auto my-10 flex items-center justify-center">
        <div className="join">
          <button
            className="btn join-item"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            «
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`btn join-item ${page === i + 1 ? "btn-active" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn join-item"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            »
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="w-11/12 mx-auto mb-16">
        <div className="rounded-2xl bg-base-200 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Have a toy to review?</h3>
            <p className="opacity-80 mt-2">
              আপনার প্রিয় খেলনাটি নিয়ে লিখুন, আমরা ফিচার করব ToyTopia ব্লগে!
            </p>
          </div>
          <button className="btn btn-accent">Submit Guest Post</button>
        </div>
      </section>
    </div>
  );
}