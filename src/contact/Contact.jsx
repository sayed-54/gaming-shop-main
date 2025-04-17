import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace these with your actual EmailJS credentials
      const result = await emailjs.send(
        "YOUR_SERVICE_ID", // EmailJS Service ID
        "YOUR_TEMPLATE_ID", // EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.comment,
        },
        "YOUR_PUBLIC_KEY" // EmailJS Public Key
      );

      console.log("Email sent successfully:", result.text);
      alert("Your message has been sent!");
      navigate("/");
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-[120px] justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-[#0e2c6c] mb-2">Contact</h1>
      <p className="text-gray-600 mb-6 text-center">
        Questions or comments? Get in touch and we will be happy to help.
      </p>

      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 mb-6 space-y-4"
        >
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-3">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="flex items-center bg-gray-100 rounded-lg p-3">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-center border border-purple-300 rounded-lg p-3">
            <FaPhone className="text-gray-500 mr-2" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Comment */}
          <textarea
            name="comment"
            placeholder="Comment"
            value={formData.comment}
            onChange={handleChange}
            required
            className="w-full h-32 bg-gray-100 p-3 rounded-lg outline-none"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0e2c6c] text-white py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </form>

        {/* Social Media Contact Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[#0e2c6c] mb-4">
            Connect with Us
          </h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://web.facebook.com/profile.php?id=61573918853545&mibextid=wwXIfr&rdid=Ty9EEXF91aSOelfb&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1Gmr7cX6Mq%2F%3Fmibextid%3DwwXIfr%26_rdc%3D1%26_rdr#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <FaFacebook className="w-10 h-10" />
              <span className="text-sm mt-2 block">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/babaeid_toys?igsh=MWl4MHlmMmtmMXEwOA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800 transition"
            >
              <FaInstagram className="w-10 h-10" />
              <span className="text-sm mt-2 block">Instagram</span>
            </a>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            Follow us on social media for the latest updates and news!
          </p>
        </div>
      </div>
    </div>
  );
}
