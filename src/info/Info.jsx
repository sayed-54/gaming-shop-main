import { MdToys } from "react-icons/md";
import { FaCog } from "react-icons/fa"; // Alternative to FaGears
import { FaBirthdayCake } from "react-icons/fa";
import { MdSettingsInputComposite } from "react-icons/md";

function Info() {
  return (
    <div className="info grid grid-cols-1 md:grid-cols-2 w-[90%] mx-auto gap-6 mb-16 px-4">
      {/* Item 1 */}
      <div className="item flex gap-6 items-center border rounded-xl px-6 py-8 border-[#0e2c6c] hover:scale-105 duration-300 shadow-md">
        <MdToys size={50} color="#0e2c6c" />
        <div className="text">
          <h1 className="font-semibold text-xl mb-2 text-[#0e2c6c]">
            Toys for all ages
          </h1>
          <p className="text-gray-600">
            Whether for my toddler or pre-teen, this store has something for
            everyone. The toys are fun and educational.
          </p>
        </div>
      </div>

      {/* Item 2 */}
      <div className="item flex gap-6 items-center border rounded-xl px-6 py-8 border-[#0e2c6c] hover:scale-105 duration-300 shadow-md">
        <FaCog size={50} color="#0e2c6c" />
        <div className="text">
          <h1 className="font-semibold text-xl mb-2 text-[#0e2c6c]">
            Great service and amazing toys!
          </h1>
          <p className="text-gray-600">
            We had an issue with a toy, and the staff was quick to help. My son
            is thrilled with his new toy!
          </p>
        </div>
      </div>

      {/* Item 3 */}
      <div className="item flex gap-6 items-center border rounded-xl px-6 py-8 border-[#0e2c6c] hover:scale-105 duration-300 shadow-md">
        <FaBirthdayCake size={50} color="#0e2c6c" />
        <div className="text">
          <h1 className="font-semibold text-xl mb-2 text-[#0e2c6c]">
            Perfect for birthday gifts!
          </h1>
          <p className="text-gray-600">
            I always find great gifts for my nephews here. The toys are unique
            and always a hit at parties.
          </p>
        </div>
      </div>

      {/* Item 4 */}
      <div className="item flex gap-6 items-center border rounded-xl px-6 py-8 border-[#0e2c6c] hover:scale-105 duration-300 shadow-md">
        <MdSettingsInputComposite size={50} color="#0e2c6c" />
        <div className="text">
          <h1 className="font-semibold text-xl mb-2 text-[#0e2c6c]">
            My son’s favorite site!
          </h1>
          <p className="text-gray-600">
            We visit often, and my son is never disappointed. Great staff and
            toys that keep him entertained!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info;
