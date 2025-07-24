interface RightSideMenuBar {
    setRightSideMenuToggle:  React.Dispatch<React.SetStateAction<boolean>>;
}

const RightSideMenuBar = ({setRightSideMenuToggle}: RightSideMenuBar) => {
    return (
        <div className="flex flex-col w-[20%] px-[15px] py-[10px]">
            <div className="flex w-full justify-end">
                <button className="cursor-pointer" onClick={() => { setRightSideMenuToggle(false) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>


            </div>
        </div>
    )
}

export default RightSideMenuBar
