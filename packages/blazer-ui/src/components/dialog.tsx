import { DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import { TransitionProps } from '@mui/material/transitions'
import { ReactNode, forwardRef } from 'react'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export interface BlazerDialogProps extends DialogProps {
  title?: string
  actions?: ReactNode
}

export function BlazerDialog({ title, actions, children, ...props }: BlazerDialogProps) {
  return (
    <Dialog TransitionComponent={Transition} keepMounted {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  )
}
