import { useEffect, useState, type Dispatch, type SetStateAction } from "react"

export function useLocalStorage <T> (key:string, defaultValue:T): [T, Dispatch<SetStateAction<T>>] {

  const [value, setValue] = useState(()=> {
    try {
      const storedItems = localStorage.getItem(key);
      return storedItems ? JSON.parse(storedItems) : defaultValue;
    } catch {
      return defaultValue;
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key,value])

  return [value, setValue]

}