import React, {useState, createContext, useContext} from 'react';
import {Car} from '../types';

export interface ViewedCarsContextProps {
  viewedCars: Car[];
  setViewedCars: (cars: Car[]) => void;
}

export const ViewedCarsContext = React.createContext<
  ViewedCarsContextProps | undefined
>(undefined);

export const ViewedCarsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [viewedCars, setViewedCars] = useState<Car[]>([]);

  return (
    <ViewedCarsContext.Provider value={{viewedCars, setViewedCars}}>
      {children}
    </ViewedCarsContext.Provider>
  );
};
