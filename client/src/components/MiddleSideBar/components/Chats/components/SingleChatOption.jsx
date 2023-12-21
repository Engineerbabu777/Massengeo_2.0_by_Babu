



export default function SingleChatOption({}) {



    return(<>
    <div className="w-[95%] mx-auto flex items-center font-sans">

        {/* IMAGE */}
         <img className="w-16 h-16 rounded-full object-cover " alt="test0image" src={'/images/pic4.jpg'}/>

        {/* NAME & MESSAGE! */}
         <section className="flex-1 ml-6 flex flex-col gap-0.5">
            <p className="text-gray-100 font-bold text-xl">Elon Musk</p>
            <p className="text-gray-400 font-semibold tracking-wider">Starring at mars⭐🌕🌕</p>
         </section>

        {/* TIME UNREADS! */}
        <section className=" ml-6 flex flex-col gap-0.5 ">
            <p className=" font-bold text-md text-gray-400">5 min</p>
            <p className="text-gray-400 font-semibold ml-auto mr-2 text-white bg-[#F05454] w-6 h-6 rounded-full flex items-center justify-center">6</p>
         </section>


    </div>

    </>)
}