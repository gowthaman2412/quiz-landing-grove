import flag from '../assets/flag.svg'
export default function TestNavigation() {
    return (
      <div className="flex mt-6 flex-col md:flex-row justify-between bg-white rounded-lg">
        {/* Navigation Section */}
        <div className="flex flex-col w-[60%]">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Navigation</h2>
          <div className="flex items-center mb-4  text-blue-600 cursor-default">
            <img src={flag} alt="Flag" className="w-5 h-5" />
            <span className="font-medium ">Mark For Review</span>
            <span className="ml-10 text-[#696a6f]"> Mark a question and review it later</span>
          </div>
          <div className='mb-4 '>
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg w-40 cursor-default">
            Previous
          </button>
          <span className= "ml-4 text-[#696a6f]"> Go to previous question</span>
          </div>
          <div className='mb-4'>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg w-40 cursor-default">
            Next
          </button>
          <span className="ml-4 text-[#696a6f]"> Save your response and move to next question</span>
          </div>
          <div className='mr-auto text-nowrap'>
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg w-40 cursor-default">
            Submit Test
          </button>
          <span className="ml-4 text-[#696a6f]">Submit your test once you’ve reviewed all your answers</span>
          </div>
        </div>
  
        {/* Legend Section */}
        <div className="flex flex-col gap-3 w-[38%] ml-24">
          <h2 className="text-lg font-semibold text-gray-900">Legend</h2>
          <div className="flex items-center gap-4">
            <span className="w-8 h-8 flex justify-center items-center border border-gray-400 text-gray-500 bg-gray-100 rounded">
              1
            </span>
            <span className='text-[#696a6f]'>Not Visited/Unanswered Question</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-8 h-8 flex justify-center items-center border border-blue-500 text-blue-600 bg-white rounded">
              1
            </span>
            <span className='text-[#696a6f]'>Current Question</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-8 h-8 flex justify-center items-center text-white bg-blue-600 rounded">
              1
            </span>
            <span className='text-[#696a6f]'>Answered Question</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-8 h-8 flex justify-center items-center text-white bg-orange-500 rounded">
              1
            </span>
            <span className='text-[#696a6f]'>Unanswered and Marked for Review</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-8 h-8 flex justify-center items-center text-white rounded overflow-hidden">
              <div className="flex flex-col w-full h-full">
                <div className="h-1/2 bg-orange-500"></div>
                <div className="h-1/2 bg-blue-600"></div>
              </div>
              <span className="absolute">1</span>
            </span>
            <span className='text-[#696a6f]'>Answered and Marked for Review</span>
          </div>
        </div>
      </div>
    );
  }
  