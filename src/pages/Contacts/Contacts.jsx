import React, { useEffect, useState } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  topic: "General",
  subject: "",
  message: "",
  agree: false,
  file: null,
  hp: "",
};

export default function Contacts() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.title = "ToyTopia | Contact";
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(form.email))
      e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.length < 10)
      e.message = "Message must be at least 10 characters";
    else if (form.message.length > 600)
      e.message = "Message must be under 600 characters";
    if (form.phone && !/^[0-9+\-()\s]{6,20}$/.test(form.phone))
      e.phone = "Enter a valid phone";
    if (!form.agree) e.agree = "You must accept the terms";
    if (form.hp) e.hp = "Spam detected";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const reset = () => {
    setForm(initialState);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else if (type === "file") {
      setForm((f) => ({ ...f, [name]: files?.[0] || null }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setToast({ type: "error", text: "Please fix the errors and try again." });
      return;
    }
    setSubmitting(true);
    await new Promise((res) => setTimeout(res, 900));
    setSubmitting(false);
    setToast({ type: "success", text: "Thanks! Your message has been sent." });
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center mx-auto bg-base-100 px-4 py-10">
      <div className="w-full max-w-6xl mx-auto space-y-10">
        {/* Hero Section */}
        <section className="rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 md:p-10 shadow-lg">
          <div className="hero-content flex-col lg:flex-row gap-8 lg:gap-12">
            <img
              src="https://i.ibb.co.com/v4fckj87/toy-image.png"
              className="w-full max-w-md rounded-2xl shadow-2xl"
            />
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Contact ToyTopia
              </h1>
              <p className="py-6 text-base-content/80">
                হ্যালো! কোনো প্রশ্ন, প্রোডাক্ট সাজেশন বা কোলাব? আমাদের মেসেজ দিন—আমরা
                রিপ্লাই করি ২৪ ঘণ্টার মধ্যে।
              </p>
              <div className="stats shadow bg-base-100">
                <div className="stat">
                  <div className="stat-title">Support Hours</div>
                  <div className="stat-value text-primary text-2xl">
                    10am – 8pm
                  </div>
                  <div className="stat-desc">Sun – Thu (BDT)</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Avg. Response</div>
                  <div className="stat-value text-secondary text-2xl">
                    ~4 hrs
                  </div>
                  <div className="stat-desc">Email & Messenger</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Grid Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Info */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title">Reach Us</h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    support@toytopia.local
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> +880
                    1234-567890
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span> 21 Orchid
                    Avenue, Dhaka 1205
                  </p>
                </div>
                <div className="divider my-2"></div>
                <h4 className="font-semibold">Business Hours</h4>
                <ul className="text-sm leading-7">
                  <li>Sun–Thu: 10:00 – 20:00</li>
                  <li>Fri: Closed</li>
                  <li>Sat: 12:00 – 18:00</li>
                </ul>
              </div>
            </div>

            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title">Why message us?</h3>
                <ul className="list-disc list-inside text-sm space-y-2">
                  <li>Order support & delivery status</li>
                  <li>Toy recommendations by age/skills</li>
                  <li>Bulk/party purchase & wholesale</li>
                  <li>Collaboration & sponsorships</li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Right Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title">Send us a message</h3>

                {/* Honeypot */}
                <input
                  type="text"
                  name="hp"
                  value={form.hp}
                  onChange={handleChange}
                  className="hidden"
                  autoComplete="off"
                  tabIndex={-1}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Name *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`input input-bordered ${
                        errors.name ? "input-error" : ""
                      }`}
                      placeholder="e.g. Jannat Rahman"
                    />
                    {errors.name && (
                      <label className="label text-error text-xs">
                        {errors.name}
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email Address *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`input input-bordered ${
                        errors.email ? "input-error" : ""
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <label className="label text-error text-xs">
                        {errors.email}
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone (optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={`input input-bordered ${
                        errors.phone ? "input-error" : ""
                      }`}
                      placeholder="+8801XXXXXXXXX"
                    />
                    {errors.phone && (
                      <label className="label text-error text-xs">
                        {errors.phone}
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Topic</span>
                    </label>
                    <select
                      name="topic"
                      value={form.topic}
                      onChange={handleChange}
                      className="select select-bordered"
                    >
                      <option>General</option>
                      <option>Order Support</option>
                      <option>Recommendations</option>
                      <option>Collaboration</option>
                    </select>
                  </div>
                </div>

                <div className="form-control mt-2">
                  <label className="label">
                    <span className="label-text">Subject *</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`input input-bordered ${
                      errors.subject ? "input-error" : ""
                    }`}
                    placeholder="Short summary of your message"
                  />
                  {errors.subject && (
                    <label className="label text-error text-xs">
                      {errors.subject}
                    </label>
                  )}
                </div>

                <div className="form-control mt-2">
                  <label className="label justify-between">
                    <span className="label-text">Message *</span>
                    <span className="label-text-alt opacity-70">
                      {form.message.length}/600
                    </span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`textarea textarea-bordered min-h-32 ${
                      errors.message ? "textarea-error" : ""
                    }`}
                    placeholder="Write your message..."
                    maxLength={600}
                  />
                  {errors.message && (
                    <label className="label text-error text-xs">
                      {errors.message}
                    </label>
                  )}
                </div>

                <div className="form-control mt-2">
                  <label className="label">
                    <span className="label-text">Attachment (optional)</span>
                  </label>
                  <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    className="file-input file-input-bordered w-full max-w-md"
                    accept="image/*,.pdf"
                  />
                  {form.file && (
                    <p className="text-xs opacity-70 mt-1">
                      Selected: {form.file.name} (
                      {Math.ceil(form.file.size / 1024)} KB)
                    </p>
                  )}
                </div>

                <div className="form-control mt-4">
                  <label className="cursor-pointer label justify-start gap-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      name="agree"
                      checked={form.agree}
                      onChange={handleChange}
                    />
                    <span className="label-text">
                      I agree to the{" "}
                      <a className="link link-hover">terms</a> &{" "}
                      <a className="link link-hover">privacy</a>
                    </span>
                  </label>
                  {errors.agree && (
                    <span className="text-error text-xs mt-1">
                      {errors.agree}
                    </span>
                  )}
                </div>

                <div className="card-actions mt-4">
                  <button
                    type="submit"
                    className={`btn btn-primary ${
                      submitting ? "btn-disabled" : ""
                    }`}
                  >
                    {submitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={reset}
                    disabled={submitting}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="rounded-2xl bg-base-200 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Prefer chatting?
              </h3>
              <p className="opacity-80 mt-2">
                Messenger বা WhatsApp-এও আমাদের সাথে কথা বলতে পারেন।
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn btn-outline btn-primary">Messenger</button>
              <button className="btn btn-outline btn-secondary">
                WhatsApp
              </button>
            </div>
          </div>
        </section>

        {/* Toasts */}
        <div className="toast toast-end z-50">
          {toast && (
            <div
              className={`alert ${
                toast.type === "success"
                  ? "alert-success"
                  : toast.type === "error"
                  ? "alert-error"
                  : "alert-info"
              }`}
              onAnimationEnd={() => setTimeout(() => setToast(null), 1800)}
            >
              <span>{toast.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
