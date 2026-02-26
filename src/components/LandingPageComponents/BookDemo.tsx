import { GoDotFill } from "react-icons/go";
import Demo from "../../assets/images/demo.png";

const BookDemo = () => {
  return (
    <section className="relative max-w-5xl mb-20 rounded-[40px] mx-auto flex items-center justify-center px-6 py-15 overflow-hidden">
      {/* Background Image */}
      <img
        src={Demo}
        alt="Demo"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        {/* Tag */}
        <div className="absolute left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 text-sm text-white py-1 px-3 rounded-full border border-gray-500 bg-transparent whitespace-nowrap">
          <GoDotFill className="text-[#22D3EE]" />
          Close Strong
        </div>

        {/* Heading */}
        <h2 className="mt-14 text-4xl sm:text-5xl lg:text-6xl font-semibold bg-gradient-to-b from-[#D2D2D2] to-[#EAEAEA] bg-clip-text text-transparent leading-tight tracker-tighter">
          See Peoplix in Action
        </h2>

        {/* Content */}
        <p className="mt-6 text-base font-normal text-white leading-relaxed">
          Experience how autonomous AI agents can transform HR operations.
        </p>

        {/* Button */}
        <button className="inline-flex mt-10 cursor-pointer items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <span className="text-sm text-white font-semibold tracking-wide">
            Book a Demo
          </span>
        </button>
      </div>
    </section>
  );
};

export default BookDemo;
