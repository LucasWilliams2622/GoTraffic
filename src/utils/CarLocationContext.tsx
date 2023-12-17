import React, {useState} from 'react';

interface CarLocationContextProps {
  receiveCarLocation: string;
  setReceiveCarLocation: React.Dispatch<React.SetStateAction<string>>;
}

export const CarLocationContext = React.createContext<
  CarLocationContextProps | undefined
>(undefined);

interface CarLocationProviderProps {
  children: React.ReactNode;
}

export const CarLocationProvider: React.FC<CarLocationProviderProps> = ({
  children,
}) => {
  const [receiveCarLocation, setReceiveCarLocation] =
    useState<string>('atCarLocation');

  return (
    <CarLocationContext.Provider
      value={{receiveCarLocation, setReceiveCarLocation}}>
      {children}
    </CarLocationContext.Provider>
  );
};
