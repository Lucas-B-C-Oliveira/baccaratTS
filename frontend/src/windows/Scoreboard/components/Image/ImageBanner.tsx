import { BannerImg } from './styles'
import img1 from '../../../../assets/a/1.jpg'

interface ImageBannerProps {
  image: number
}

export const imagesPath = [
  '../../../../assets/a/1.jpg',
  '../../../../assets/a/2.jpg',
  '../../../../assets/a/3.jpg',
]

export function ImageBanner({ image }: ImageBannerProps) {
  // const isEmpty = !(fs.readdirSync(path).length > 0)

  // if (isEmpty) {
  //   fs.readFile('./files/FILE_NAME', 'utf8', function (err, data) {
  //     // Enviando para o console o resultado da leitura
  //     console.log(data)
  //   })
  // }

  return <BannerImg src={img1} />
}
