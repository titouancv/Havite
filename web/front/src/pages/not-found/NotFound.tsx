import PageContainer from '../shared/components/PageContainer'

function NotFound() {
  return (
    <PageContainer>
      <div className="flex flex-col relative items-start justify-start w-full h-full">
        <span
          className="text-[150px] font-bold "
          style={{
            fontFamily: "'Book Antiqua', Palatino, 'Palatino Linotype', serif",
          }}
        >
          404
        </span>
        <p className="text-xl">Il semblerait que cette page n'existe pas.</p>
      </div>
    </PageContainer>
  )
}

export default NotFound
