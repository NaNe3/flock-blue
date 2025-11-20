export default function FadeInView({ 
  children, 
  style = {},
  ...props 
}) {

  return (
    <div 
      className='fade-in-view' 
      style={style} 
      {...props}
    >
      {children}
    </div>
  )
}
