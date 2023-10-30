import { Button, Collapse, IconButton, Stack, StackProps, Typography, useTheme } from '@mui/material'
import { Copy } from '@phosphor-icons/react'
import { useState } from 'react'
import Draggable from 'react-draggable'
import { JSONTree } from 'react-json-tree'
interface JsonTreeViewerProps extends StackProps {
  data: Record<string, unknown>
}

export function JsonTreeViewer({ data, ...props }: JsonTreeViewerProps) {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  return (
    <Draggable>
      <Stack
        sx={{
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[2],
          p: 2,
          position: 'absolute',
          right: 10,
          top: 10,
          zIndex: 100,
          overflow: 'auto',
          maxHeight: 'calc(100vh - 60px)',
          ...props.sx,
        }}
        {...props}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
          <Typography>JSON Tree Viewer</Typography>
          {/* Copy Button */}
          <IconButton size="small" onClick={() => navigator.clipboard.writeText(JSON.stringify(data, null, 2))}>
            <Copy size={32} />
          </IconButton>
          <Button variant="outlined" onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Open'}
          </Button>
        </Stack>
        <Collapse in={open}>
          <JSONTree
            hideRoot
            data={data}
            theme={{
              scheme: 'beetlejuice',
              base00: '#f0f0f0',
            }}
            shouldExpandNodeInitially={(keyName, data, level) => {
              return level < 2
            }}
          />
        </Collapse>
      </Stack>
    </Draggable>
  )
}
