import { Button, IconButton, Stack, TextField, useTheme } from '@mui/material'
import { Check, PencilLine } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'

interface EditableTextProps {
  defaultValue: string
  onSave: (value: string) => void
}

export function EditableText({ defaultValue, onSave }: EditableTextProps) {
  const theme = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(defaultValue)
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    setIsEditing(false)
    onSave(value)
  }

  return (
    <Stack>
      {isEditing ? (
        <TextField
          size="small"
          variant="standard"
          value={value}
          onChange={handleInputChange}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleSaveClick()
            }
          }}
          sx={{
            m: 0,
            width: theme.spacing(30),
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSaveClick}>
                <Check />
              </IconButton>
            ),
          }}
        />
      ) : (
        <Button
          sx={{
            border: `1px solid ${theme.palette.secondary.light}`,
            borderRadius: 1,
            px: 2,
            py: 1,
            width: theme.spacing(30),
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            typography: 'body1',
            justifyContent: 'space-between',
          }}
          variant="outlined"
          endIcon={<PencilLine size={24} />}
          onClick={handleEditClick}
        >
          {defaultValue}
        </Button>
      )}
    </Stack>
  )
}
