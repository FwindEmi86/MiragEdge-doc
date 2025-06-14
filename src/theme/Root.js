import Live2DInitializer from './Live2DInitializer';

export default function Root({children}) {
  return (
    <>
      <Live2DInitializer />
      {children}
    </>
  );
}