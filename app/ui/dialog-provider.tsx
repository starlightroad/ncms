'use client';

import { type Dispatch, type SetStateAction, createContext, useState } from 'react';

type Context = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const DialogContext = createContext<Context>({
  isOpen: false,
  setIsOpen: () => {},
});

export default function DialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return <DialogContext.Provider value={{ isOpen, setIsOpen }}>{children}</DialogContext.Provider>;
}
