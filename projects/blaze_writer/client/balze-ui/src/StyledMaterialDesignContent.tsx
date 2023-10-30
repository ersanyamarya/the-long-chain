import { styled } from '@mui/material'
import { MaterialDesignContent } from 'notistack'

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme: { palette } }) => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: palette.success.dark,
    color: palette.background.default,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: palette.error.dark,
    color: palette.background.default,
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: palette.warning.dark,
    color: palette.background.default,
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: palette.info.dark,
    color: palette.background.default,
  },

  '& .notistack-snackbar': {
    borderRadius: 8,
    boxShadow: 'none',
    padding: 16,
    color: palette.text.primary,
  },
}))

export const NotiStackComponents = {
  success: StyledMaterialDesignContent,
  error: StyledMaterialDesignContent,
  warning: StyledMaterialDesignContent,
  info: StyledMaterialDesignContent,
}
