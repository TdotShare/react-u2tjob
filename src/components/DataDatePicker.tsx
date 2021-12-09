
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';

//#388e3c = มีข้อมูล , #d32f2f = ไม่มีข้อมูล

type AppPros = {
    title : string
    setValue? : Date
    dateData :  (data : Date | null) => void,
} 


function DataDatePicker(props : AppPros) {

    const [value, setValue] = useState<Date | null>(
        new Date(),
    );

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
        props.dateData(newValue)
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
                label={`${props.title}`}
                inputFormat="yyyy-MM-dd"
                value={props.setValue ? props.setValue : value}
                onChange={handleChange}
                renderInput={(params) => <TextField fullWidth {...params} />}
            />
        </LocalizationProvider>
    );

}

export default DataDatePicker