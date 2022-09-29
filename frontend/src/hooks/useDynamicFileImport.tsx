import { useEffect, useRef, useState } from 'react'

interface DynamicFileImportProps {
  fileName?: string | undefined
  advertisementsFolder?: 'a' | 'b' | 'c' | 'd'
}

interface LoadedFile {
  file: undefined | string | any
  fileName: string | undefined
  advertisementsFolder?: 'a' | 'b' | 'c' | 'd'
}

export function useDynamicFileImport({
  fileName,
  advertisementsFolder,
}: DynamicFileImportProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<undefined | any>(undefined) //! TODO: fix type of error
  const [file, setFile] = useState<undefined | string | any>(undefined) //! TODO: fix type
  const loadedFiles = useRef([{} as LoadedFile])

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await import(
          `./../assets/${advertisementsFolder}/${fileName}.jpg`
        )
        setFile(response.default)
        // loadedFiles.current.push({ file, fileName, advertisementsFolder })
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    // let isToFetchTheFiles = true

    // loadedFiles.current.forEach((loadedFile) => {
    //   if (
    //     loadedFile.fileName === fileName &&
    //     loadedFile.advertisementsFolder === advertisementsFolder
    //   ) {
    //     setFile(loadedFile.file)
    //     setLoading(false)
    //     setError(undefined)
    //     isToFetchTheFiles = false
    //     return false
    //   } else isToFetchTheFiles = true
    // })

    // if (isToFetchTheFiles) fetchFile()
    fetchFile()
  }, [fileName, advertisementsFolder])
  // }, [fileName, advertisementsFolder, file])

  return {
    loading,
    error,
    file,
  }
}
