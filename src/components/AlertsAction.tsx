import * as React from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import { Button, Collapse, Stack, styled } from '@mui/material';

import { RootState } from './../store/ConfigureStore'
import { useSelector, useDispatch } from 'react-redux'
import { isDisable } from './../store/reducer/AlertAction'

interface AppProps {
  text: string;
  level?: AlertColor;
}


export default function AlertsAction({ level = "success", text }: AppProps) {

  const dispatch = useDispatch()
  const checkedAlert = useSelector((state: RootState) => state.alertaction.value)

  return (
    <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
      <Collapse in={checkedAlert}>
        <Alert severity={level} onClose={() => { dispatch(isDisable()) }}>{text}</Alert>
      </Collapse>
    </Stack>
  );
}
