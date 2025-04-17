import { FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className="foot bg-[#0e2c6c] px-6 py-10">
      {/* Responsive Grid Layout */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center md:text-left">
        {/* Quick Links */}
        <div className="links">
          <h1 className="text-2xl font-semibold text-[#eab308] mb-4">
            QUICK LINKS
          </h1>
          <div className="flex flex-col items-center md:items-start space-y-2">
            {["Home", "All Products", "Categories", "Bundles", "Contact"].map(
              (link, index) => (
                <p
                  key={index}
                  className="hover:border-b-2 border-[#ff8808] duration-150 text-[#fff] cursor-pointer"
                >
                  {link}
                </p>
              )
            )}
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <h1 className="text-2xl font-semibold text-[#eab308] mb-4">
            DESCRIPTION
          </h1>
          <p className="text-[#fff] leading-relaxed">
            A whole world of imagination and creativity awaits, where your kids
            can explore their talents and let their imaginations run wild! Every
            toy has a story, offering a unique adventure filled with laughter,
            challenges, and growth. Our goal? To create a fun, safe, and
            intellectually stimulating environment for every little adventurer.
          </p>
        </div>

        {/* Newsletter & Social Icons */}
        <div className="newsletter">
          <h1 className="text-2xl font-semibold text-[#eab308] mb-4">
            NEWSLETTER
          </h1>
          <p className="text-[#fff] mb-4">
            Sign up for our newsletter and be the first to know about our
            special offers!
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 w-full bg-[#dddddd] rounded-lg outline-none"
          />
          <p className="text-[#fff] text-sm mt-3">
            By clicking the button, you agree to our
            <span className="text-[#eab308] cursor-pointer">
              {" "}
              Privacy Policy{" "}
            </span>
            and
            <span className="text-[#eab308] cursor-pointer">
              {" "}
              Terms & Conditions
            </span>
            .
          </p>

          {/* Social Icons */}
          <h1 className="mt-5 text-[#eab308] font-semibold text-2xl mb-3">
            FOLLOW US
          </h1>
          <div className="flex justify-center md:justify-start gap-6">
            <a
              href="https://web.facebook.com/profile.php?id=61573918853545&mibextid=wwXIfr&rdid=Ty9EEXF91aSOelfb&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1Gmr7cX6Mq%2F%3Fmibextid%3DwwXIfr%26_rdc%3D1%26_rdr#"
              target="blank"
            >
              <FaFacebook
                size={30}
                color="#fff"
                className="cursor-pointer hover:scale-110 duration-200"
              />
            </a>
            <a
              href="https://www.instagram.com/babaeid_toys?igsh=MWl4MHlmMmtmMXEwOA%3D%3D&utm_source=qr"
              target="blank"
            >
              <FaInstagram
                size={30}
                color="#fff"
                className="cursor-pointer hover:scale-110 duration-200"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
