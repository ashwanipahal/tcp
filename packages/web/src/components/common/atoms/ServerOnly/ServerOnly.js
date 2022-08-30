export default function ServerOnly({ children }) {
  return typeof window === 'undefined' ? children : null;
}
