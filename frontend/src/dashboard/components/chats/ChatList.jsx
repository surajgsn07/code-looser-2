 

const ChatList = () => {
    // const {allChats} = useChatContext();
 
    return (
        <div className=' w-full relative'>
           <div className='flex items-center justify-between gap-3 fex-wrap'>
                <h2 className='text-xl font-semibold'>All Teams Chats</h2>

                {/* Search */}
                <div>
                    <input type="text" name=""
                        className='w-full p-1 px-3 outline-none border dark:border-stone-700 rounded-md bg-gray-50 dark:bg-stone-800 dark:text-gray-50'
                        id="" placeholder='Search' />
                </div>
            </div>


            {/* groups */}
            <div className='flex overflow-y-scroll relative max-h-[calc(100vh-100px)] flex-col gap-2'
                style={{ scrollbarWidth: 'none', scrollbarColor: 'blue' }}>

                {[]?.map((item) =>
                    <div key={item._id} 
                    // onClick={() => {setCurrSelectedChat(item)}}
                     className='flex items-center hover:bg-stone-100  dark:hover:bg-stone-700 gap-5 cursor-pointer py-2 bg-white dark:bg-stone-800 dark:text-white'
                    >
                        <img src={item?.groupAvatar} alt={item?.chatName}
                            className='w-12 h-12  bg-black rounded-full' />
                        <div>
                            <h3 className='text-md font-semibold'>
                                {item?.chatName || "Chat Name"}
                            </h3>
                            <p className='text-xs text-gray-400'>
                               {item?.latestMessage?.content ? item?.latestMessage?.content : "No Message"}
                            </p>
                        </div>
                    </div>)
                }

            </div>


        </div>
    );
}

export default ChatList;
