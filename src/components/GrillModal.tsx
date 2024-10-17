'use client'

import { useState } from 'react';
import { format, parseISO } from "date-fns";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { convertKelvinToCelsius } from "@utils";
import WeatherIcon from './WeatherIcon';


type Props = {
  forecast: any,
}

type Forecast = {
  date: string;
  minTemp: number;
  maxTemp: number;
  weatherDisc: string;
  icon: string;
};

export default function GrillModal({ forecast }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //get data from first api call On PAGE.tsx, make it so then i only get the data i need or get all data and make sorting function here
  // think about a way to get the place in this function
  //Change any types
  // get  default value that is rendert when i get no data

  function forecastData(data: Forecast[]) {
    return (
      Object.entries(data).map(([dataKey, dataValue]) => (
        <div className='flex flex-col space-y-2 p-3 w-fit justify-center items-center bg-bkg-1' key={dataKey}>
          <div className='flex flex-col bg-con p-4 rounded-lg space-y-2'>
            <div className='flex justify-center'>
              <WeatherIcon iconname={dataValue?.icon} />
            </div>
            <div className='flex justify-center'>
              <p className='text-content-1 capitalize'>{dataValue?.weatherDisc}</p>
            </div>
            <div className='flex justify-center space-x-2'>
              <p className='text-content-1'>{format(parseISO(dataValue?.date ?? ''), 'EEEE')}</p>
              <p className='text-content-1 text-sm'>({format(parseISO(dataValue?.date ?? ''), 'dd.MM.yyyy')})</p>
            </div>
            <div className='flex justify-center'>
              <p className='text-content-1'>Temp: {
                (dataValue.minTemp === dataValue.maxTemp) ? (
                  convertKelvinToCelsius(dataValue?.maxTemp)
                ) : (
                  `${convertKelvinToCelsius(dataValue?.minTemp)}°C -${convertKelvinToCelsius(dataValue?.maxTemp)}`
                )
              }°C
              </p>
            </div>
          </div>
        </div>
      )
      )
    )
  }

  return (
    <div>
      <button className="text-content-1 px-3 py-3" onClick={handleOpen}>
        Grill Days
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-bkg-1 border-2 border-black shadow-xl p-4 max-h-full">
          <Typography id="modal-modal-title" variant="h6" component="h2" className="text-content-1 text-center mb-4 font-bold">
            Grill Days
          </Typography>
          <div className='flex overflow-auto'>
            {
              (Object.entries(forecast).length > 0) ?
                (
                  forecastData(forecast)
                ) :
                (
                  <>
                    <div className='flex flex-col space-y-2 p-3 w-fit justify-center items-center bg-bkg-1' >
                      <div className='flex flex-col bg-con p-4 rounded-lg space-y-2'>
                        <div className='flex justify-center'>
                          <p className='text-content-1 text-center'>
                            Das wird wohl nichts mit Grillen, es wurden keine guten Tage zum Grillen gefunden
                          </p>
                        </div>
                        <div className="flex justify-center py-2">
                          <iframe src="https://giphy.com/embed/W0c3xcZ3F1d0EYYb0f" width="240" height="200" allowFullScreen />
                        </div>
                      </div>
                    </div>
                  </>
                )
            }
          </div>
        </Box>
      </Modal>
    </div>

  );
}
