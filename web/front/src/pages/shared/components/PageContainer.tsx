import Header from './Header'

interface PageContainerProps {
  children: React.ReactNode
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-between w-full max-w-[1220px] h-full">
        <Header />
        <div className="flex flex-col relative items-start justify-start w-full flex-1 overflow-hidden gap-8 px-4 pt-0 md:gap-3 sm:pt-2">
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageContainer
