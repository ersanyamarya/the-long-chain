import { IconButton, StandardTextFieldProps, TextField, styled } from '@mui/material'

const TextFileInput = styled('input')(() => ({
  opacity: '0',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  cursor: 'pointer',
}))

interface FileUploadInputProps extends StandardTextFieldProps {
  onErrorMessage: (error: string) => void
  onSuccessfulUpload: (value: string) => void
  icon?: React.ReactNode
}

export function TextFileUploadInput({ onSuccessfulUpload, onErrorMessage, icon, ...rest }: FileUploadInputProps) {
  const readFileContent = (newFile: File) => {
    const reader = new FileReader()
    reader.onload = function () {
      const key = reader?.result as string
      onSuccessfulUpload(key)
    }
    reader.readAsText(newFile)
  }

  const onFileDrop = (e: React.BaseSyntheticEvent) => {
    const newFile = e.target.files[0]
    const regex = new RegExp('(.*?).(txt)$')
    if (newFile && regex.test(newFile.name)) {
      readFileContent(newFile)
    } else {
      onErrorMessage('Please select the correct file type .txt')
    }
  }

  return (
    <TextField
      {...rest}
      InputProps={{
        endAdornment: (
          <IconButton>
            <TextFileInput type="file" value="" onChange={onFileDrop} title="Browse Files" accept=".txt" />
            {icon}
          </IconButton>
        ),
      }}
    />
  )
}
