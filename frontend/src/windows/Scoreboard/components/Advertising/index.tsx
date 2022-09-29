// import { useDynamicFileImport } from 'src/hooks/useDynamicFileImport'
import { useDynamicFileImport } from '../../../../hooks/useDynamicFileImport'
import { BannerImg } from './../Image/styles'

interface AdvertisingProps {
  currentBannerImage?: string | undefined
  currentAdvertising?: 'a' | 'b' | 'c' | 'd'
}

export function Advertising({
  currentBannerImage,
  currentAdvertising,
}: AdvertisingProps) {
  const { error, loading, file } = useDynamicFileImport({
    fileName: currentBannerImage,
    advertisementsFolder: currentAdvertising,
  })

  console.log('error', error)
  console.log('loading', loading)

  if (error) return <div>Error</div>
  if (loading) return <div>Loading</div>

  return (
    <>
      {(() => {
        switch (currentAdvertising) {
          case 'a':
            return <BannerImg src={file} />
          case 'b':
            return <BannerImg src={''} />
          case 'c':
            return <BannerImg src={''} />
          case 'd':
            return <BannerImg src={''} />
          default:
            return null
        }
      })()}
    </>
  )
}
